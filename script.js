import { data } from "./getData.js";

const container = document.querySelector(".container");

const searchBtn = document.getElementsByTagName("button");

const drinksData = data();

function showDrinksOnUI(arr) {
  for (let el of arr) {
    const div = document.createElement("div");

    // img
    const img = document.createElement("img");

    // drink name
    const drinkName = document.createElement("h3");
    drinkName.innerHTML = el.strDrink;
    img.src = el.strDrinkThumb;
    container.appendChild(div);
    div.appendChild(drinkName);
    div.appendChild(img);
  }
}

const input = document.querySelector("input");

function searchFilter(drink) {
  const filteredDrinks = [];
  for (let el of drinksData) {
    let nameOfDrinks = el.strDrink.toLowerCase();
    if (nameOfDrinks.includes(drink.toLowerCase())) {
      filteredDrinks.push(el);
    }
  }
  return filteredDrinks;
}

function clear() {
  while( container.firstChild) {
    container.removeChild(container.firstChild)
  }
}

function clickEvent() {
  if (input.value === "") {
    clear();
    showDrinksOnUI(drinksData);
  } else {
    const inputValue = input.value;
    let drink = searchFilter(inputValue);
    console.log(drink);
    clear();
    showDrinksOnUI(drink);
  }
}

showDrinksOnUI(drinksData);


input.addEventListener("keyup", clickEvent);
