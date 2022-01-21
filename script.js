// DOM VARIABLES
const searchButton = document.getElementById('searchButton');
const main = document.getElementsByTagName('main')[0];

// JS VARIABLES
const requestPrefix = 'https://www.omdbapi.com/?apikey=55c79898';

// Event listener on the submit button to send a request/fetch
searchButton.addEventListener('click', (event) => {
  event.preventDefault();
  main.innerHTML = '';
  const keywordsInput = document.getElementById('keywords').value;
  const requestSuffix = keywordsInput.replace(/ /g, '+');
  const request = requestPrefix + '&s=' + requestSuffix;
  showMovies(request);
});

// Displays list of searched film (called by Event Listener on searchButton)
const showMovies = async (request) => {
  try {
    const response = await window.fetch(request);
    const json = await response.json();
    const movies = json.Search;
    movies.forEach(movie => {
      createMovieElement(movie);
      createMovieModal(movie);
    });
    } catch (error) {
      console.log('Response error :s : ', error.message);
  }  
};

// Creates the HTML card elements for a movie
const createMovieElement = (movie) => {
  main.innerHTML += `
  <div id="movieCard__${movie.imdbID}" class="col-5 m-5 card border">
    <div class="row g-0">
      <div class="col-md-3 p-4">
        <img src="${movie.Poster}" class="img-fluid rounded-start" alt="poster">
      </div>
      <div class="col-md-8 pt-2">
        <div class="card-body text-center mt-5">
          <h5 class="card-title">${movie.Title}</h5>
          <p class="card-text">Sorti en ${movie.Year}</p>
          <button id="button__${movie.imdbID}" class="btn btn-warning mt-3 px-5">Description</button>
        </div>
      </div>
    </div>
  </div>
  `;
};

// Adds hidden modals to a movie
const createMovieModal = async (movie) => {
  try {
    const request = requestPrefix + '&i=' + movie.imdbID;
    const response = await window.fetch(request);
    const detailedMovie = await response.json();
    const plot = detailedMovie.Plot;
    const movieCard = document.getElementById('movieCard__' + movie.imdbID);
    movieCard.innerHTML += `
      <div id="modal__${movie.imdbID}" class="modal container-fluid">
        <div class="modal-content">
          <div class="row">
            <div class="col-3 text-center">
              <img src="${movie.Poster}" class="img-fluid rounded-start" alt="poster">
            </div>
            <div class="col-6 px-5 align-self-center">
              <p>${plot}</p>
            </div>
            <div class="col-3 text-center">
              <span id="span__${movie.imdbID}" class="close m-5">&times;</span>
            </div>
          </div>
        </div>
      </div>
    `;
    createModalListener(movie.imdbID);
  } catch (error) {
    console.log('Response error :s : ', error.message);
  }
};


const createModalListener = (id) => {
  const button = document.getElementById('button__'+id);
  const modal = document.getElementById('modal__'+id);
  const span = document.getElementById('span__'+id);
  button.addEventListener('click', () => {
    modal.style.display = 'block';
  });
  span.addEventListener('click', () => {
    modal.style.display = 'none';
  }); 
  window.addEventListener('click', (e) => {
    if (e.target == modal) {
      modal.style.display = "none";
    }
  }); 
};