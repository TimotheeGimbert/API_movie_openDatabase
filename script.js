// Adds an event listener on the submit button to send a request/fetch
const submitButton = document.getElementById('submitButton');
const main = document.getElementsByTagName('main')[0];

submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  main.innerHTML = '';
  const keywords = document.getElementById('keywords').value;
  const keywordsAdapted = keywords.replace(/ /g, '+');
  const request = 'http://www.omdbapi.com/?apikey=55c79898&s=' + keywordsAdapted;
  getMovies(request);
});

// RETURNS a list of movies from a request
const getMovies = async (request) => {
  try {
    const response = await window.fetch(request);
    const json = await response.json();
    const movies = json.Search;
    movies.forEach(movie => {
      createMovieElement(movie);
    });
    } catch (error) {
      console.log('Response error :s : ', error.message);
  }  
};

// CREATES HTML elements section from a detailed movie
const createMovieElement = (movie) => {
  console.log(movie);
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
          <button id="button__${movie.imdbID}" class="btn btn-warning mt-3 px-5">Détails</button>
          <div id="modal__${movie.imdbID}" class="modal">
            <div class="modal-content">
              <span class="close">&times;</span>
              <p>$ {movie.Plot}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
}




// RETURNS a detailed movie from an id
const getMovieDetailed = async (movieId) => {
  try {
    const request = 'http://www.omdbapi.com/?apikey=55c79898&i=' + movieId;
    const response = await window.fetch(request);
    const detailedMovie = await response.json();
    return detailedMovie;
  } catch (error) {
    console.log('Response error :s : ', error.message);
  }
}


// MAIN EXEC / EVENT LISTENERS




const AddModalsListeners = (id) => {
  const button = document.getElementById('button__'+id);
  const modal = document.getElementById('modal__'+id);
  button.addEventListener('click', () => {
    modal.style.display = 'block';
  });
};
