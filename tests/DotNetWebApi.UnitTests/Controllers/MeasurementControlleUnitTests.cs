using DotNetCoreWebApi.Controllers;
using DotNetCoreWebApi.Model;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace DotNetWebApi.UnitTests.Controllers
{
    public class MeasurementControlleUnitTests
    {
        [Fact]
        public async Task get_all_measurements()
        {
            // Arrange 
            var repository = MeasurementContextMocker.GetInMemoryMeasurementsRepository(nameof(get_all_measurements));
            var controller = new MeasurementController(repository);

            // Act
            var response = await controller.GetAll() as ObjectResult;
            var measurements = response.Value as List<Measurement>;

            // Assert
            Assert.Equal(200, response.StatusCode);
            Assert.Equal(5, measurements.Count);
        }

        [Fact]
        public async Task get_measurement_with_existing_id()
        {
            // Arrange 
            var repository = MeasurementContextMocker.GetInMemoryMeasurementsRepository(nameof(get_measurement_with_existing_id));
            var controller = new MeasurementController(repository);
            var expectedValue = 0.25m;

            // Act
            var response = await controller.Get(1) as ObjectResult;
            var measurement = response.Value as Measurement;

            // Assert
            Assert.Equal(200, response.StatusCode);
            Assert.Equal(expectedValue, measurement.Value);
        }

        [Fact]
        public async Task get_measurement_with_not_existing_id()
        {
            // Arrange 
            var repository = MeasurementContextMocker.GetInMemoryMeasurementsRepository(nameof(get_measurement_with_not_existing_id));
            var controller = new MeasurementController(repository);
            var expectedMessage = "The Measurement record couldn't be found.";

            // Act
            var response = await controller.Get(10) as ObjectResult;

            // Assert
            Assert.Equal(404, response.StatusCode);
            Assert.Equal(expectedMessage, response.Value);
        }
    }
}
