using IRDb.Models;
using IRDb.Repositories;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using IRDb.Database;

namespace IRDb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieModelsController : ControllerBase
    {
        private readonly IMovieModelRepository _repository;

        public MovieModelsController(IMovieModelRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IEnumerable<MovieModel> Get()
        {
            return _repository.GetAllMovieModels();
        }

        [HttpGet("{id}")]
        public IActionResult GetOneMovieModel(int id)
        {
            MovieModel foundMovieModel = _repository.GetOneMovieModel(id);
            if (foundMovieModel != null)
            {
                return Ok(foundMovieModel);
            }
            else
            {
                return NotFound("Could not find Movie Model.");
            }
        }

        [HttpPost]
        public void Post([FromBody] MovieModel movieModel)
        {
            _repository.PostMovieModel(movieModel);
        }

        [HttpPost("{id}")]
        public void UpdateMovieModel(int id, MovieModel movieModel)
        {
            _repository.UpdateMovieModel(id, movieModel);
        }

        [HttpDelete("/api/MovieModels/{id}")]
        public IActionResult Delete(int id)
        {
            _repository.DeleteMovieModel(id);

            return NoContent();
        }


    }
}