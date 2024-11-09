const sketch = document.querySelector('.sketch')
let mouseDown = false

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
            if (mouseDown) pixel.style.backgroundColor = "black"
        }) 
        pixel.addEventListener('mousedown', () => {
            pixel.style.backgroundColor = "black"
        }) 
        
    }
}