const urlStart = 'https://www.omdbapi.com/?apikey=55c79898';

const get = async (url) => {
  try {
    const response = await fetch(url);
    const jsonObject = await response.json();
    return jsonObject;
  }catch (error) { console.error('Error fetching data : ', error.message); }
};
const searchToRequestURL = () => {
  const prefix = '&s=';
  const keywords = document.getElementById('search').value;
  const urlEnd = keywords.replace(/ /g, '+');
  const url = urlStart + prefix + urlEnd;
  return url;
};
const movieToRequestURL = (movieID) => {
  const prefix = '&i=';
  const url = urlStart + prefix + movieID;
  return url;
};

document.getElementById('searchButton').addEventListener('click', (event) => {
  event.preventDefault();
  document.querySelector('main').innerHTML = '';
  showMovies();
});

async function showMovies() {
  const url = searchToRequestURL();
  const jsonObject = await get(url);
  const movies = jsonObject.Search;
  movies.forEach( movie => {
    createMovie(movie);
  });
  movies.forEach( movie => {
    createModalListener(movie.imdbID);
  });
  createIntersectionObserver();
}

const createModalListener = (movieID) => {
  const movie = document.getElementById(`${movieID}`);
  movie.addEventListener('click', async () => {
    const url = movieToRequestURL(movieID)
    const movieDetailed = await get(url);
    createModal(movieDetailed);
    const modal = document.getElementById('modal__'+movieID);
    modal.style.display = 'block';
    const modalClose = document.getElementById('modalClose__'+movieID);
    modalClose.addEventListener('click', () => modal.style.display = "none");
    window.addEventListener('click', (e) => e.target === modal ? modal.style.display = "none" : null);
  });
};

const createMovie = (movie) => {
  document.querySelector('main').innerHTML += `
  <div id="${movie.imdbID}" class="reveal col-lg-6 m-lg-5 col-10 my-3">
    <div class="row">
      <div class="col-lg-2 mx-lg-5 p-0 col-7 mx-auto">
        <img src="${movie.Poster}" class="img-fluid rounded" alt="">
      </div>
      <div class="movie col my-4 mx-auto mx-lg-5 p-3 d-flex flex-column justify-content-center align-items-center">
        <h6>${movie.Title}</h6>
        <p class="text-muted mb-0">${movie.Year}</p>
        <button id="button__${movie.imdbID}" class="d-lg-none btn btn-warning mt-1 px-5">Details</button>
      </div>
    </div>
  </div>
  `;
};

const createIntersectionObserver = () => {
  const ratio = 0.1;
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: ratio
  };
  const handleIntersect = (entries, observer) => {
    entries.forEach( (entry) => {
      if (entry.intersectionRatio > ratio) {
        console.log(entry.intersectionRatio);
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      }
    })
  }
  const observer = new IntersectionObserver(handleIntersect, options);
  const elementsToReveal = document.querySelectorAll(`.reveal`)
  elementsToReveal.forEach( e => {
    observer.observe(e);
    console.log('observer done');
  });
}

const createModal = (movie) => {
  document.getElementById('modalsContainer').innerHTML += `
    <div id="modal__${movie.imdbID}" class="modal container-fluid">
      <div class="modal-content">
        <div class="row py-4">
          <div class="col-10 col-lg-3 m-4 mx-auto text-center">
            <img src="${movie.Poster}" class="img-fluid rounded" alt="">
          </div>
          <div class="col col-lg-7 mx-auto px-5 align-self-center">
            <h1>${movie.Title}</h1>
            <h4 class="text-muted">(${movie.Year})</h4>
            <h5>${movie.Genre}</h5>
            <h6>${movie.Runtime}</h5>
            <p class="my-3">Actors : ${movie.Actors}</p>
            <p class="my-5">${movie.Plot}</p>
          </div>
          <button id="modalClose__${movie.imdbID}" class="d-lg-none btn btn-danger px-5">Close</button>
        </div>
      </div>
    </div>
  `;
};