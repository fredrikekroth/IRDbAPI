using IRDb.Models;

namespace IRDb.Repositories

{
    public interface IMovieModelRepository
    {
        public IEnumerable<MovieModel> GetAllMovieModels();
        public MovieModel GetOneMovieModel(int id);
        public void PostMovieModel(MovieModel movieModel);
        public void DeleteMovieModel(int id);
        public void UpdateMovieModel(int id, MovieModel movieModel);

    }
}