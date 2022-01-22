const urlStart = 'https://www.omdbapi.com/?apikey=55c79898';
const main = document.getElementsByTagName('main')[0];
const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', (event) => {
  event.preventDefault();
  main.innerHTML = '';
  showMovies();
});

const showMovies = () => {
  const requestPrefix = '&s=';
  const requestUrl = getRequestUrl(requestPrefix);
  getMovies(requestUrl).then( movies => {
    movies.forEach( movie => {
      displayMovie(movie);
      getMovieDetailed(movie.imdbID).then( movieDetailed => { 
        createModal(movieDetailed);
        createModalListener(movieDetailed.imdbID); 
      });
    });
  });
};

// Creates url for the request based on user inputs in the search form field
const getRequestUrl = (requestPrefix) => {
  const keywords = document.getElementById('search').value;
  const urlEnd = keywords.replace(/ /g, '+');
  const url = urlStart + requestPrefix + urlEnd;
  return url;
};

// ASYNC fetching movies and returns them in an array 
const getMovies = async (requestUrl) => {
  try {
    const response = await get(requestUrl);
    const movies = response.Search;
    return movies; 
  }catch (error) { 
    console.error('Error fetching movies list : ', error.message); 
  }
};

// Returns a detailed movie from its ID
const getMovieDetailed = async (movieID) => {
  const request = urlStart + '&i=' + movieID;
  try {
    const response = await window.fetch(request);
    const detailedMovie = await response.json();
    return detailedMovie;
  }catch (error) { 
    console.error('Error fetching details of a movie : ', error.message); 
  }
}

// ASYNC HTTP REQUEST
const get = async (url) => {
  try {
    const response = await window.fetch(url);
    return await response.json();
  }catch (error) { 
    console.error('Error fetching data : ', error.message); 
  }
};

// Creates the HTML card elements for a movie
const displayMovie = (movie) => {
  main.innerHTML += `
  <div id="movieCard__${movie.imdbID}" class="col-6 m-5">
    <div class="row">
      <div class="col-2 mx-5 p-0">
        <img src="${movie.Poster}" class="img-fluid rounded-start" alt="poster">
      </div>
      <div class="movie col d-flex flex-column justify-content-center align-items-center">
        <h6>${movie.Title}</h6>
        <p class="text-muted">${movie.Year}</p>
        <button id="button__${movie.imdbID}" class="btn btn-success mt-3 px-5">Read more</button>
      </div>
    </div>
  </div>
  `;
};

// Creates the HTML card elements for a movie
const createElement = (movie) => {
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
const createModal =  (movie) => {
  try {
    const movieCard = document.getElementById('movieCard__' + movie.imdbID);
    movieCard.innerHTML += `
      <div id="modal__${movie.imdbID}" class="modal container-fluid">
        <div class="modal-content">
          <div class="row">
            <div class="col-3 text-center">
              <img src="${movie.Poster}" class="img-fluid rounded-start" alt="poster">
            </div>
            <div class="col-6 px-5 align-self-center">
              <p>${movie.Plot}</p>
            </div>
            <div class="col-3 text-center">
              <span id="span__${movie.imdbID}" class="close m-5">&times;</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }catch (error) {
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