const container = document.querySelector('.container');
const start = document.querySelector('.start');
const slider = document.querySelector('.slider');
const randomButton = document.querySelector('.randomColor');
const eraserButton = document.querySelector('.eraser'); 
const rainbowButton = document.querySelector('.rainbow');
const clearButton = document.querySelector('.clear');
const canvas = document.querySelectorAll('.grids');
const penColor = document.getElementById('pen');
const sliderValue = document.querySelector('.sliderValue');

function grids(columns, rows) {
    container.style.setProperty('--grid-cols', columns);
    container.style.setProperty('--grid-rows', rows);

    for(i=0; i<(columns*rows); i++){
        let div = document.createElement("div");
        div.classList.add('grids');
        div.classList.add('gridBorder')
        container.appendChild(div);
    }
}

document.addEventListener('DOMContentLoaded', grids(16,16));

let clearValue = 0; 
slider.oninput = function() {
clearValue = this.value
sliderValue.innerText = `${this.value}x${this.value}`;
while(container.lastElementChild){
    container.removeChild(container.lastElementChild)
 }
grids(this.value, this.value);
}

let etchColor = "black";
const gridToggle = document.querySelector('.gridToggle');
let gridState = false;

gridToggle.addEventListener("click", ()=> {
    if(gridState==false){
        gridState = true;
        const list = document.querySelectorAll('.grids');
        for(i=0; i<list.length; i++){
            list[i].classList.toggle('gridBorder');
        }
    } else {
        gridState = false;
        const list = document.querySelectorAll('.grids');
        for(i=0; i<list.length; i++){
            list[i].classList.toggle('gridBorder');
        }
    }
})

container.addEventListener("mousedown", (event)=> {
    if(rainbow==true && eraser==false && random == false && pen == false){
        event.target.style.backgroundColor = `rgb(${randomColor()})`;
    }
    else if(eraser==true && rainbow == false && random == false && pen == false){
        event.target.style.backgroundColor = "white";
    } 
    else if(random == true && eraser == false && rainbow == false && pen == false){
        event.target.style.backgroundColor = etchColor;
    } else if(pen == true && eraser == false && rainbow == false && random == false) {
        event.target.style.backgroundColor = etchColor;
    } else {
        return;
    }
})

container.addEventListener("mouseover", (event)=> {
    if(event.buttons != 1) return; 
        if(rainbow==true && eraser==false && random == false && pen == false){
            event.target.style.backgroundColor = `rgb(${randomColor()})`;
        }
        else if(eraser==true && rainbow == false && random == false && pen == false){
            event.target.style.backgroundColor = "white";
        } 
        else if(random == true && eraser == false && rainbow == false && pen == false){
            event.target.style.backgroundColor = etchColor;
        } 
        else if(pen == true && eraser == false && rainbow == false && random == false) {
            event.target.style.backgroundColor = etchColor;
        } 
        else {
            return;
        }
});

container.addEventListener("mousedown", event=> event.preventDefault());

function randomColor(){
    let randomR = Math.floor(Math.random()*255)+1;
    let randomG = Math.floor(Math.random()*255)+1;
    let randomB = Math.floor(Math.random()*255)+1;
    let result = [randomR, randomG, randomB];
    return result;
}

let random = false;
let eraser = false;
let rainbow = false;
let pen = true;

randomButton.addEventListener("click", ()=> {
    random = true;   
    eraser = false 
    rainbow = false;
    pen = false;
    etchColor = `rgb(${randomColor()})`;
});

eraserButton.addEventListener("click", ()=> {
    eraser = true;
    random = false;
    rainbow = false;
    pen = false; 
})

rainbowButton.addEventListener("click", ()=> {
    rainbow = true;
    eraser = false;
    random = false;
    pen = false;
})



penColor.addEventListener("input", (e)=>{
    etchColor = e.target.value;
    pen = true;
    rainbow = false;
    eraser = false;
    random = false;
})

eraserButton.addEventListener("click", ()=> {
    etchColor = "white";
});

clearButton.addEventListener("click", ()=> {
    while(container.lastElementChild){
        container.removeChild(container.lastElementChild)
     }
    grids(clearValue, clearValue);
}
)

