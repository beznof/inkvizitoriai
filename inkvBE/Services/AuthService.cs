
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
    public bool VerifyToken(string tokenValue, string tokenType);
  }

  public class JwtService : IJwtService
  {
    private readonly AppDbContext _context;

    public JwtService(AppDbContext context)
    {
      _context = context;
    }

    /// <summary>
    /// Generates a JWT token
    /// </summary>
    /// <param name="user">The user for which to sign the JWT</param>
    /// <param name="expMinutes">Expiration time in minutes</param>
    /// <param name="type">The type of the token</param>
    /// <returns>New JWT token</returns>
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

    /// <summary>
    /// Verifies the JWT token
    /// </summary>
    /// <param name="tokenValue">The JWT token provided</param>
    /// <param name="tokenType">The type of the token</param>
    /// <returns></returns>
    public bool VerifyToken(string tokenValue, string tokenType)
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

        var type = claimsPrincipal.FindFirst("type");
        if (type?.Value != tokenType) throw new Exception("No 'type' claim found in the token.");

        return true;
      }
      catch (Exception ex)
      {
        Console.WriteLine(ex);
        return false;
      }
    }
  }
}