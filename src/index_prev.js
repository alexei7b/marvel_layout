import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import MarvelService from './services/MarvelService';

import './style/sass/style.scss';

// const marvelService = new MarvelService();
// marvelService.getAllCharacters().then(res => console.log(res));

// marvelService.getCharacters(11).then(res => console.log(res));

// вместо того что бы просто выводит резултат, напишем ф-цию: получим массив, котор. будет хранится в data.results
// дальше переберем массив, выведем имя в массив  
// marvelService.getAllCharacters().then(res => res.data.results.forEach(item => console.log(item.name)));

const root = ReactDOM.createRoot(document.getElementById('root'));
// <React.StrictMode>
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);