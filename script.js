var apiUrl = 'https://api.lyrics.ovh';
var loading = `<div class="spinner-border text-light" role="status">
                     <span class="sr-only">Loading...</span>
              </div>`

// search button
document.getElementById("inputForm").addEventListener('submit', start);
function start(e) {
    resetField();
    document.getElementById("search-result").innerHTML = loading;
    var searchInput = document.getElementById("text-search").value;
    console.log(searchInput)
    var fetchUrl = `https://api.lyrics.ovh/suggest/${searchInput}`;

    fetch(fetchUrl)
        .then(response => response.json())
        .then(data => {
            if (data) {
                displaySuggestion(data);
                document.getElementById("search-result").innerText = "Result found"
            } else {
                document.getElementById("search-result").innerText = "Sorry no item in the list"
            }
        })
    e.preventDefault();
}

// display suggestions 
function displaySuggestion(allData) {
    let data = allData.data;
    console.log(data);

    // only 10 suggestion will come
    let list = [];
    for (let i = 0; i < 10; i++) {
        const item = {
            title: data[i].title,
            albumTitle: data[i].album.title,
            artistName: data[i].artist.name,
        }

        list.push(item);
    }
    console.log(list);

    //  html for display suggestions
    let display = document.getElementById("display-result");
    display.innerHTML = "";
    document.querySelector('.single-result').style.display = "block";
    for (let i = 0; i < list.length; i++) {
        const { title, albumTitle,artistName } = list[i];
        display.innerHTML +=
            `<div class="col-md-6 col-sm-6 result">
                <h3 class="lyrics-name"><span id="title">${title}</span></h3>
                <p class="author lead">Artist : <span id="artistName">${artistName}</span></p>
                <p class="author lead">Album : <span id="albumTitle">${albumTitle}</span></p>
            </div>
            <div class ="col-md-6 col-sm-6 text-md-right text-right">
                <a href="#" onclick="getLyrics('${title}','${artistName}')" class="btn btn-success">Get Lyrics</a>
            </div>
            <div class="bottom-line"></div>`
    }
}

// get the lyrics from clicked suggestions

const getLyrics = (title, artistName) => {
    console.log(title, artistName);
    var fetchUrl = `https://api.lyrics.ovh/v1/${artistName}/${title}`;

    fetch(fetchUrl)
        .then(response => response.json())
        .then(data => displayLyrics(data, title, artistName))
}

// display lyrics from getLyrics

const displayLyrics = (data, title, artistName) => {
    document.getElementById("get-title").innerText = title;
    document.getElementById("get-artist").innerText = " - " + artistName;

    if (data.lyrics) {
        document.getElementById("get-lyrics").innerText = data.lyrics;
    } else {
        document.getElementById("get-lyrics").innerText = "Sorry! Lyrics is not found.";
    }
}

// reset id fields
const resetField = () => {
    document.getElementById("search-result").innerText = "";
    document.getElementById("display-result").innerText = "";
    document.getElementById("get-title").innerText = "";
    document.getElementById("get-artist").innerText = "";
    document.getElementById("get-lyrics").innerText = "";
}