const createMovie = (movie) => {
  const main = document.getElementsByTagName('main')[0];
  main.innerHTML += `
  <div class="col-5 m-5 card border">
    <div class="row g-0">
      <div class="col-md-3 p-4">
        <img src="${movie.Poster}" class="img-fluid rounded-start" alt="poster">
      </div>
      <div class="col-md-8 pt-2">
        <div class="card-body text-center mt-5">
          <h5 class="card-title">${movie.Title}</h5>
          <p class="card-text">Sorti en ${movie.Year}</p>
          <button id="detailsButton" class="btn btn-warning mt-3 px-5">Détails</button>
        </div>
      </div>
    </div>
  </div>
  `; 
}

const displayMovies = (movies) => {
  movies.forEach(movie => {
    createMovie(movie);
  });
};

const getMovies = async (request) => {
  try {
    const response = await window.fetch(request);
    const json = await response.json();
    const movies = json.Search;
    console.log(movies);
    displayMovies(movies);
    } catch (error) {
      console.log('Response error :s : ', error.message);
  }  
};

const submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  const keyString = document.getElementById('keywords').value;
  const requestString = keyString.replace(/ /g, '+');
  const request = 'http://www.omdbapi.com/?apikey=55c79898&s=' + requestString;
  getMovies(request);
});

