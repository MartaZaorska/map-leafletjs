//Inicjalizacja mapy
const map = L.map('map');

//Ustalenie widoku początkowego
map.setView([52.2296920181494, 21.012146472930908], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
    minZoom: 2
}).addTo(map);