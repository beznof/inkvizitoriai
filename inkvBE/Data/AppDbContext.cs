using Microsoft.EntityFrameworkCore;
using inkvBE.Entities;

namespace inkvBE.Data
{
  public class AppDbContext : DbContext
  {
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    { }

    // Tables
    public DbSet<Test> Tests { get; set; } = null!;
  }
}