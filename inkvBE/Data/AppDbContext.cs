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
    public DbSet<Profile> Profiles { get; set; } = null!;

    // Additional model configurations
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

      // Creates unique index for user's email
      modelBuilder.Entity<User>()
        .HasIndex(user => user.Email)
        .IsUnique();

      modelBuilder.Entity<Profile>()
        .HasIndex(profile => profile.Username)
        .IsUnique();

      modelBuilder.Entity<Profile>()
        .HasOne(p => p.User)
        .WithOne(u => u.Profile)
        .HasForeignKey<Profile>(p => p.UserId);

    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      base.OnConfiguring(optionsBuilder);

      var newUsers = new[] {
        new { Id = -1, Email = "inkv1@inkv.org", Password = "Inkv1!"},
        new { Id = -2, Email = "inkv2@inkv.org", Password = "Inkv2!"},
        new { Id = -3, Email = "inkv3@inkv.org", Password = "Inkv3!"}
      };

      var newProfile = new[] {
        new { Username = "inkv1", UserId = -1},
        new { Username = "inkv2", UserId = -2},
        new { Username = "inkv3", UserId = -3}
      };


      // Admin users seeding
      optionsBuilder.UseSeeding((context, _) =>
      {
        foreach (var newUser in newUsers)
        {
          if (!context.Set<User>().Any(u => u.Email == newUser.Email))
            context.Set<User>().Add(new User { Email = newUser.Email, Password = BCrypt.Net.BCrypt.HashPassword(newUser.Password), Role = "admin" });
        }
        context.SaveChanges();
      })
      .UseAsyncSeeding(async (context, _, cancellationToken) =>
      {
        foreach (var newUser in newUsers)
        {
          if (!await context.Set<User>().AnyAsync(u => u.Email == newUser.Email, cancellationToken))
            context.Set<User>().Add(new User { Email = newUser.Email, Password = BCrypt.Net.BCrypt.HashPassword(newUser.Password), Role = "admin" });
        }
        await context.SaveChangesAsync(cancellationToken);
      });
    }


  }
}