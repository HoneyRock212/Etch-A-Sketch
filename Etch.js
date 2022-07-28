const container = document.querySelector('.container');
const start = document.querySelector('.start');
const slider = document.querySelector('.slider');
const randomButton = document.querySelector('.randomColor');
const eraserButton = document.querySelector('.eraser'); 
const rainbowButton = document.querySelector('.rainbow');
const clearButton = document.querySelector('.clear');
const canvas = document.querySelectorAll('.grids');
const penColor = document.getElementById('pen');
const shadingButton = document.querySelector('.shading')
const sliderValue = document.querySelector('.sliderValue');
const gridButton = document.querySelector('.grid');
let shadeState = false;
function grids(columns, rows) {
    container.style.setProperty('--grid-cols', columns);
    container.style.setProperty('--grid-rows', rows);

    for(i=0; i<(columns*rows); i++){
        let div = document.createElement("div");
        div.classList.add('grids');
        div.classList.add('gridBorder');
        div.classList.add('colored');
        container.appendChild(div);
    }

    const list = document.querySelectorAll('.colored');
    for(i=0; i<list.length; i++){
        list[i].classList.toggle('colored');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    randomButton.classList.toggle('randomToggle');
    eraserButton.classList.toggle('eraserToggle');
    rainbowButton.classList.toggle('rainbowToggle');
    shadingButton.classList.toggle('shadingToggle');
    gridButton.classList.toggle('gridToggle');
    grids(16,16)
});

let clearValue = 16; 
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
         gridButton.classList.toggle('gridToggle');
    } else {
        gridState = false;
        const list = document.querySelectorAll('.grids');
        for(i=0; i<list.length; i++){
            list[i].classList.toggle('gridBorder');
        }
        gridButton.classList.toggle('gridToggle');
    }
})

function shade(color) {
        let RGB = color.replace(/[^\d,]/g, '').split(',');
        let r = RGB[0]-(RGB[0]*0.10);
        let g = RGB[1]-(RGB[1]*0.10);
        let b = RGB[2]-(RGB[2]*0.10);
        let shadedRGB = `rgb(${r},${g},${b})`;
        return shadedRGB;
}

container.addEventListener("mousedown", (event)=> {
    if(event.target.classList.contains('colored') && shadeState == true){
        let style = event.target.style.getPropertyValue("background-color");
        event.target.style.backgroundColor = shade(style);
    }
    else if(rainbow==true && eraser==false && random == false && pen == false){
       if(event.target.classList.contains('colored')) return;
        event.target.style.backgroundColor = `rgb(${randomColor()})`;
        event.target.classList.toggle('colored');
    }
    else if(eraser==true && rainbow == false && random == false && pen == false){
        event.target.style.backgroundColor = "white";
    } 
    else if(random == true && eraser == false && rainbow == false && pen == false){
        event.target.style.backgroundColor = etchColor;
        event.target.classList.toggle('colored');
    } else if(pen == true && eraser == false && rainbow == false && random == false) {
        event.target.style.backgroundColor = etchColor;
        event.target.classList.toggle('colored');
    } else {
        return;
    }
})

container.addEventListener("mouseover", (event)=> {
    if(event.buttons != 1) return; 
        if(event.target.classList.contains('colored') && shadeState == true){
            let style = event.target.style.getPropertyValue("background-color");
            event.target.style.backgroundColor = shade(style);
        }
        
        else if(rainbow==true && eraser==false && random == false && pen == false){
            if(event.target.classList.contains('colored')) return;
            event.target.style.backgroundColor = `rgb(${randomColor()})`;
            event.target.classList.toggle('colored');
        }
        else if(eraser==true && rainbow == false && random == false && pen == false){
            event.target.style.backgroundColor = "white";
        } 
        else if(random == true && eraser == false && rainbow == false && pen == false){
            event.target.style.backgroundColor = etchColor;
            event.target.classList.toggle('colored');
        } 
        else if(pen == true && eraser == false && rainbow == false && random == false) {
            event.target.style.backgroundColor = etchColor;
            event.target.classList.toggle('colored');
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
    etchColor = "white";
    eraserButton.classList.toggle('eraserToggle');
})

rainbowButton.addEventListener("click", ()=> {
    if(rainbow == true){
        rainbow=false;
        pen = true;
        rainbowButton.classList.toggle('rainbowToggle');
    } else {
    rainbow = true;
    eraser = false;
    random = false;
    pen = false;
    rainbowButton.classList.toggle('rainbowToggle');
    }
})

shadingButton.addEventListener("click", () => {
    if(shadeState == true){
        shadeState = false;
    } else {
        shadeState = true;
    }
    shadingButton.classList.toggle('shadingToggle');
})


penColor.addEventListener("input", (e)=>{
    etchColor = e.target.value;
    pen = true;
    rainbow = false;
    eraser = false;
    random = false;
})


clearButton.addEventListener("click", ()=> {
    while(container.lastElementChild){
        container.removeChild(container.lastElementChild)
     }
    grids(clearValue, clearValue);
}
)

