import { data } from "./getData.js";

const container = document.querySelector(".container");

const searchBtn = document.getElementsByTagName("button");

const drinksData = data();


const modal = document.querySelector('.modal-container');

const modalContent = document.querySelector('.modal-container .content');

function clearModal() {
  while( modalContent.lastChild) {
    modalContent.removeChild(modalContent.lastChild)
  }
}


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

    div.addEventListener('click', () => {

      const closedBtn  = document.createElement('button');
      closedBtn.innerHTML = '&times';
      closedBtn.classList.add('closedBtn');
      modalContent.appendChild(closedBtn);
  
      closedBtn.addEventListener('click', () => {
        clearModal();
        modal.classList.remove('show-modal');
      })
  
      const infoList = document.createElement('ul');
  
      const drinkName = div.getElementsByTagName('h3')[0].innerText;
  
      const drinkInfo = drinksData.filter(el => el.strDrink === drinkName)
  
  
      const nameDrink = document.createElement('li');
      nameDrink.innerHTML = 'Drink is ' + drinkInfo[0].strDrink;
  
      infoList.appendChild(nameDrink);
  
      const alcoholType = document.createElement('li');
      alcoholType.innerHTML = 'Alcohol is ' + drinkInfo[0].strIngredient1;
      infoList.appendChild(alcoholType);
  
      const instruction = document.createElement('li');
      instruction.innerHTML = 'Instructions: ' + drinkInfo[0].strInstructions;
      infoList.appendChild(instruction);
  
      modalContent.appendChild(infoList);
  
      modal.classList.add('show-modal');
  
    })
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

// MODAL window

// const allDivs = document.querySelectorAll('.drink-card');

// const modal = document.querySelector('.modal-container');

// const modalContent = document.querySelector('.modal-container .content');

// function clearModal() {
//   while( modalContent.lastChild) {
//     modalContent.removeChild(modalContent.lastChild)
//   }
// }

// allDivs.forEach(el => {
//   el.addEventListener('click', () => {

//     const closedBtn  = document.createElement('button');
//     closedBtn.innerHTML = '&times';
//     closedBtn.classList.add('closedBtn');
//     modalContent.appendChild(closedBtn);

//     closedBtn.addEventListener('click', () => {
//       clearModal();
//       modal.classList.remove('show-modal');
//     })

//     const infoList = document.createElement('ul');

//     const drinkName = el.getElementsByTagName('h3')[0].innerText;

//     const drinkInfo = drinksData.filter(el => el.strDrink === drinkName)


//     const nameDrink = document.createElement('li');
//     nameDrink.innerHTML = 'Drink is ' + drinkInfo[0].strDrink;

//     infoList.appendChild(nameDrink);

//     const alcoholType = document.createElement('li');
//     alcoholType.innerHTML = 'Alcohol is ' + drinkInfo[0].strIngredient1;
//     infoList.appendChild(alcoholType);

//     const instruction = document.createElement('li');
//     instruction.innerHTML = 'Instructions: ' + drinkInfo[0].strInstructions;
//     infoList.appendChild(instruction);

//     modalContent.appendChild(infoList);

//     modal.classList.add('show-modal');


//     // console.log(drinkInfo);

//     // const modalContainer = document.querySelector('.modal-container');
    
//     // const modalContent = document.querySelector('.model-container .content');

//     // const.
//   })
// });

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


// Create a class of triggers, then add an event, then create a modal of the specifc card, then add a class of 'show-modal', then add an eventListener, and add an event listener to the close button





// const closedBtn  = document.getElementsByClassName('closedBtn');
// closedBtn[0].addEventListener('click', () => {
//   clearModal();
//   modal.classList.remove('show-modal');
// })

// const drink =drinksData.filter(el => el.strDrink === 'A1');
// console.log(drink[0]);

// console.log(drinksData.filter(el => el.strDrink==='A1')[0])
