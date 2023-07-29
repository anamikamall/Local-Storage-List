const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
let items = JSON.parse(localStorage.getItem('items')) || [];
const clear = document.querySelector(".clear");
const check = document.querySelector(".check");
const uncheck = document.querySelector(".uncheck");

function addItem(e) {
    e.preventDefault();
    // console.log("hello");
    const text = (this.querySelector('[name=item]')).value;
    const item = {
        text,  //OR text : text
        done : false
    };
    // console.log(item);
    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items)); //to save data to local storage
    this.reset(); //to clear the form after submit
}

function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((plate, i) => {
      return `
        <li>
          <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
          <label for="item${i}">${plate.text}</label>
        </li>
      `;
    }).join('');
}

function toggleDone(e) {
    if( !e.target.matches('input')) return; //skip this unless it is input (without this it will click label and input both)
    // console.log(e.target);
    const element = e.target;
    const index = element.dataset.index;
    items[index].done = !items[index].done;
    // console.log(element.dataset.index);
    localStorage.setItem('items',JSON.stringify(items));
    populateList(items, itemsList);
}

function clearAll(e) {
    // alert("clear");
    localStorage.removeItem('items');
    items = [];
    populateList(items, itemsList);
}

function checkAll() {
    items.map((item, i) => {
        item.done = true;
        // console.log(item);
    });
    localStorage.setItem('items',JSON.stringify(items));
    populateList(items, itemsList);
}

function uncheckAll() {
    items.map((item, i) => {
        item.done = false;
        // console.log(item);
    });
    localStorage.setItem('items',JSON.stringify(items));
    populateList(items, itemsList);
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);
clear.addEventListener('click',clearAll);
check.addEventListener('click',checkAll);
uncheck.addEventListener('click',uncheckAll);

populateList(items, itemsList); //to fill on page load