function getAllMovies() {
  fetch("https://localhost:7259/api/MovieModels")
    .then((res) => res.json())
    .then((data) => {
      createMovieCard(data);
    })
    .catch((error) => console.log(error));
}

function createMovieCard(data) {
  const movieListContainer = document.getElementById("movie-list");

  movieListContainer.innerHTML = "";

  data.forEach((movie) => {
    const card = document.createElement("div");
    card.className = "movie-card";

    const title = document.createElement("h2");
    title.textContent = movie.title;

    const director = document.createElement("p");
    director.textContent = `Director: ${movie.director}`;

    const year = document.createElement("p");
    year.textContent = `Year: ${movie.year}`;

    const genre = document.createElement("p");
    genre.textContent = `Genre: ${movie.genre}`;

    const rating = document.createElement("p");
    rating.textContent = `Rating: ${movie.rating}`;

    card.appendChild(title);
    card.appendChild(director);
    card.appendChild(year);
    card.appendChild(genre);
    card.appendChild(rating);

    movieListContainer.appendChild(card);
  });
}

const getAllMoviesButton = document.getElementById("get-All-Button");

getAllMoviesButton.addEventListener("click", function () {
  getAllMovies();
});

function createMovieCard(data) {
  const movieListContainer = document.getElementById("movie-list");

  movieListContainer.innerHTML = "";

  const movieGrid = document.createElement("div");
  movieGrid.className = "movie-grid";

  data.forEach((movie) => {
    const card = document.createElement("div");
    card.className = "movie-card";

    const title = document.createElement("h2");
    title.textContent = movie.title;

    const director = document.createElement("p");
    director.textContent = `Director: ${movie.director}`;

    const year = document.createElement("p");
    year.textContent = `Year: ${movie.year}`;

    const genre = document.createElement("p");
    genre.textContent = `Genre: ${movie.genre}`;

    const rating = document.createElement("p");
    rating.textContent = `Rating: ${movie.rating}`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "button";
    deleteButton.addEventListener("click", function () {
      deleteMovie(movie.id);
    });

    card.appendChild(title);
    card.appendChild(director);
    card.appendChild(year);
    card.appendChild(genre);
    card.appendChild(rating);
    card.appendChild(deleteButton);

    movieGrid.appendChild(card);
  });

  movieListContainer.appendChild(movieGrid);
}

function deleteMovie(movieId) {
  fetch(`https://localhost:7259/api/MovieModels/${movieId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        console.log(`Movie with ID ${movieId} deleted successfully.`);
        getAllMovies();
      } else {
        console.error("Error deleting movie:", response.status);
      }
    })
    .catch((error) => {
      console.error("Error deleting movie:", error);
    });
}

function clearMovieList() {
  const movieListContainer = document.getElementById("movie-list");
  movieListContainer.innerHTML = "";
}
const clearButton = document.getElementById("clear-Button");
clearButton.addEventListener("click", clearMovieList);

const createForm = document.getElementById("create-form");

createForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = {
    title: document.getElementById("title").value,
    director: document.getElementById("director").value,
    year: parseInt(document.getElementById("year").value),
    genre: document.getElementById("genre").value,
    duration: parseInt(document.getElementById("duration").value),
    rating: parseFloat(document.getElementById("rating").value),
  };
  if (isNaN(formData.rating) || formData.rating < 0 || formData.rating > 10) {
    alert("Please enter a number between 0 and 10.");
    return;
  }

  fetch("https://localhost:7259/api/MovieModels", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (response.ok) {
        const successMessage = document.getElementById("success-message");
        console.log("Movie added successfully!");
        successMessage.textContent = "Movie added successfully!";
        createForm.reset();
      } else {
        console.error("Error adding movie:", response.status);
      }
    })
    .catch((error) => {
      console.error("Error adding movie:", error);
    });
});

function createSingleMovieCard(movie) {
  const movieListContainer = document.getElementById("movie-list");
  movieListContainer.innerHTML = "";

  const card = document.createElement("div");
  card.className = "movie-card";

  const title = document.createElement("h2");
  title.textContent = movie.title;

  const director = document.createElement("p");
  director.textContent = `Director: ${movie.director}`;

  const year = document.createElement("p");
  year.textContent = `Year: ${movie.year}`;

  const genre = document.createElement("p");
  genre.textContent = `Genre: ${movie.genre}`;

  const rating = document.createElement("p");
  rating.textContent = `Rating: ${movie.rating}`;

  card.appendChild(title);
  card.appendChild(director);
  card.appendChild(year);
  card.appendChild(genre);
  card.appendChild(rating);

  movieListContainer.appendChild(card);
}

function searchMovies() {
  const searchInput = document.getElementById("search").value;

  fetch(`https://localhost:7259/api/MovieModels/${searchInput}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else if (res.status === 404) {
        throw new Error("Movie not found");
      } else {
        throw new Error("Server error");
      }
    })
    .then((data) => {
      createSingleMovieCard(data);
    })
    .catch((error) => {
      console.log(error);
    });
}
