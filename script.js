import { data } from "./getData.js";

const container = document.querySelector(".container");

const searchBtn = document.getElementsByTagName("button");

const drinksData = data();

function showDrinksOnUI(arr) {
  for (let el of arr) {
    const div = document.createElement("div");
    div.classList.add('drink-card');

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
    clear();
    showDrinksOnUI(drink);
  }
}

showDrinksOnUI(drinksData);

input.addEventListener("keyup", clickEvent);


// Get all types of drinks
const typesOfDrinks = [];
drinksData.forEach(el => {typesOfDrinks.push(el.strCategory)}); 

//  get unique drinks to populate the select bar

const uniqueDrinks = typesOfDrinks.filter((value, index, array) => {
  return array.indexOf(value) === index;
});

// populate the select bar with different types of drinks

const selectBtn = document.querySelector('#selection');

uniqueDrinks.forEach( (element, index) => {
  let option = document.createElement('option');
  option.value = index+1;
  option.innerHTML = element;
  selectBtn.appendChild(option);
})


// Create new filter function that filters by type

function searchFilterType(drinkType) {
  const filteredDrinks = [];
  for (let el of drinksData) {
    let drinkCategory = el.strCategory;
    if (drinkCategory === drinkType) {
      filteredDrinks.push(el);
    }
  }
  return filteredDrinks;
}

// Create click event function and call that function in the select bar

function clickEventType() {
  const options = selectBtn.options;
  const selectedOption = selectBtn.options['selectedIndex'];
  if ( selectedOption === 0) {
    clear();
    showDrinksOnUI(drinksData);
  } else {
    const selectedType = options[selectedOption].text;
    let similarDrinks = searchFilterType(selectedType);
    clear();
    showDrinksOnUI(similarDrinks);
  }
}

selectBtn.addEventListener('change', clickEventType);


// Alcoholic and non-alcoholic buttons


function searchAlcohol(string) {
  const filteredDrinks = [];
  for (let el of drinksData) {
    let drinkType = el.strAlcoholic;
    if (drinkType === string) {
      filteredDrinks.push(el);
    }
  }
  return filteredDrinks;
}

// function clickAlcohol(string) {
//   const drinksAlcohol = searchAlcohol(string);
//   clear();
//   showDrinksOnUI(drinksAlcohol);
// }

const btnAlcohol = document.querySelector('#alcoholic');
const btnNonAlcohol = document.querySelector('#non-alcoholic');

btnAlcohol.addEventListener('click', () =>  {
  const categoryOfDrink = btnAlcohol.innerHTML;
  console.log(categoryOfDrink);
  let filteredDrinks = searchAlcohol(categoryOfDrink);
  clear();
  showDrinksOnUI(filteredDrinks);
});

btnNonAlcohol.addEventListener('click', () =>  {
  const categoryOfDrink = btnNonAlcohol.innerHTML;
  console.log(categoryOfDrink);
  let filteredDrinks = searchAlcohol(categoryOfDrink);
  clear();
  showDrinksOnUI(filteredDrinks);
});

const clearBtn = document.querySelector('#clearBtn');

clearBtn.addEventListener('click', () => {
  input.value=  '';
  selectBtn.selectedIndex = 0;
  clear();
  showDrinksOnUI(drinksData)
})


// const allDivs = document.querySelectorAll('.drink-card');

// allDivs.forEach(el => {
//   el.addEventListener('click', () => {
//     const container = document.querySelector('.bodyContainer');
//     container.classList.add('modal-container');

//     // creating modal window
//     const modal = document.createElement('div');
//     modal.classList.add('modal');
//     container.appendChild(modal);

//     // creating close button
//     const closeBtn = document.createElement('button');
//     closeBtn.classList.add('closedBtn');
//     closeBtn.innerHTML = 'close';
//     modal.appendChild(closeBtn);

//     closeBtn.addEventListener('click', () => {
//       container.classList.remove('modal-container');
//       modal.classList.remove('modal');

//     })


    

//   })
// })
