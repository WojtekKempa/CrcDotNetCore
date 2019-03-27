using DotNetCoreWebApi.Model;
using Microsoft.EntityFrameworkCore;

namespace DotNetCoreWebApi.DbContexts
{
    public class MeasurementContext : DbContext
    {
        public MeasurementContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Measurement> Measurements { get; set; }
    }
}
