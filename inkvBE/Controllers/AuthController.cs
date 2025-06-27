
using inkvBE.Data;
using Microsoft.AspNetCore.Mvc;
using inkvBE.DTOs;
using inkvBE.Entities;
using Microsoft.EntityFrameworkCore;
using inkvBE.Services;
using Microsoft.AspNetCore.Authorization;
using BCrypt.Net;
using System;

namespace inkvBE.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class AuthController : ControllerBase
  {
    private readonly AppDbContext _context;
    private readonly IJwtService _jwtService;
    private readonly IHostEnvironment _hostEnvironment;

    public AuthController(AppDbContext context, IJwtService jwtService, IHostEnvironment hostEnvironment)
    {
      _context = context;
      _jwtService = jwtService;
      _hostEnvironment = hostEnvironment;
    }

    [HttpPost("register")]
    public async Task<ActionResult> Register([FromBody] RegisterDto body)
    {
      // Checking for empty fields
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      string email = body.Email!.Trim();
      string password = body.Password!.Trim();

      // Checking for duplicate users
      var existingUser = await _context.Users.FirstOrDefaultAsync(user => user.Email == email);
      if (existingUser != null)
        return BadRequest(new { errors = "Such user already exists." });

      // Hashing the password before storing
      string hashedPassword = BCrypt.Net.BCrypt.HashPassword(password);

      // Saving the entry
      User newUser = new User
      {
        Email = body.Email,
        Password = hashedPassword
      };
      _context.Users.Add(newUser);
      await _context.SaveChangesAsync();

      // Generating and appending the JWT
      var token = _jwtService.GenerateToken(newUser);
      Response.Cookies.Append("access_token", token, new CookieOptions
      {
        HttpOnly = true,
        Secure = !_hostEnvironment.IsDevelopment(),
        SameSite = SameSiteMode.Lax,
        Expires = DateTime.UtcNow.AddHours(2)
      });

      return Ok(new { success = "User registered successfully" });
    }

    [Authorize]
    [HttpGet("ping-me")]
    public ActionResult PingMe()
    {
      return Ok();
    }

        [HttpGet("Login")]
        public IActionResult Login(LoginDto body)
        {
            try
            {
                // Checking for empty fields
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                string email = body.Email!.Trim();
                string password = body.Password!.Trim();

                //Checking if the account actually exists
                var existingUser = _context.Users.FirstOrDefault(user => user.Email == email);
                if (existingUser == null)
                {
                    return NotFound("Account does not exist");
                }

                //Checking if the passwords match
                bool passwordsMatch = BCrypt.Net.BCrypt.Verify(password, existingUser.Password);
                if (!passwordsMatch)
                {
                    return Unauthorized("Incorrect password");
                }

                return Ok("User logged in successfully");
            }

            catch (Exception ex)
            {
                //Returns code 500 if some other error occurs
                var customResponse = new
                {
                    Code = 500,
                    Message = "Internal Server Error",
                    ErrorMessage = ex.Message
                };
                return StatusCode(StatusCodes.Status500InternalServerError, customResponse);
            }
        }
    }
}