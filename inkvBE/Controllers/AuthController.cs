
using inkvBE.Data;
using Microsoft.AspNetCore.Mvc;
using inkvBE.DTOs;
using inkvBE.Entities;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;
using System;

namespace inkvBE.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class AuthController : ControllerBase
  {
    private readonly AppDbContext _context;

    public AuthController(AppDbContext context)
    {
      _context = context;
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

      return Ok(new { success = "User registered successfully" });
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

                // Hashing the password before comparing passwords
                bool passwordsMatch = BCrypt.Net.BCrypt.Verify(password, existingUser.Password);

                //Checking if the passwords match
                if (!passwordsMatch)
                {
                    return Unauthorized("Incorrect password" + " " + existingUser.Password + " ; ");
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