//TMDB API CALL
const KEY = 'f99d5da18cb1af6e440c68b9bb2cc3b9';
const URL = 'https://api.themoviedb.org/3';
const apiURL = `${URL}/discover/movie?sort_by=popularity.desc&api_key=${KEY}`;
const imgURL = 'https://image.tmdb.org/t/p/w500';
const searchURL = `${URL}/search/movie?query=`;
const genreURL = `${URL}/genre/movie/list?api_key=${KEY}`;
const tvURL = `${URL}/discover/tv?sort_by=popularity.desc&api_key=${KEY}`;
const genreMovies = `${URL}/discover/movie?api_key=${KEY}&with_genres=`;


// Selecting elements
const main = document.getElementById('main');
const form = document.getElementById('form');
const searchBar = document.getElementById('searchBar');
const signout = document.getElementById('signout');
const watchBTN = document.getElementById('watch_btn');
const changeBTN = document.getElementById('change_btn');
let btn_1 = document.querySelector(".btn_1");
let toggler = document.querySelector(".toggler");
let btn_2 = document.querySelector(".btn_2");
let list_pass = [];
let tv_pass = [];

//Getting User info from session storage
let UserCreds = JSON.parse(sessionStorage.getItem("user-creds"));
let UserInfo = JSON.parse(sessionStorage.getItem("user-info"));

// Sign Out functionality
let signOutWork = () => {
    // Clearing session Storage
    sessionStorage.removeItem("user-creds");
    sessionStorage.removeItem("user-info");
    window.location.href = 'auth.html';
}

// If the user is logged in or not
let checkCred = () => {
    if (!sessionStorage.getItem("user-creds")) {
        window.location.href = 'auth.html';
    }
}

//Event listerners
window.addEventListener('load', checkCred);
signout.addEventListener('click', signOutWork);

// Returning color for rating
function getColor(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const selectElement = document.getElementById('genre_btn');

    // Fetch options from API and populate the select element
    fetch(genreURL)
        .then(response => response.json())
        .then(data => {
            data.genres.forEach(option => {
                const opt = document.createElement('option');
                opt.value = option.id;
                opt.textContent = option.name;
                opt.classList.add('option');
                selectElement.appendChild(opt);
            });
        });

    // Add event listener to handle selection change
    selectElement.addEventListener('change', function () {
        const selectedId = this.value;
        if (selectedId && selectedId != 'select') {
            const url = `${genreMovies}${selectedId}`;
            const newTabURL = `genrePage.html?apiUrl=${encodeURIComponent(url)}`;
            // window.open(url, '_blank'); // Open new tab with URL
            window.open(newTabURL, '_self');
        }
    });
});

// Watchlist webpage function
function watchPage(list_pass, tv_pass) {
    main.innerHTML = '';

    list_pass.forEach(element => {
        fetch(`${URL}/movie/${element}?api_key=${KEY}`)
            .then(res => res.json())
            .then(data => {

                const { title, id, poster_path, overview } = (data);
                let { vote_average } = (data);

                vote_average = Math.round(vote_average * 10) / 10;

                const movieContainer = document.createElement('div');
                movieContainer.classList.add('movies');

                movieContainer.innerHTML = `
            <img src="${imgURL + poster_path}" alt="${title}" >

        <div class="movies_content">
            <h3>${title}</h3>
            <span style="color: ${getColor(vote_average)};">${vote_average}</span>
        </div>

        <div class="description">
            <h3>Description</h3>

            ${overview}
            
        </div>
        <i class="fa-solid fa-trash removeto"></i>
            <br><br>
            <div class="disid">${id}</div>`

                main.appendChild(movieContainer);
            })
    })

    tv_pass.forEach(element => {
        fetch(`${URL}/tv/${element}?api_key=${KEY}`)
            .then(res => res.json())
            .then(data => {

                const { name, id, poster_path, overview } = (data);
                let { vote_average } = (data);

                vote_average = Math.round(vote_average * 10) / 10;

                const movieContainer = document.createElement('div');
                movieContainer.classList.add('movies');

                movieContainer.innerHTML = `
            <img src="${imgURL + poster_path}" alt="${name}" >

        <div class="movies_content">
            <h3>${name}</h3>
            <span style="color: ${getColor(vote_average)};">${vote_average}</span>
        </div>

        <div class="description">
            <h3>Description</h3>

            ${overview}
            
        </div>
        <i class="fa-solid fa-trash removito"></i>
            <br><br>
            <div class="disiid">${id}</div>`

                main.appendChild(movieContainer);
            })
    })
}

