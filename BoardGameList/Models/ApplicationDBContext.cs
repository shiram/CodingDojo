using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace BoardGameList.Models
{
    public class ApplicationDBContext : IdentityDbContext<BoardGameUser>
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            //TODO: new code here
            modelBuilder.Entity<BoardGames_Domains>()
                .HasKey(i => new { i.BoardGameId, i.DomainId });

            modelBuilder.Entity<BoardGames_Domains>()
                .HasOne(x => x.BoardGame)
                .WithMany(x => x.BoardGames_Domains)
                .HasForeignKey(x => x.BoardGameId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<BoardGames_Domains>()
                .HasOne(x => x.Domain)
                .WithMany(x => x.BoardGames_Domains)
                .HasForeignKey(x => x.DomainId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<BoardGames_Mechanics>()
                .HasKey(i => new {i.BoardGameId, i.MechanicId});

            modelBuilder.Entity<BoardGames_Mechanics>()
                .HasOne(x => x.BoardGame)
                .WithMany(x => x.BoardGames_Mechanics)
                .HasForeignKey(x => x.BoardGameId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<BoardGames_Mechanics>()
                .HasOne(x => x.Mechanic)
                .WithMany(x => x.BoardGames_Mechanics)
                .HasForeignKey(x => x.MechanicId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<BoardGames_Categories>()
                .HasKey(i => new {i.BoardGameId, i.CategoryId});

            modelBuilder.Entity<BoardGames_Categories>()
                .HasOne(x => x.BoardGame)
                .WithMany(x => x.BoardGames_Categories)
                .HasForeignKey(x => x.BoardGameId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<BoardGames_Categories>()
                .HasOne(x => x.Category)
                .WithMany(x => x.BoardGames_Categories)
                .HasForeignKey(x => x.CategoryId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<BoardGame>()
                .HasOne(x => x.Publisher)
                .WithMany(x => x.BoardGames)
                .HasForeignKey(x => x.PublisherId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            /*
            * To Change the default table names of asp identity, uncomment this below
            */
            //modelBuilder.Entity<BoardGameUser>().ToTable("Users");
            //modelBuilder.Entity<IdentityRole>().ToTable("Roles");
            //modelBuilder.Entity<IdentityRoleClaim<string>>().ToTable("RoleClaims");
            //modelBuilder.Entity<IdentityUserRole<string>>().ToTable("UserRoles");
            //modelBuilder.Entity<IdentityUserClaim<string>>().ToTable("UserClaims");
            //modelBuilder.Entity<IdentityUserLogin<string>>().ToTable("UserLogins");
            //modelBuilder.Entity<IdentityUserToken<string>>().ToTable("UserTokens");
        }

        public DbSet<BoardGame> BoardGames => Set<BoardGame>(); 
        public DbSet<Domains> Domains => Set<Domains>();
        public DbSet<Mechanics> Mechanics => Set<Mechanics>();
        public DbSet<BoardGames_Domains> BoardGames_Domains => Set<BoardGames_Domains>();
        public DbSet<BoardGames_Mechanics> BoardGames_Mechanics => Set<BoardGames_Mechanics>();
        public DbSet<Publishers> Publishers => Set<Publishers>();
        public DbSet<Category> Categories => Set<Category>();
        public DbSet<BoardGames_Categories> BoardGames_Categories => Set<BoardGames_Categories>();
    }
}