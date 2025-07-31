
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

    const int ACCESS_TOKEN_EXP_MIN = 15;      // 15 minutes
    const int REFRESH_TOKEN_EXP_MIN = 10080;  // 7 days

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
        return BadRequest(new { message = "Such user already exists." });

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
      var accessToken = _jwtService.GenerateToken(newUser, ACCESS_TOKEN_EXP_MIN, "access");
      Response.Cookies.Append("access_token", accessToken, new CookieOptions
      {
        HttpOnly = false,
        Secure = !_hostEnvironment.IsDevelopment(),
        SameSite = SameSiteMode.Lax,
        Expires = DateTime.UtcNow.AddMinutes(ACCESS_TOKEN_EXP_MIN)
      });

      var refreshToken = _jwtService.GenerateToken(newUser, REFRESH_TOKEN_EXP_MIN, "refresh");
      Response.Cookies.Append("refresh_token", refreshToken, new CookieOptions
      {
        HttpOnly = true,
        Secure = !_hostEnvironment.IsDevelopment(),
        SameSite = SameSiteMode.Lax,
        Expires = DateTime.UtcNow.AddMinutes(REFRESH_TOKEN_EXP_MIN)
      });

      return Ok(new { message = "User registered successfully" });
    }


    [HttpPost("Login")]
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
          return NotFound(new { message = "Account does not exist" });
        }

        //Checking if the passwords match
        bool passwordsMatch = BCrypt.Net.BCrypt.Verify(password, existingUser.Password);
        if (!passwordsMatch)
        {
          return Unauthorized(new { message = "Incorrect password" });
        }

        // Generating and appending the JWT
        var token = _jwtService.GenerateToken(existingUser, 15, "access");
        Response.Cookies.Append("access_token", token, new CookieOptions
        {
          HttpOnly = true,
          Secure = !_hostEnvironment.IsDevelopment(),
          SameSite = SameSiteMode.Lax,
          Expires = DateTime.UtcNow.AddMinutes(ACCESS_TOKEN_EXP_MIN)
        });

        var refreshToken = _jwtService.GenerateToken(existingUser, REFRESH_TOKEN_EXP_MIN, "refresh");
        Response.Cookies.Append("refresh_token", refreshToken, new CookieOptions
        {
          HttpOnly = true,
          Secure = !_hostEnvironment.IsDevelopment(),
          SameSite = SameSiteMode.Lax,
          Expires = DateTime.UtcNow.AddMinutes(REFRESH_TOKEN_EXP_MIN)
        });

        return Ok(new { message = "User logged in successfully" });
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


    [Authorize]
    [HttpGet("ping-me")]
    public ActionResult PingMe()
    {
      return Ok();
    }

    [Authorize]
    [HttpPost("Logout")]
    public IActionResult Logout()
    {
      try
      {
        // Generating and appending the JWT
        Response.Cookies.Append("access_token", "", new CookieOptions
        {
          HttpOnly = true,
          Secure = !_hostEnvironment.IsDevelopment(),
          SameSite = SameSiteMode.Lax,
          Expires = DateTime.UtcNow.AddDays(-1) // Set expiration in the past to clear the cookie
        });
        Response.Cookies.Append("refresh_token", "", new CookieOptions
        {
          HttpOnly = true,
          Secure = !_hostEnvironment.IsDevelopment(),
          SameSite = SameSiteMode.Lax,
          Expires = DateTime.UtcNow.AddDays(-1) // Set expiration in the past to clear the cookie
        });
        return Ok(new { message = "User logged out successfully" });
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


    [HttpPost("refresh")]
    public async Task<ActionResult> RefreshToken()
    {
      // Retrieve refresh token
      Request.Cookies.TryGetValue("refresh_token", out var refreshToken);
      if (string.IsNullOrEmpty(refreshToken))
        return Unauthorized("Refresh token is missing");

      // Verify the token
      User? user = await _jwtService.VerifyToken(refreshToken, "refresh");

      // If such user exists, generate new token
      if (user != null)
      {
        var token = _jwtService.GenerateToken(user, 15, "access");
        Response.Cookies.Append("access_token", token, new CookieOptions
        {
          HttpOnly = true,
          Secure = !_hostEnvironment.IsDevelopment(),
          SameSite = SameSiteMode.Lax,
          Expires = DateTime.UtcNow.AddMinutes(15)
        });
        return Ok("Token refreshed");
      }

      return Unauthorized("No valid refresh token was found");
    }
  }
  
}