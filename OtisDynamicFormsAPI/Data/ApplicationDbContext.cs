using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using OtisDynamicFormsModels;
using System.Reflection.Emit;
using System.Text.RegularExpressions;

namespace OtisDynamicFormsAPI.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    { 
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
        { }

        public DbSet<GroupModel> Groups { get; set; }
       // public DbSet<ApplicationUser> Users { get; set; } // Add DbSet for the ApplicationUser table
        public DbSet<UserGroup> UserGroups { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            SeedRoles(builder);
            builder.Entity<UserGroup>()
           .HasKey(gu => new { gu.UserId, gu.GroupId });

            builder.Entity<UserGroup>()
                .HasOne<OtisDynamicFormsModels.ApplicationUser>(gu => gu.AppUser)
                .WithMany(gu => gu.UGroups)
                .OnDelete(DeleteBehavior.Restrict)
                .HasForeignKey(gu => gu.UserId);

            builder.Entity<UserGroup>()
                .HasOne<GroupModel>(gu => gu.Groups)
                .WithMany(gu => gu.UGroups)
                .OnDelete(DeleteBehavior.Restrict)
                .HasForeignKey(gu => gu.GroupId);


        }


        private static void SeedRoles(ModelBuilder builder)
        {
            builder.Entity<IdentityRole>().HasData
                (
                new IdentityRole() { Name = "Admin", ConcurrencyStamp = "1", NormalizedName = "Admin" },
                new IdentityRole() { Name = "User", ConcurrencyStamp = "2", NormalizedName = "User" },
                new IdentityRole() { Name = "SuperAdmin", ConcurrencyStamp = "3", NormalizedName = "SuperAdmin" }
                );
        }

    }
}
