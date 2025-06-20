
using inkvBE.Data;
using inkvBE.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace inkvBE.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class TestController : ControllerBase
  {
    private readonly AppDbContext _context;

    public TestController(AppDbContext context)
    {
      _context = context;
    }

  [HttpGet]
    public async Task<ActionResult<IEnumerable<Test>>> GetAll()
    {
      return await _context.Tests.ToListAsync();
    }
  }
}