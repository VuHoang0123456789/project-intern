using bai_3.Models;
using Microsoft.EntityFrameworkCore;

namespace bai_3.Context
{
    public class QLSinhVienContext:DbContext
    {
        public QLSinhVienContext(DbContextOptions<QLSinhVienContext> options): base(options)
        {

        }

        public DbSet<Student> Students { get; set; }

        public DbSet<Factulty> Factulty { get; set; }
    }
}
