import { startPageHome } from "./js/start-page.js";
import {
  searchByName,
  alphabeticOrder,
  orderOfWeakness,
  percentagePerFilter,
  filterBy,
} from "./js/data.js";
import { createCards } from "./js/cards.js";
import data from "./data/pokemon/pokemon.js";

const nameTyped = document.getElementById("name-pokemon");
const selectTypeOrWeakness = document.getElementById("filter-type-weakness");
const selectAtributte = document.getElementById("filter-atributtes");
const selectOrder = document.getElementById("order-selector");
const selectOrderByWeakness = document.getElementById("calculation-selector");
const cleanButton = document.getElementById("clean-button");
const percentage = document.getElementById("quantify-text");
const resultCards = document.getElementById("result-cards");

startSiteOnpokemon();

function startSiteOnpokemon() {
  let url = Array.from(location.href).join();
  url = url.replace(/\W/g, "");
  url = url.includes("filters");
  if (url === true) {
    startPageFilters();
  } else {
    let containerMain = document.getElementById("main-home");
    containerMain.style.height = "";
    startPageHome();
  }
}

function startPageFilters() {
  createCards(data.pokemon);
  selectAtributte.disabled = true;
  nameTyped.addEventListener("keyup", searchNamePokemon);
  nameTyped.addEventListener("change", function () {
    nameTyped.value = "";
  });
  selectOrder.addEventListener("change", orderToShow);
  selectTypeOrWeakness.addEventListener("change", function () {
    selectTypeOrWeakness.classList.replace("color-select", "new-color-select");
    selectAtributte.disabled = false;
    activeFilters();
  });
  selectAtributte.addEventListener("change", function () {
    selectAtributte.classList.replace("color-select", "new-color-select");
    activeFilters();
  });
  selectOrderByWeakness.addEventListener("change", function () {
    selectOrderByWeakness.classList.replace("color-select", "new-color-select");
    showInOrderOfWeakness();
  });
  typeWriter(percentage);
  cleanButton.addEventListener("click", cleanForm);
}

function searchNamePokemon() {
  let name = nameTyped.value;
  let resultName = "";
  resultName = name.replace(/[^a-z^A-Z^à-ú^À-Ú]/g, "");
  resultName = searchByName(data.pokemon, resultName);
  createCards(resultName);
  resultName = resultName.length;
  percentagePokemon(resultName, data.pokemon);
}

function activeFilters() {
  let selectedValueTypeOrWeakness = selectTypeOrWeakness.value;
  let selectedValueAttribute = selectAtributte.value;
  let resultOfFilters = filterBy(
    data.pokemon,
    selectedValueTypeOrWeakness,
    selectedValueAttribute
  );
  createCards(resultOfFilters);
  resultOfFilters = resultOfFilters.length;
  percentagePokemon(resultOfFilters, data.pokemon);
}

function orderToShow() {
  const selectedOrder = selectOrder.value;
  createCards(alphabeticOrder(data.pokemon, selectedOrder));
  activeFilters(alphabeticOrder(data.pokemon, selectedOrder));
}

function showInOrderOfWeakness() {
  const selectedOrderByWeakness = selectOrderByWeakness.value;
  createCards(orderOfWeakness(data.pokemon, selectedOrderByWeakness));
  activeFilters(orderOfWeakness(data.pokemon, selectedOrderByWeakness));
}

function percentagePokemon(resultOfFilters, pokemon) {
  pokemon = pokemon.length;
  let resultPercentage = percentagePerFilter(resultOfFilters, pokemon);
  percentage.innerHTML = `Esse filtro representa ${resultPercentage}% do total de Pokémons.`;
  if (resultPercentage == 0.0) {
    resultCards.innerHTML = `
    <p id="not-pokemon">Pokémons não encontrados!<br>Tente outro resultado!</p>
    `;
  }
}

function typeWriter(letter) {
  let textArray = letter.innerHTML.split("");
  letter.innerHTML = "";
  textArray.forEach((arr, i) => {
    setTimeout(() => (letter.innerText += arr), 75 * i);
  });
}

function cleanForm() {
  selectTypeOrWeakness.classList.replace("new-color-select", "color-select");
  selectAtributte.classList.replace("new-color-select", "color-select");
  selectOrderByWeakness.classList.replace("new-color-select", "color-select");
  selectAtributte.disabled = true;
  percentage.innerHTML = `Esse filtro representa 100% do total de Pokémons.`;
  selectOrder.selectedIndex = 0;
  const selectedOrder = selectOrder.value;
  createCards(alphabeticOrder(data.pokemon, selectedOrder));
}
