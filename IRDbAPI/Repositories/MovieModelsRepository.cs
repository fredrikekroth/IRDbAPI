using IRDb.Database;
using IRDb.Models;
using System;

namespace IRDb.Repositories
{
    public class MovieModelsRepository : IMovieModelRepository
    {
        private readonly AppDbContext _context;
        public MovieModelsRepository(AppDbContext context)
        {
            _context = context;
        }
        public void DeleteMovieModel(int id)
        {
            MovieModel movieModelToDelete = _context.MovieModels.FirstOrDefault(m => m.Id == id);

            if (movieModelToDelete != null)
            {
                _context.MovieModels.Remove(movieModelToDelete);
                _context.SaveChanges();
            }
        }

        public IEnumerable<MovieModel> GetAllMovieModels()
        {
            return _context.MovieModels;
        }

        public MovieModel GetOneMovieModel(int id)
        {
            return _context.MovieModels.FirstOrDefault(m => m.Id == id);
        }

        public void PostMovieModel(MovieModel movieModel)
        {
            _context.MovieModels.Add(movieModel);
            _context.SaveChanges();
        }

        public void UpdateMovieModel(int id, MovieModel movieModel)
        {
            MovieModel? movieModelTpUpdate = _context.MovieModels.FirstOrDefault(m => m.Id == movieModel.Id);
            if (movieModelTpUpdate != null)
            {
                movieModelTpUpdate.Title = movieModel.Title;
                movieModelTpUpdate.Director = movieModel.Director;
                movieModelTpUpdate.Year = movieModel.Year;
                movieModelTpUpdate.Genre = movieModel.Genre;
                movieModelTpUpdate.Duration = movieModel.Duration;
                movieModelTpUpdate.Rating = movieModel.Rating;

                _context.SaveChanges();
            }
        }
    }
}