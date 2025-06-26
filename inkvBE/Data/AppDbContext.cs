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
    public DbSet<User> Users { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

      // Creates unique index for user's email
      modelBuilder.Entity<User>()
        .HasIndex(user => user.Email)
        .IsUnique();
    }
  }
}