/* eslint-disable no-return-assign */
/* eslint-disable no-use-before-define */
// select the button
// var SingerButton = document.querySelector('SingerButton')
// const SingerButton = document.getElementById('Singer');
const SongButton = document.getElementById('Song');
// const SongButton = document.querySelector('SongButton');
const suggestBox = document.querySelector('.autocom-box');
// var searchBar = document.querySelector('searchBar')
const searchBar = document.getElementById('search');
const searchText = document.getElementById('searchText');
SongButton.addEventListener('click', () => {
  // searchBar.style.display = 'block'
  searchBar.style.visibility = 'visible';
});
//* ************************************************ */
const allTabsBody = document.querySelectorAll('.tab-body-single');
const allTabsHead = document.querySelectorAll('.tab-head-single');
const searchForm = document.querySelector('.searchBar');
const searchList = document.getElementById('search-list');
const searchBtn = document.getElementById('search-btn');
const searchWrapper = document.querySelector('.search-input');

let activeTab = 1;
let allData;

const init = () => {
  showActiveTabBody();
  showActiveTabHead();
};

const showActiveTabHead = () => allTabsHead[activeTab - 1].classList.add('active-tab');

const showActiveTabBody = () => {
  hideAllTabBody();
  allTabsBody[activeTab - 1].classList.add('show-tab');
};

const hideAllTabBody = () => allTabsBody.forEach((singleTabBody) => singleTabBody.classList.remove('show-tab'));
const hideAllTabHead = () => allTabsHead.forEach((singleTabHead) => singleTabHead.classList.remove('active-tab'));

window.addEventListener('DOMContentLoaded', () => init());
// button event listeners
allTabsHead.forEach((singleTabHead) => {
  singleTabHead.addEventListener('click', () => {
    hideAllTabHead();
    activeTab = singleTabHead.dataset.id;
    showActiveTabHead();
    showActiveTabBody();
  });
});
//* ****************************from muhammed */********** */
/* function showSuggestions(list) {
  let listData;
  if (!list.length) {
    const userValue = searchText.value;
    listData = `<li>${userValue}</li>`;
  } else {
    listData = list.join('');
  }
  suggestBox.innerHTML = listData;
} */
/* searchText.onkeyup = (e) => {
  const inputText = e.target.value; // entered value
  let emptyArray = [];
  if (inputText) {
    emptyArray = Songs.filter((data) =>
    // filtering array value and user characters to lowercase and return only-
    // those words which are start with user enetered chars
      // eslint-disable-next-line implicit-arrow-linebreak
      data.song.toLocaleLowerCase().startsWith(inputText.toLocaleLowerCase()));
    emptyArray = emptyArray.map((data) => data.song = `<li>${data.song}</li>`);
    searchWrapper.classList.add('active'); // show autocomplete box
    showSuggestions(emptyArray);
    const allList = suggestBox.querySelectorAll('li');
    for (let i = 0; i < allList.length; i++) {
      // adding onclick attribute in all li tag
      allList[i].setAttribute('onclick', 'select(this),GetLyricsAsync(this)');
    }
  } else {
    searchWrapper.classList.remove('active'); // hide autocomplete box
  }
}; */
//* **************************************************** */

/* const getInputValue = (event) => {
  event.preventDefault();
  const searchText = document.getElementById('searchText').value;
  // document.getElementById('name').innerHTML = document.getElementById('searchText').value;
  // linkOfYoutube(searchText);
  // fetchSingerWiki(searchText);
  // fetchLyrics(searchText);
  // showNameOfSinger(searchText);
  return searchText;
}; */

// search form submission

