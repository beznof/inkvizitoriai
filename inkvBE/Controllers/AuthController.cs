
using inkvBE.Data;
using Microsoft.AspNetCore.Mvc;
using inkvBE.DTOs;
using inkvBE.Entities;
using Microsoft.EntityFrameworkCore;
using inkvBE.Services;

namespace inkvBE.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class AuthController : ControllerBase
  {
    private readonly AppDbContext _context;
    private readonly IJwtService _jwtService;

    public AuthController(AppDbContext context, IJwtService jwtService)
    {
      _context = context;
      _jwtService = jwtService;
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

      var token = _jwtService.GenerateToken(newUser);

      return Ok(new { success = "User registered successfully", token });
    }
  }
}