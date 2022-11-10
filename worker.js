// select the button
var SingerButton = document.querySelector('SingerButton')
var SongButton = document.querySelector('SongButton')
var paragraph = document.querySelector('p')
var searchBar = document.querySelector('searchBar')

button.addEventListener('click', () => {
    paragraph.classList.toggle('hide')
    searchBar.classList.toggle('hide')
})