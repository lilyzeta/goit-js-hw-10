import './css/styles.css';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api.js';
import Notiflix from 'notiflix';

const loader = document.querySelector('.loader');
const selectCat = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');

selectCat.onchange = showInfoCat;
  
function makeupSelect() { 
    loader.classList.remove('hide');
    fetchBreeds()
        .then(data => {
          loader.classList.add('hide');
          selectCat.innerHTML = data.map(({ name, id }) => `<option value="${id}">${name}</option>`).join('');
          selectCat.classList.remove('hide');
      })
        .catch(() => {
            loader.classList.add('hide');
            Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
      });
    
}
makeupSelect() 

function showInfoCat() {
  catInfoEl.innerHTML = '';
    loader.classList.remove('hide');
    fetchCatByBreed(selectCat.value)
      .then(data => {
       loader.classList.add('hide');
        makeUpCatInfo(data[0]);
      })
        .catch(() => {
          loader.classList.add('hide');
        Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
      });
}

function makeUpCatInfo(breed) {
    loader.classList.add('hide');
    let title = `<h2>${breed.breeds[0].name}</h2>`
    let image = `<div><img src="${breed.url}"></div>`;
    let description = `<h3>Description</h3><p>${breed.breeds[0].description}</p>`;
    let temperament = `<h3>Temperament</h3><p>${breed.breeds[0].temperament}</p>`;
    catInfoEl.innerHTML = image + '<div class="content">' + title + description + temperament + '</div>';
    console.log(title);
}