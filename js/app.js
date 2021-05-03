"use strict";

//variables
const brandOptionElement = document.querySelector("#marca");
const yearOptionElement = document.querySelector("#year");
const minPriceOptionElement = document.querySelector("#minimo");
const maxPriceOptionElement = document.querySelector("#maximo");
const doorOptionElement = document.querySelector("#puertas");
const transOptionElement = document.querySelector("#transmision");
const colourOptionElement = document.querySelector("#color");

//results container
const searchResultElement = document.querySelector("#resultado");

const maxYear = new Date().getFullYear();
const minYear = maxYear - 10;

//create an object with search parametres
const dataSearch = {
  marca: "",
  year: "",
  minimo: "",
  maximo: "",
  puertas: "",
  transmision: "",
  color: "",
};

//events

document.addEventListener("DOMContentLoaded", () => {
  showCars(autos); // show car list at loading web
  fillYearOption(); //complete car year with array
});

//events for select options
brandOptionElement.addEventListener("change", (e) => {
  dataSearch.marca = e.target.value;
  filterCar();
});

yearOptionElement.addEventListener("change", (e) => {
  dataSearch.year = parseInt(e.target.value);
  filterCar();
});
minPriceOptionElement.addEventListener("change", (e) => {
  dataSearch.minimo = e.target.value;
  filterCar();
});
maxPriceOptionElement.addEventListener("change", (e) => {
  dataSearch.maximo = e.target.value;
  filterCar();
});
doorOptionElement.addEventListener("change", (e) => {
  dataSearch.puertas = parseInt(e.target.value);
  filterCar();
});
transOptionElement.addEventListener("change", (e) => {
  dataSearch.transmision = e.target.value;
  filterCar();
});
colourOptionElement.addEventListener("change", (e) => {
  dataSearch.color = e.target.value;
  console.log(dataSearch);
  filterCar();
});

//functions

function showCars(autos) {
  cleanHTML(); //remove html before filter
  autos.forEach((auto) => {
    const { marca, modelo, year, puertas, transmision, precio, color } = auto;
    const carCard = document.createElement("p");
    carCard.textContent = `
        ${marca} ${modelo} - ${year} -${puertas} Puertas - Transmisión: ${transmision} - Precio: ${precio} - Color: ${color}
        
        `;

    searchResultElement.appendChild(carCard);
  });
}

//clean html

function cleanHTML() {
  while (searchResultElement.firstChild) {
    searchResultElement.removeChild(searchResultElement.firstChild);
  }
}

function fillYearOption() {
  for (let i = maxYear; i >= minYear; i--) {
    const yearOption = document.createElement("option");
    yearOption.value = i;
    yearOption.textContent = i;
    yearOptionElement.appendChild(yearOption);
  }
}

//filter based on search
function filterCar() {
  const filterResult = autos
    .filter(brandFilter)
    .filter(yearFilter)
    .filter(minPriceFilter)
    .filter(maxPriceFilter)
    .filter(doorFilter)
    .filter(transFilter)
    .filter(colourFilter);

  showCars(filterResult);

  if (filterResult.length) {
    showCars(filterResult);
  } else {
    notFoundResult();
  }
}

function notFoundResult() {
  cleanHTML();
  const notFoundResultElement = document.createElement("div");
  notFoundResultElement.classList.add("alerta", "error");
  notFoundResultElement.textContent =
    "no hay resultados, cambia los criterios de búsqueda";
  searchResultElement.appendChild(notFoundResultElement);
}

function brandFilter(auto) {
  const { marca } = dataSearch;
  if (marca) {
    return auto.marca === marca;
  }
  return auto;
}

function yearFilter(auto) {
  const { year } = dataSearch;

  if (year) {
    return auto.year === year;
  }
  return auto;
}

function minPriceFilter(auto) {
  const { minimo } = dataSearch;

  if (minimo) {
    return auto.precio >= minimo;
  }
  return auto;
}

function maxPriceFilter(auto) {
  const { maximo } = dataSearch;

  if (maximo) {
    return auto.precio <= maximo;
  }
  return auto;
}

function doorFilter(auto) {
  const { puertas } = dataSearch;

  if (puertas) {
    return auto.puertas === puertas;
  }
  return auto;
}

function transFilter(auto) {
  const { transmision } = dataSearch;

  if (transmision) {
    return auto.transmision === transmision;
  }
  return auto;
}

function colourFilter(auto) {
  const { color } = dataSearch;

  if (color) {
    return auto.color === color;
  }
  return auto;
}
