window.onload=lecturaJSONP;

function lecturaJSONP() {
    fetch('provincias.json')
        .then(response => response.json())
        .then(data => completarSelect(data));
}

function lecturaJSONL(seleccion) {
    fetch('localidades.json')
        .then(response => response.json())
        .then(data => data.filter(localidad => localidad.provincia.nombre === seleccion))
        .then(data => completarSelectLocalidades(data));
}

function completarSelect(provincias) {
    provincias.sort(function (a, b) {
        var textA = a.nombre;
        var textB = b.nombre;
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    const selectProvincia = document.getElementById('provincia');
    for (let i = 0; i < provincias.length; i++) {
        const option = document.createElement('option');
        option.value = provincias[i].id;
        option.text = provincias[i].nombre;
        selectProvincia.appendChild(option);
    }    
}

function removerHijos(){
    const padre = document.getElementById('localidad');
    const hijos = padre.childNodes;
    
    while(hijos.length > 2) {
        padre.removeChild(hijos[2]);
    }
}

const selectProvincia = document.getElementById('provincia');    
selectProvincia.addEventListener("change", function() {
    removerHijos();
    
    const seleccion = selectProvincia.options[selectProvincia.selectedIndex].text;    
    lecturaJSONL(seleccion); 
    
});

function completarSelectLocalidades(localidades) {
    localidades.sort(function (a, b) {
        var textA = a.nombre;
        var textB = b.nombre;
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    const localidad = document.getElementById('localidad');
    for(let i = 0; i < localidades.length; i++) {
        const option = document.createElement('option');
        option.value = localidades[i].id;
        option.text = localidades[i].nombre;
        localidad.appendChild(option);
    }
}