const urlStart = 'https://www.omdbapi.com/?apikey=55c79898';
const main = document.getElementsByTagName('main')[0];
const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click', (event) => {
  event.preventDefault();
  main.innerHTML = '';
  showMovies();
});

  //createModal(movieDetailed);
  //createModalListener(movieDetailed.imdbID);

const showMovies = () => {
  const requestPrefix = '&s=';
  const requestUrl = getRequestUrl(requestPrefix);
  getMovies(requestUrl).then( movies => {
    movies.forEach( movie => {
      displayMovie(movie);
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
  const requestUrl = urlStart + '&i=' + movieID;
  return get(requestUrl).then( movieDetailed => {
    return movieDetailed;
  });
}

// ASYNC HTTP REQUEST
const get = async (url) => {
  try {
    const response = await fetch(url);
    return await response.json();
  }catch (error) { console.error('Error fetching data : ', error.message); }
};


// Creates the HTML movie element and modal and modal listener
const displayMovie = (movie) => {
  main.innerHTML += `
  <div id="movieCard__${movie.imdbID}" class="col-md-5 m-md-5 col-10 my-3">
    <div class="row">
      <div class="col-md-2 mx-md-5 p-0 col-7 mx-auto">
        <img src="${movie.Poster}" class="img-fluid rounded" alt="">
      </div>
      <div id="movie__${movie.imdbID}" class="movie col-12 col-md my-4 p-3 d-flex flex-column justify-content-center align-items-center">
        <h6>${movie.Title}</h6>
        <p class="text-muted mb-0">${movie.Year}</p>
        <button id="button__${movie.imdbID}" class="d-md-none btn btn-warning mt-1 px-5">Details</button>
      </div>
    </div>
  </div>
  `;
  getMovieDetailed(movie.imdbID).then( movieDetailed => {
    createModal(movieDetailed);
  });
};

// Adds hidden modals to a movie
const createModal =  (movie) => {
  const movieCard = document.getElementById('movieCard__' + movie.imdbID);
  const modalsContainer = document.getElementById('modalsContainer');
  movieCard.innerHTML += `
    <div id="modal__${movie.imdbID}" class="modal container-fluid">
      <div class="modal-content">
        <div class="row py-4">
          <div class="col-10 col-md-3 m-4 text-center">
            <img src="${movie.Poster}" class="img-fluid rounded" alt="">
          </div>
          <div class="col-12 col-md-6 px-5 align-self-center">
            <h1>${movie.Title}</h1>
            <h4 class="text-muted">(${movie.Year})</h4>
            <h5>${movie.Genre}</h5>
            <h6>${movie.Runtime}</h5>
            <p class="my-3">Actors : ${movie.Actors}</p>
            <p class="my-5">${movie.Plot}</p>
          </div>
          <div class="col-6 mx-auto col-md-2 text-center">
            <span id="span__${movie.imdbID}" class="close m-5">&times;</span>
          </div>
        </div>
      </div>
    </div>
  `;
  console.log(movie.imdbID);
  createModalListener(movie.imdbID);
};

const createModalListener = (id) => {
  const movie = document.getElementById('movie__'+id);
  const modal = document.getElementById('modal__'+id);
  const span = document.getElementById('span__'+id);
  movie.addEventListener('click', () => {
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