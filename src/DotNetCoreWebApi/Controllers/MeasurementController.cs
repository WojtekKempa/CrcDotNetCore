using DotNetCoreWebApi.Model;
using DotNetCoreWebApi.Repository;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DotNetCoreWebApi.Controllers
{
    [Route("api/measurement")]
    [ApiController]
    public class MeasurementController : Controller
    {
        private readonly IMeasurementRepository<Measurement> _measurementRepository;

        public MeasurementController(IMeasurementRepository<Measurement> measurementRepository)
        {
            _measurementRepository = measurementRepository;
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var measurements = await _measurementRepository.GetAll();

            return Ok(measurements);
        }

        [HttpGet("{id}", Name = "Get")]
        public async Task<IActionResult> Get(long id)
        {
            var measurement = await _measurementRepository.Get(id);

            return Ok(measurement);
        }

        [HttpPost]
        public async Task<IActionResult> Post(Measurement measurement)
        {
            await _measurementRepository.Add(measurement);

            return CreatedAtAction(nameof(Get), new { id = measurement.Id }, measurement);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(long id, Measurement measurement)
        {
            var measurementToUpdate = await _measurementRepository.Get(id);
            await _measurementRepository.Update(measurementToUpdate, measurement);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var measurementToDelete = await _measurementRepository.Get(id);
            await _measurementRepository.Delete(measurementToDelete);

            return NoContent();
        }
    }
}
