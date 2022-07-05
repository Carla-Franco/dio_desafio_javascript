let count = 0;
let value = document.querySelector('#value');

const btnsIncrease = document.querySelector('#increase');
const btnsDecrease = document.querySelector('#increase');

function increment() {
    if (count < 10) {
    count++
    value.textContent = count;
    document.getElementById('value').style.color = "black";
    } 
}

function decrement() {
    if (count > -10) {
    count--
    value.textContent = count;
    document.getElementById('value').style.color = "brown";
    }
}





















