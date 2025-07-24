using Microsoft.EntityFrameworkCore;
using Recuitment_DataAccess.Data_Object;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Recuitment_DataAccess.EFCore
{
    public class Recruitment_DBContext : DbContext
    {
        public Recruitment_DBContext(DbContextOptions<Recruitment_DBContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            // Cấu hình mối quan hệ many-to-many qua bảng PostKeywords
            modelBuilder.Entity<JobPost>()
                .HasMany(jp => jp.JobKeywords)
                .WithMany(jk => jk.JobPosts)
                .UsingEntity(j => j.ToTable("PostKeyword"));

            base.OnModelCreating(modelBuilder);
        }
        public DbSet<Employer> employer { get; set; } = null!;
        public DbSet<JobKeyword> jobkeyword { get; set; } = null!;  
        public DbSet<JobPost> jobpost { get; set; } = null!;
    }
}
