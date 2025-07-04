
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using inkvBE.Entities;
using Microsoft.IdentityModel.Tokens;

namespace inkvBE.Services
{
  public interface IJwtService
  {
    string GenerateToken(User user);
  }

  public class JwtService : IJwtService
  {
    public string GenerateToken(User user)
    {
      // Setting claims
      var claims = new[] {
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),                            // GUID
        new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),                                   // User's ID
        new Claim(JwtRegisteredClaimNames.Email, user.Email!),                                        // User's email
        new Claim(JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString()), // Issue time
        new Claim("role", user.Role!.ToString() ?? "user"),                                           // User's role         
        new Claim("exp", DateTimeOffset.UtcNow.AddHours(2).ToUnixTimeSeconds().ToString())            // Expiration time
      };

      // Setting up the crendentials
      var secret = Environment.GetEnvironmentVariable("JWT_SECRET");
      var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret!));
      var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

      // Recipe for the token
      var newToken = new JwtSecurityToken(
        claims: claims,
        expires: DateTime.Now.AddHours(2),
        signingCredentials: credentials
      );

      // Crafting the token
      return new JwtSecurityTokenHandler().WriteToken(newToken);
    }
  }
}