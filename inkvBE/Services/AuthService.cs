
using inkvBE.Entities;

namespace inkvBE.Services
{
  public interface IJwtService
  {
    string GenerateToken(User user);
  }

  // public class JwtService : IJwtService
  // {
  //   public string GenerateToken(User user)
  //   {
      
  //   }
  // }
}