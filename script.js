// DOM selection
const sketch = document.querySelector('.sketch')
const pencil = document.querySelector('#pencil')
const eraser = document.querySelector('#eraser')
const eraseAll = document.querySelector('#eraseAll')
const random = document.querySelector('#random')
const darken = document.querySelector('#darken')
const gridResize = document.querySelector("#gridSize")
const gridSizeLabel = document.querySelector("#gridSizeLabel")

// Initializing variables
const black = 'hsl(0, 0%, 0%)'
const white = 'hsl(0, 0%, 100%)'

let mouseDown = false
let currColor = black
let isRandom = false
let isDarken = false
let canColor = true
let gridSize = 16

// Disabling dragging as it caused some glitches.
document.addEventListener('dragstart', (e) => e.preventDefault());
document.addEventListener('drop', (e) => e.preventDefault());

// Coloring toggle
document.addEventListener('mousedown', () => {
    mouseDown = true
})

document.addEventListener('mouseup', () => {
    mouseDown = false
})

drawGrid()

/* BUTTONS */

// Random color button
random.addEventListener('click', () => {
    usePencil()
    isRandom = !isRandom
    isDarken = false
    random.classList.toggle("toggled")
    darken.classList.remove("toggled");
})

// Darken button
darken.addEventListener('click', () => {
    usePencil()
    isDarken = !isDarken
    isRandom = false
    darken.classList.toggle("toggled")
    random.classList.remove("toggled");
})

// Pencil button
pencil.addEventListener('click', () => {
    usePencil()
})

// Eraser button
eraser.addEventListener('click', () => {
    canColor = false
    currColor = white
    eraser.classList.add("toggled");
    pencil.classList.remove("toggled");
})

// Clear canvas button
eraseAll.addEventListener('click', () => {
    const pixels = sketch.querySelectorAll('div')
    pixels.forEach(element => {
        element.style.backgroundColor = white
    })
})

// Change grid size button
gridResize.addEventListener('click', () => {
    let input;

    while (true) {
      input = prompt("Please enter a grid size between 0 and 100.");
      if (!Number.isInteger(parseInt(input)) || input <= 0 || input > 100) alert("Invalid input. Please try again."); 
      else {
        gridSize = parseInt(input)
        drawGrid()
        break;
      } 
    }
})

/* HELPER FUNCTIONS */

// Draws the grid and handles user drawing.
function drawGrid() {
    sketch.innerHTML = ''
    let size = 100/gridSize
    gridSizeLabel.textContent = `${gridSize} x ${gridSize}`
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const pixel = document.createElement('div')
            pixel.style.cssText = `width: ${size}%; height: ${size}%; background-color: ${white}; border: 1px solid #4A5D6D;`
            sketch.appendChild(pixel)
            
            pixel.addEventListener('mouseover', () => {
                if (mouseDown) {
                    color(pixel)
                }
            })
            pixel.addEventListener('mousedown', () => {
                color(pixel)
            })        
        }
    }
}

// Generated a random HSL value
function getRandomHSL() {
    const h = Math.floor(Math.random() * 360);  
    const s = Math.floor(Math.random() * 101);
    const l = Math.floor(Math.random() * 101);
    
    return `hsl(${h}, ${s}%, ${l}%)`;
}

function RGBToHSL(color) {
    const pattern = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/;
    const match = color.match(pattern);
    let r = match[1]
    let g = match[2]
    let b = match[3]

    r /= 255
    g /= 255
    b /= 255
      
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const delta = max - min

    let l = (max + min) / 2
      
    let h = 0, s = 0
        
    if (delta !== 0) { 
        s = delta / (1 - Math.abs(2 * l - 1))
      
        if (max === r) {
            h = ((g - b) / delta) % 6
        } else if (max === g) {
            h = ((b - r) / delta) + 2
        } else {
            h = ((r - g) / delta) + 4
        }
      
        h *= 60
        if (h < 0) h += 360
    }
      
    s = s * 100
    l = l * 100
    
    return `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`
}
      
function darkenColor(color) {
    let HSL = RGBToHSL(color)

    // Unpacks the HSL string into its components
    const regex = /hsl\((\d+),\s*(\d+)%?,\s*(\d+)%?\)/;
    const match = HSL.match(regex);
    let h = match[1]
    let s = match[2]
    let l = Math.max(match[3] * 0.8, 0) // Darkens by 20%

    return `hsl(${h}, ${s}%, ${l}%)`;
}

// Colors a pixel
function color(pixel) {
    if (canColor){
        if (isRandom) currColor = getRandomHSL()
        if (isDarken) currColor = darkenColor(pixel.style.backgroundColor)
    }
    pixel.style.backgroundColor = currColor
}

// Uses the pencil tool
function usePencil() {
    canColor = true
    currColor = black
    pencil.classList.add("toggled");
    eraser.classList.remove("toggled");
}