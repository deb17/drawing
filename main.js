let isDrawing = false
let erase = false
let x = 0
let y = 0

const canvas = document.getElementById('my-canvas')

console.log(canvas.clientWidth)
console.log(canvas.clientHeight)
canvas.setAttribute('width', String(canvas.clientWidth))
canvas.setAttribute('height', String(canvas.clientHeight))
console.log(canvas.getAttribute('width'))
console.log(canvas.getAttribute('height'))

const context = canvas.getContext('2d')
context.lineWidth = 1
context.strokeStyle = 'black'
context.fillStyle = 'white'
context.fillRect(0, 0, canvas.width, canvas.height)

canvas.addEventListener('mousedown', (e) => {
  x = e.offsetX
  y = e.offsetY
  isDrawing = true
})

canvas.addEventListener('mousemove', (e) => {
  if (isDrawing) {
    if (erase) {
      eraseLine(context, x, y, e.offsetX, e.offsetY)
    } else {
      drawLine(context, x, y, e.offsetX, e.offsetY)
    }
    x = e.offsetX
    y = e.offsetY
  }
})

window.addEventListener('mouseup', (e) => {
  if (isDrawing) {
    if (erase) {
      eraseLine(context, x, y, e.offsetX, e.offsetY)
    } else {
      drawLine(context, x, y, e.offsetX, e.offsetY)
    }
    x = 0
    y = 0
    isDrawing = false
  }
})

const drawLine = (context, x1, y1, x2, y2) => {
  context.beginPath()
  context.moveTo(x1, y1)
  context.lineTo(x2, y2)
  context.stroke()
  context.closePath()
}

const eraseLine = (context, x1, y1, x2, y2) => {
  context.beginPath()
  context.strokeStyle = 'white'
  context.lineWidth = 5
  context.moveTo(x1, y1)
  context.lineTo(x2, y2)
  context.stroke()
  context.closePath()
}

const clearCanvas = () => {
  context.clearRect(0, 0, canvas.width, canvas.height)
  erase = false
  context.strokeStyle = document.getElementById('color').value
  context.lineWidth = document.getElementById('lnwidth').value
}

const download = () => {
  const imgURL = canvas.toDataURL('image/png')
  const el = document.createElement('a')
  el.href = imgURL
  el.download = 'image.png'
  const cont = document.querySelector('.container')
  cont.appendChild(el)
  el.click()
  cont.removeChild(el)
}

document.getElementById('new').addEventListener('click', clearCanvas)

document.getElementById('draw').addEventListener('click', () => {
  erase = false
  context.strokeStyle = document.getElementById('color').value
  context.lineWidth = document.getElementById('lnwidth').value
})

document.getElementById('erase').addEventListener('click', () => (erase = true))
document.getElementById('save').addEventListener('click', download)

document.getElementById('lnwidth').addEventListener('change', (e) => {
  context.lineWidth = parseInt(e.target.value)
})

document.getElementById('color').addEventListener('change', (e) => {
  context.strokeStyle = e.target.value
})
