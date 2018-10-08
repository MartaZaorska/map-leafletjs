//DOM Elements
const form = document.getElementById('form-add-marker');
const titleInput = document.querySelector('input[name="title"]');
const infoInput = document.querySelector('input[name="info"]');
const latInput = document.querySelector('input[name="lat"]');
const lngInput = document.querySelector('input[name="lng"]');
const titleMsg = document.getElementById('titleMsg');
const latlngMsg = document.getElementById('latlngMsg');


//Events Listener

//Kliknięcie na mapę - dodanie w danym miejscu znacznika
map.addEventListener('click', e => {
        
    //Szerokość i długość ustalona w miejscu kliknięcia na mapę
    const {lat, lng} = e.latlng;
    latInput.value = lat;
    lngInput.value = lng;
    latInput.disabled = true;
    lngInput.disabled = true;
    
    latlngMsg.textContent = 'Automatycznie dodana szerokość i długość geograficzna';
    latlngMsg.className = 'form-text text-success';
    latlngMsg.style.display = 'block';
    
    //Wyświetlnie przygotowanego formularza (okno modalne)
    $('#formMarker').modal('show');  
});


//Zdarzenie wysłania formularza
form.addEventListener('submit', e => {
    e.preventDefault();
    
    //Pobranie wartości z formularza
    const title = titleInput.value;
    const info = infoInput.value;
    const lat = parseFloat(latInput.value);
    const lng = parseFloat(lngInput.value);
    
    //Tytuł, długość, szerokość - wymagane
    if(title == ''){
        //Wyświetlenie komunikatu o braku tytułu
        latlngMsg.style.display = 'none';
        titleMsg.style.display = 'block';
    }else if(Number.isNaN(lat) || Number.isNaN(lng)){
        //Wyświetlenie komunikatu o nieprawidłowych danych
        titleMsg.style.display = 'none';
        latlngMsg.textContent = 'Nieprawidłowe dane';
        latlngMsg.style.display = 'block';
    }else{
        
        //Utworznie nowego znacznika
        new Marker(title, info, lat, lng);
        
        //Zamknięcie formularza (okna modalnego)
        $('#formMarker').modal('hide');   
    }
});


//Zamknięcie okna modalnego - wyczyszczenie formularza 
$('#formMarker').on('hidden.bs.modal', function (e) {
    const inputs = document.querySelectorAll('input');
    for(let input of inputs){
        input.value = "";
    }
    latInput.disabled = false;
    lngInput.disabled = false;
    latlngMsg.textContent = '';
    latlngMsg.className = 'form-text text-danger';
    latlngMsg.style.display = 'none';
    titleMsg.style.display = 'none';
});

//Table-responsive
if(document.body.clientWidth <= 992){
    document.getElementById('table-markers').className += ' table-responsive';
}


//Startowy znaczniki
new Marker('Plac Trzech Krzyży', 'Plac w Śródmieściu Warszawy', 52.22899544585306, 21.02241396903992);