/* const doSearchForSinger = () => {
  // const searchText = getInputValue();
  // showNameOfSinger(searchText);
  const text = document.getElementById('searchText').value;
  showNameOfSinger(text);
}; */
function findIdBySongName(songName) {
  // eslint-disable-next-line max-len
  const song = Songs.find((element) => element.song.toLocaleLowerCase() === songName.toLocaleLowerCase());
  return song.id;
}
const showNameOfSinger = (searchInput) => {
  document.getElementById('name').innerHTML = searchInput.tracks[0].album.artists[0].name;
};
const showPhotoOfSinger = (searchInput) => {
  document.getElementById('imageOfArtist').src = searchInput.tracks[0].album.images[0].url;
};
const showSong = (searchInput) => {
  const uri = searchInput.tracks[0].uri.split(':')[2];
  console.log(`https://open.spotify.com/track/${uri}`);
  document.getElementById('audio').src = searchInput.tracks[0].preview_url;
  // document.getElementById('audio').src = `https://open.spotify.com/track/${uri}`;
  // document.getElementById('audio').src = 'https://www.shazam.com/track/40333609/river-flows-in-you';
};
const showLyricsOfSongs = (searchInput) => {
  // console.log(typeof (searchInput));
  let lyricsText = '';
  for (let i = 0; i < searchInput.lyrics.lines.length; i++) {
    lyricsText += `${searchInput.lyrics.lines[i].words}\n`;
    /* const divElem = document.createElement('span');
    divElem.innerHTML = searchInput.lyrics.lines[i].words;
    document.getElementById('lyrics').appendChild(divElem); */
  }
  document.getElementById('lyrics').innerHTML = `<p>${lyricsText}</p>`;
};
async function fechSong(songID) {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '404cb97ca6msh0efa166abb29578p1c01dajsn24f3d99b70ca',
      'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
    },
  };

  fetch(`https://spotify23.p.rapidapi.com/tracks/?ids=${songID}`, options)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      const ResponsedString = JSON.stringify(response);
      console.log(ResponsedString);
      const responseJson = JSON.parse(ResponsedString);
      showNameOfSinger(responseJson);
      showPhotoOfSinger(responseJson);
      showSong(responseJson);
    })
    .catch((err) => console.error(err));
}
async function fechLyrics(songID) {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '404cb97ca6msh0efa166abb29578p1c01dajsn24f3d99b70ca',
      'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
    },
  };

  fetch(`https://spotify23.p.rapidapi.com/track_lyrics/?id=${songID}`, options)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      const ResponsedString = JSON.stringify(response);
      console.log(ResponsedString);
      const responseJson = JSON.parse(ResponsedString);
      showLyricsOfSongs(responseJson);
    })
    .catch((err) => console.error(err));
}
searchBtn.addEventListener('click', () => {
  // const searchText = getInputValue();
  // showNameOfSinger(searchText);
  const text = document.getElementById('searchText').value;
  const IDSong = findIdBySongName(text);
  fechSong(IDSong);
  fechLyrics(IDSong);
});
//= ======================auto complete====================
const showSearchList = (data) => {
  searchList.innerHTML = '';
  data.forEach((dataItem) => {
    const divElem = document.createElement('div');
    divElem.classList.add('search-list-item');
    divElem.innerHTML = `
            <p data-id = "${dataItem.id}" style="font-family:courier;">${dataItem.song}</p>
        `;
    searchList.appendChild(divElem);
  });
};
function songFilter(inputText) {
  let arr = [];
  // eslint-disable-next-line max-len
  arr = Songs.filter((data) => data.song.toLocaleLowerCase().startsWith(inputText.toLocaleLowerCase()));
  console.log(arr);
  return arr;
}
searchText.addEventListener('keyup', () => {
  if (searchText.value.length > 1) {
    const data = songFilter(searchText.value);
    showSearchList(data);
  } else {
    searchList.innerHTML = '';
  }
});

searchList.addEventListener('click', (event) => {
  const searchId = event.target.dataset.id;
  searchText.value = Songs.find((element) => element.id === searchId).song;
  fechSong(searchId);
  fechLyrics(searchId);
  searchList.innerHTML = '';
});
// const linkOfYoutube = async (searchText) => {};

/* const fetchLyrics = async (searchText) => {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '404cb97ca6msh0efa166abb29578p1c01dajsn24f3d99b70ca',
      'X-RapidAPI-Host': 'sridurgayadav-chart-lyrics-v1.p.rapidapi.com',
    },
  };
  const resp = fetch('https://sridurgayadav-chart-lyrics-v1.p.rapidapi.com/apiv1.asmx/SearchLyricDirect?artist=michael%20jackson&song=bad}', options)
    .then((response) => parseXmlToJson(response.text))
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
  // showLyrics(resp);
}; */

/*
const showLyrics = (response) => {
  document.getElementById('lyrics').innerHTML = `
    <p>${response}</p>
`;
};
*/

/*
const showSearchList = (data) => {
  searchList.innerHTML = '';
  data.forEach((dataItem) => {
    const divElem = document.createElement('div');
    divElem.classList.add('search-list-item');
    divElem.innerHTML = `
            <img src = "${dataItem.image.url ? dataItem.image.url : ''}" alt = "">
            <p data-id = "${dataItem.id}">${dataItem.name}</p>
        `;
    searchList.appendChild(divElem);
  });
};

searchForm.search.addEventListener('keyup', () => {
  if (searchForm.search.value.length > 1) {
    fetchAllSuperHero(searchForm.search.value);
  } else {
    searchList.innerHTML = '';
  }
});

searchList.addEventListener('click', (event) => {
  const searchId = event.target.dataset.id;
  const singleData = allData.results.filter((singleData) => searchId === singleData.id);
  showSuperheroDetails(singleData);
  searchList.innerHTML = '';
});

const showSuperheroDetails = (data) => {};
*/
