const submitButton = document.getElementById('submitButton');

submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  const keyString = document.getElementById('keywords').value;
  const requestString = keyString.replace(/ /g, '+');
  
});
