const date = new Date;
let hours = date.getHours();
let stat = (hours < 12) ? "Morning" :
    ((hours <= 16 && hours >= 12) ? "Afternoon" : "Evening");
console.log(stat);

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
const heading = document.getElementById('welcome');
let btn_1 = document.querySelector(".btn_1");
let toggler = document.querySelector(".toggler");
let btn_2 = document.querySelector(".btn_2");
let list_pass = [];
let tv_pass = [];

let check_1 = true;
let check_2 = false;

//Fetching home page 
fetch(apiURL)
    .then(res => res.json())
    .then(data => {
        let arr = data.results;

        for (let movie_find of arr) {

            const { title, id, poster_path, vote_average, overview } = (movie_find);

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
                <button class="addto" type="button">+</button>
                <br><br>
                <div class="disid">${id}</div>`
            main.appendChild(movieContainer);

        }

    }
    );

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
    } else {
        if (UserInfo) {
            let nami = UserInfo.name.toUpperCase();
            alert(`Hello ${UserInfo.name}`);
            heading.innerHTML = `Good ${stat} ,&nbsp <b><u>${nami}</u></b> . What would you like to watch today?`;
        }
    }
}

//Event listerners
window.addEventListener('load', checkCred);
signout.addEventListener('click', signOutWork);

// Checking if the movie exists in watchlist , if doesn't add it
function addNumber(newNumber) {

    if (list_pass.includes(newNumber)) {
        // If the number already exists in the array , return false
        return 0;
    } else {
        // If the number is not in the array , add the number
        list_pass.push(newNumber);
        return 1;
    }
}


// Checking if the movie exists in watchlist , if doesn't add it
function addtv(newNumber) {

    if (tv_pass.includes(newNumber)) {
        // If the number already exists in the array , return false
        return 0;
    } else {
        // If the number is not in the array , add the number
        tv_pass.push(newNumber);
        return 1;
    }
}

