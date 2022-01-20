const submitButton = document.getElementById('submitButton');

const getMovies = async (request) => {
  try {
    const response = await window.fetch(request);
    const movies = await response.json();
    console.log(movies);
    } catch (error) {
      console.log('Response error :s : ', error.message);
  }  
}

submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  const keyString = document.getElementById('keywords').value;
  const requestString = keyString.replace(/ /g, '+');
  const request = 'http://www.omdbapi.com/?apikey=55c79898&s=' + requestString;
  console.log(request);
  getMovies(request);
});

