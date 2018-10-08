//DOM Elements
const markersTable = document.getElementById('markers');


//Klasa reprezentująca pojedyńczy znacznik na mapie 
class Marker {
    constructor(title, info, lat, lng){
        //Utworzenie znacznika
        this.marker = L.marker([lat, lng], {
            draggable: true,
            autoPan: true,
            title: title,
            alt: info
        });
        
        //Zdarzenie zmiany położenia znacznika - aktualizacja długości i szerokości geograficznej znacznika
        this.marker.addEventListener('dragend', e => this.updateElement(e));
        
        //Dodanie znacznika do mapy
        this.marker.addTo(map);
        
        //Element HTML "td" w tabeli
        this.element = document.createElement('tr');
        
        //Dodanie tooltip i popup
        this.marker.bindTooltip(title);
        if(info !== undefined){
            this.marker.bindPopup(`<p><span class='font-weight-bold'>${title}</span><br />${info}</p>`);
        }
        
        //Dodanie znacznika do tabeli
        this.addToView();
        
        //Wyśrodkowanie mapy na utworzony znacznik
        map.flyTo([lat, lng], 16);
    }
    
    
    addToView(){
        const {lat, lng} = this.marker.getLatLng();
        const {title} = this.marker.options;
        
        //Dodanie informacje o znaczniku
        this.element.innerHTML = `
            <td>${title}</td>
            <td class="lat">${lat}</td>
            <td class="lng">${lng}</td>
        `;
        
        const td = document.createElement('td');
        
        //Button pokazujący znacznik na mapie
        const btnShowMarker = document.createElement('button');
        btnShowMarker.className = 'btn btn-secondary m-1';
        btnShowMarker.appendChild(document.createTextNode('Pokaż na mapie'));
        btnShowMarker.addEventListener('click', () => this.showMarker());
        
        //Button usuwający znacznik
        const btnRemove = document.createElement('button');
        btnRemove.className = 'btn btn-danger m-1';
        btnRemove.appendChild(document.createTextNode('Usuń'));
        btnRemove.addEventListener('click', () => this.remove());
        
        td.appendChild(btnShowMarker);
        td.appendChild(btnRemove);
        
        this.element.appendChild(td);
        
        //Wstawienie elementu "td" do tabeli
        markersTable.appendChild(this.element);
    }
    
    remove(){
        //Usunięcie znacznika z mapy i tabeli
        this.marker.remove(map);
        markersTable.removeChild(this.element);
        //Wyśrodkowanie mapy na pozycję startową
        map.flyTo([52.228611, 21.022364], 15);
    }
    
    showMarker(){
        //Wyśrodkowanie mapy na dany znacznik
        const {lat, lng} = this.marker.getLatLng();
        $('#cardMap').collapse('show');
        window.scrollTo(0,0);
        map.flyTo([lat, lng], 16);
    }
    
    updateElement(e){
        //Aktualizacja danych w elemencie "td" - w wyniku zmiany położenia (dragend) znacznika
        const {lat, lng} = e.target._latlng;
        this.element.querySelector('.lat').textContent = lat;
        this.element.querySelector('.lng').textContent = lng;
    }
}