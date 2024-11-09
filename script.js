// DOM selection
const sketch = document.querySelector('.sketch')
const pencil = document.querySelector('#pencil')
const eraser = document.querySelector('#eraser')
const eraseAll = document.querySelector('#eraseAll')

let mouseDown = false
let currColor = "black";

// Disable dragging as it caused some glitches.
document.addEventListener('dragstart', (e) => e.preventDefault());
document.addEventListener('drop', (e) => e.preventDefault());

// Coloring toggle
document.addEventListener('mousedown', () => {
    mouseDown = true
})

document.addEventListener('mouseup', (e) => {
    mouseDown = false
})

for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 16; j++) {
        const pixel = document.createElement('div')
        pixel.style.cssText = "width: 6.25%; height: 6.25%; background-color: white; border: 1px solid #4A5D6D;"
        sketch.appendChild(pixel)
        
        pixel.addEventListener('mouseover', () => {
            if (mouseDown) pixel.style.backgroundColor = currColor
        }) 
        pixel.addEventListener('mousedown', () => {
            pixel.style.backgroundColor = currColor
        }) 
        
    }
}

eraseAll.addEventListener('click', () => {
    const pixels = sketch.querySelectorAll('div')
    pixels.forEach(element => {
        element.style.backgroundColor = "white"
    })
})

pencil.addEventListener('click', () => {
    currColor = "black"
    pencil.classList.add("toggled");
    eraser.classList.remove("toggled");
})

eraser.addEventListener('click', () => {
    currColor = "white" 
    eraser.classList.add("toggled");
    pencil.classList.remove("toggled");
})