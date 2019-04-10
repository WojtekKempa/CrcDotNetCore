using DotNetCoreWebApi.DbContexts;
using DotNetCoreWebApi.Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace DotNetWebApi.UnitTests
{
    public static class MeasurementContextExtensions
    {
        public static void FillDatabase(this MeasurementContext dbContext)
        {
            dbContext.Measurements.Add
            (
                new Measurement
                {
                    Id = 1,
                    Name = "Measurement_01",
                    Value = 0.25m,
                    CreatedBy = "Operator_01",
                    CreatedAt = Convert.ToDateTime("2019/03/25 01:00:00 PM")
                }
            );

            dbContext.Add
            (
                new Measurement
                {
                    Id = 2,
                    Name = "Measurement_02",
                    Value = 0.50m,
                    CreatedBy = "Operator_01",
                    CreatedAt = Convert.ToDateTime("2019/03/25 02:00:00 PM")
                }
            );

            dbContext.Add
            (
                new Measurement
                {
                    Id = 3,
                    Name = "Measurement_03",
                    Value = 0.75m,
                    CreatedBy = "Operator_01",
                    CreatedAt = Convert.ToDateTime("2019/03/25 03:00:00 PM")
                }
            );

            dbContext.Add
            (
                new Measurement
                {
                    Id = 4,
                    Name = "Measurement_04",
                    Value = 1.00m,
                    CreatedBy = "Operator_01",
                    CreatedAt = Convert.ToDateTime("2019/03/25 04:00:00 PM")
                }
            );

            dbContext.Add
            (
                new Measurement
                {
                    Id = 5,
                    Name = "Measurement_05",
                    Value = 1.25m,
                    CreatedBy = "Operator_01",
                    CreatedAt = Convert.ToDateTime("2019/03/25 05:00:00 PM")
                }
            );

            dbContext.SaveChanges();
        }
    }
}
