var shopList = [];
let elementInput = document.getElementById("item-list");
let elementDate = document.getElementById("date-input");
let buttonAdd = document.getElementById("button-add");

const localInit = ()=> {
  if (localStorage.getItem("shopList")) {
    shopList = JSON.parse(localStorage.shopList);
    drawScreen();
  }
}
const drawScreen = () => {
  document.getElementById("item-list").value = "";
  document.getElementById("date-input").value = "";
  const containerList = document.getElementById("container-list");
  containerList.innerHTML = "";
  shopList.forEach(item => {
    const [name, id] = [item.name, item.id];
    containerList.innerHTML += `
      <div class="flex items-center justify-between mr-4 mb-2">
      <input class="input-item" type="checkbox" id="${id}" value="${name}">
        <label class="select-none flex-grow font-bold pl-2" for="${id}">${name}</label>
        <span class="font-bold">${item.date}</span>
        <button class="delete-button px-2" onclick="deleteItem(event)">X</button>
      </div>
    `;
  });
}
const deleteItem = (event) => {
  let index = shopList.findIndex(item => item.name === event.target.parentElement.querySelector("label").textContent);
  shopList.splice(index, 1);
  localStorage.setItem("shopList", JSON.stringify(shopList));
  drawScreen();
}
// Add Items
buttonAdd.addEventListener("click",()=> {
  let newItem = elementInput.value;
  let newDate = elementDate.value;
  if (newItem != "" && !shopList.some(item => item.name === newItem)) {
    shopList.push({ name: newItem, date: newDate, id: newItem.replace(" ", "-") });
    localStorage.setItem("shopList", JSON.stringify(shopList));
    drawScreen();
  }
});

localInit();