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
    public DbSet<Category> Categories { get; set; } = null!;
    public DbSet<Subcategory> Subcategories { get; set; } = null!;
    public DbSet<Entities.Type> Types { get; set; } = null!;
    public DbSet<City> Cities { get; set; }
    public DbSet<ListingStatus> ListingStatuses { get; set; }

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


      /* Category, Subcategory seeding (Type seeding is done in migrations) */

      var newCategories = new[] {
        new { Id = -1, CategoryName = "Transportas"},
        new { Id = -2, CategoryName = "Nekilnojamasis turtas"},
        new { Id = -3, CategoryName = "Darbas, paslaugos"},
        new { Id = -4, CategoryName = "Buitis"},
        new { Id = -5, CategoryName = "Kompiuterija"},
        new { Id = -6, CategoryName = "Komunikacijos"},
        new { Id = -7, CategoryName = "Technika"},
        new { Id = -8, CategoryName = "Pramogos"},
        new { Id = -9, CategoryName = "Drabužiai, avalynė"},
        new { Id = -10, CategoryName = "Auginantiems vaikus"},
      };

      var newSubcategories = new[] {
        new { Id = 1, SubcategoryName = "Automobiliai", CategoryId = 1}, // Transportas
        new { Id = 2, SubcategoryName = "Moto", CategoryId = 1},
        new { Id = 3, SubcategoryName = "(Mikro)autobusai", CategoryId = 1},
        new { Id = 4, SubcategoryName = "Dviračiai, paspirtukai", CategoryId = 1},
        new { Id = 5, SubcategoryName = "Spec. transportas", CategoryId = 1},
        new { Id = 6, SubcategoryName = "Vandens transportas", CategoryId = 1},
        new { Id = 7, SubcategoryName = "Žemės ūkio technika", CategoryId = 1},
        new { Id = 8, SubcategoryName = "Dalys, aksesuarai", CategoryId = 1},
        new { Id = 9, SubcategoryName = "Paslaugos", CategoryId = 1},
        new { Id = 10, SubcategoryName = "Kita", CategoryId = 1},
        new { Id = 11, SubcategoryName = "Butai", CategoryId = 2}, // Nekilnojamasis turtas
        new { Id = 12, SubcategoryName = "Namai", CategoryId = 2},
        new { Id = 13, SubcategoryName = "Patalpos", CategoryId = 2},
        new { Id = 14, SubcategoryName = "Sklypai", CategoryId = 2},
        new { Id = 15, SubcategoryName = "Sodybos", CategoryId = 2},
        new { Id = 16, SubcategoryName = "Garažai", CategoryId = 2},
        new { Id = 17, SubcategoryName = "Nuoma", CategoryId = 2},
        new { Id = 18, SubcategoryName = "Moduliniai namai", CategoryId = 2},
        new { Id = 19, SubcategoryName = "Medžiagos, įranga", CategoryId = 2},
        new { Id = 20, SubcategoryName = "Statybos paslaugos", CategoryId = 2},
        new { Id = 21, SubcategoryName = "Kita", CategoryId = 2},
        new { Id = 22, SubcategoryName = "Siūlo darbą", CategoryId = 3}, // Darbas, paslaugos
        new { Id = 23, SubcategoryName = "Ieško darbo", CategoryId = 3},
        new { Id = 24, SubcategoryName = "Biuro paslaugo", CategoryId = 3},
        new { Id = 25, SubcategoryName = "Grožio, sveikatos paslaugos", CategoryId = 3},
        new { Id = 26, SubcategoryName = "Kursai, mokymai", CategoryId = 3},
        new { Id = 27, SubcategoryName = "Renginių paslaugos", CategoryId = 3},
        new { Id = 28, SubcategoryName = "Verslo paslaugos", CategoryId = 3},
        new { Id = 29, SubcategoryName = "Web sprendimai, svetainės", CategoryId = 3},
        new { Id = 30, SubcategoryName = "Kita", CategoryId = 3},
        new { Id = 31, SubcategoryName = "Baldai, interjeras", CategoryId = 4}, // Buitis
        new { Id = 32, SubcategoryName = "Flora, fauna", CategoryId = 4},
        new { Id = 33, SubcategoryName = "Grožis, sveikata", CategoryId = 4},
        new { Id = 34, SubcategoryName = "Kolekcionavimas", CategoryId = 4},
        new { Id = 35, SubcategoryName = "Maistas, gėrimai", CategoryId = 4},
        new { Id = 36, SubcategoryName = "Namų apyvokos reikmenys", CategoryId = 4},
        new { Id = 37, SubcategoryName = "Antikvariatas", CategoryId = 4},
        new { Id = 38, SubcategoryName = "Dovanojama, radiniai", CategoryId = 4},
        new { Id = 39, SubcategoryName = "Kietas, skystas kuras", CategoryId = 4},
        new { Id = 40, SubcategoryName = "Kita", CategoryId = 4},
        new { Id = 41, SubcategoryName = "Kompiuteriai", CategoryId = 5}, // Kompiuterija
        new { Id = 42, SubcategoryName = "Išoriniai įrenginiai", CategoryId = 5},
        new { Id = 43, SubcategoryName = "Kompiuterių komponentai", CategoryId = 5},
        new { Id = 44, SubcategoryName = "Priedai, aksesuarai", CategoryId = 5},
        new { Id = 45, SubcategoryName = "Programinė įranga, žaidimai", CategoryId = 5},
        new { Id = 46, SubcategoryName = "Tinklo įranga", CategoryId = 5},
        new { Id = 47, SubcategoryName = "Paslaugos, remontas", CategoryId = 5},
        new { Id = 48, SubcategoryName = "Kita", CategoryId = 5},
        new { Id = 49, SubcategoryName = "Mobilieji telefonai", CategoryId = 6}, // Komunikacijos
        new { Id = 50, SubcategoryName = "Radijo, GPS įranga", CategoryId = 6},
        new { Id = 51, SubcategoryName = "Telefonai, faksai", CategoryId = 6},
        new { Id = 52, SubcategoryName = "Dalys, priedai", CategoryId = 6},
        new { Id = 53, SubcategoryName = "Paslaugos, remontas", CategoryId = 6},
        new { Id = 54, SubcategoryName = "Kita", CategoryId = 6},
        new { Id = 55, SubcategoryName = "Audio", CategoryId = 7}, // Technika
        new { Id = 56, SubcategoryName = "Video", CategoryId = 7},
        new { Id = 57, SubcategoryName = "Buitinė technika", CategoryId = 7},
        new { Id = 58, SubcategoryName = "Foto, optika", CategoryId = 7},
        new { Id = 59, SubcategoryName = "Biuro, prekybinė technika", CategoryId = 7},
        new { Id = 60, SubcategoryName = "Sodui, daržui, miškui", CategoryId = 7},
        new { Id = 61, SubcategoryName = "Pramoninė technika", CategoryId = 7},
        new { Id = 62, SubcategoryName = "Paslaugos, remontas", CategoryId = 7},
        new { Id = 63, SubcategoryName = "Kita", CategoryId = 7},
        new { Id = 64, SubcategoryName = "Knygos, kinas", CategoryId = 8}, // Pramogos
        new { Id = 65, SubcategoryName = "Sportas, žaidimai", CategoryId = 8},
        new { Id = 66, SubcategoryName = "Turizmas", CategoryId = 8},
        new { Id = 67, SubcategoryName = "Pažintys", CategoryId = 8},
        new { Id = 68, SubcategoryName = "Medžioklė, žvejyba", CategoryId = 8},
        new { Id = 69, SubcategoryName = "Muzika, instrumentai", CategoryId = 8},
        new { Id = 70, SubcategoryName = "Pakvietimai, bilietai", CategoryId = 8},
        new { Id = 71, SubcategoryName = "Suaugusiems", CategoryId = 8},
        new { Id = 72, SubcategoryName = "Kita", CategoryId = 8},
        new { Id = 73, SubcategoryName = "Moterims", CategoryId = 9}, // Drabužiai, avalynė
        new { Id = 74, SubcategoryName = "Vyrams", CategoryId = 9},
        new { Id = 75, SubcategoryName = "Vaikams", CategoryId = 9},
        new { Id = 76, SubcategoryName = "Avalynė", CategoryId = 9},
        new { Id = 77, SubcategoryName = "Spec. apranga", CategoryId = 9},
        new { Id = 78, SubcategoryName = "Papuošalai, aksesuarai", CategoryId = 9},
        new { Id = 79, SubcategoryName = "Paslaugos", CategoryId = 9},
        new { Id = 80, SubcategoryName = "Kita", CategoryId = 9},
        new { Id = 81, SubcategoryName = "Drabužiai, avalynė", CategoryId = 10}, // Auginantiems vaikus
        new { Id = 82, SubcategoryName = "Baldai", CategoryId = 10},
        new { Id = 83, SubcategoryName = "Priežiūros priemonės", CategoryId = 10},
        new { Id = 84, SubcategoryName = "Vežimėliai, autokėdutės", CategoryId = 10},
        new { Id = 85, SubcategoryName = "Judėjimo priemonės", CategoryId = 10},
        new { Id = 86, SubcategoryName = "Žaislai, mokyklinės prekės", CategoryId = 10},
        new { Id = 87, SubcategoryName = "Paslaugos vaikams", CategoryId = 10},
        new { Id = 88, SubcategoryName = "Kita", CategoryId = 10}
      };

      optionsBuilder.UseSeeding((context, _) =>
      {
        foreach (var newCategory in newCategories)
        {
          if (!context.Set<Category>().Any(c => c.CategoryName == newCategory.CategoryName))
            context.Set<Category>().Add(new Category { CategoryName = newCategory.CategoryName});
        }
        foreach (var newSubcategory in newSubcategories)
        {
          if (!context.Set<Subcategory>().Any(s => s.Id == newSubcategory.Id))
            context.Set<Subcategory>().Add(new Subcategory { SubcategoryName = newSubcategory.SubcategoryName,
              Category = context.Find<Category>(newSubcategory.CategoryId)});
        }
        context.SaveChanges();
      })
      .UseAsyncSeeding(async (context, _, cancellationToken) =>
      {
        foreach (var newCategory in newCategories)
        {
          if (!await context.Set<Category>().AnyAsync(c => c.CategoryName == newCategory.CategoryName, cancellationToken))
            context.Set<Category>().Add(new Category { CategoryName = newCategory.CategoryName});
        }
        foreach (var newSubcategory in newSubcategories)
        {
          if (!await context.Set<Subcategory>().AnyAsync(s => s.Id == newSubcategory.Id, cancellationToken))
            context.Set<Subcategory>().Add(new Subcategory { SubcategoryName = newSubcategory.SubcategoryName,
              Category = context.Find<Category>(newSubcategory.CategoryId)});
        }
        await context.SaveChangesAsync(cancellationToken);
      });
    }


  }
}