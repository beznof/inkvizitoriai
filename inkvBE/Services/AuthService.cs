using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using inkvBE.Data;
using inkvBE.Entities;
using Microsoft.IdentityModel.Tokens;

namespace inkvBE.Services
{
  public interface IJwtService
  {
    string GenerateToken(User user, int expMinutes, string type);
    public Task<User?> VerifyToken(string tokenValue, string tokenType);
  }

  public class JwtService : IJwtService
  {
    private readonly AppDbContext _context;

    public JwtService(AppDbContext context)
    {
      _context = context;
    }

    public string GenerateToken(User user, int expMinutes, string type)
    {
      // Setting claims
      var claims = new[] {
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),                            // GUID
        new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),                                   // User's ID
        new Claim(JwtRegisteredClaimNames.Email, user.Email!),                                        // User's email
        new Claim(JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString()), // Issue time
        new Claim("type", type)                                                                       // Type ("access", "refresh", ...)
      };

      // Setting up the crendentials
      var secret = Environment.GetEnvironmentVariable("JWT_SECRET");
      var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret!));
      var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

      // Recipe for the token
      var newToken = new JwtSecurityToken(
        claims: claims,
        expires: DateTime.Now.AddMinutes(expMinutes),
        signingCredentials: credentials
      );

      // Crafting the token
      return new JwtSecurityTokenHandler().WriteToken(newToken);
    }

    public async Task<User?> VerifyToken(string tokenValue, string tokenType)
    {
      try
      {
        var handler = new JwtSecurityTokenHandler();
        var claimsPrincipal = handler.ValidateToken(tokenValue, new TokenValidationParameters
        {
          ValidateIssuer = false,
          ValidateAudience = false,
          ValidateLifetime = true,
          ValidateIssuerSigningKey = true,
          IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Environment.GetEnvironmentVariable("JWT_SECRET")!))
        }, out SecurityToken validatedToken);

        var type = claimsPrincipal.FindFirst("type")?.Value;
        if (type != tokenType) throw new Exception("No 'type' claim found in the token.");

        var subscriber = claimsPrincipal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (subscriber == null) throw new Exception("No 'sub' claim found in the token");

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id.ToString() == subscriber);
        
        if (user == null) throw new Exception("No such user was found");
        return user;
      }
      catch (Exception ex)
      {
        Console.WriteLine(ex);
        return null;
      }
    }
  }
}