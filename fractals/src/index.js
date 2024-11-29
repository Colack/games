const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const applicationSettings = {
    width: 800,
    height: 600
}

const keys = [];

window.addEventListener('keydown', function(event) {
    keys[event.keyCode] = true;   
    event.preventDefault();
});

window.addEventListener('keyup', function(event) {
    keys[event.keyCode] = false;
    event.preventDefault();
});

const mandelbrot = (x, y, maxIterations) => {
  let real = x;
  let imaginary = y;
  for (let i = 0; i < maxIterations; i++) {
    let real2 = real * real;
    let imaginary2 = imaginary * imaginary;
    if (real2 + imaginary2 > 4) {
      return i;
    }
    imaginary = 2 * real * imaginary + y;
    real = real2 - imaginary2 + x;
  }
  return maxIterations;
};

const julia = (x, y, maxIterations) => {
    const c = { x: -0.7, y: 0.27015 };
    let real = x;
    let imaginary = y;
    for (let i = 0; i < maxIterations; i++) {
        let real2 = real * real;
        let imaginary2 = imaginary * imaginary;
        if (real2 + imaginary2 > 4) {
        return i;
        }
        imaginary = 2 * real * imaginary + c.y;
        real = real2 - imaginary2 + c.x;
    }
    return maxIterations;
};

const burningShip = (x, y, maxIterations) => {
    let real = x;
    let imaginary = y;
    for (let i = 0; i < maxIterations; i++) {
        let real2 = real * real;
        let imaginary2 = imaginary * imaginary;
        if (real2 + imaginary2 > 4) {
        return i;
        }
        imaginary = Math.abs(2 * real * imaginary) + y;
        real = real2 - imaginary2 + x;
    }
    return maxIterations;
};

const render = (fractal, maxIterations) => {
  const width = canvas.width;
  const height = canvas.height;
  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const i = y * width + x;
      const color = fractal(x / width * 3.5 - 2.5, y / height * 2 - 1, maxIterations);
      data[i * 4] = color % 256;
      data[i * 4 + 1] = color % 256;
      data[i * 4 + 2] = color % 256;
      data[i * 4 + 3] = 255;
    }
  }
  ctx.putImageData(imageData, 0, 0);
};

const controlMenu = () => {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, applicationSettings.width, 100);
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Press 1 for Mandelbrot', 10, 30);
    ctx.fillText('Press 2 for Julia', 10, 60);
    ctx.fillText('Press 3 for Burning Ship', 10, 90);

    if (keys[49]) {
        render(mandelbrot, 100);
    } else if (keys[50]) {
        render(julia, 100);
    } else if (keys[51]) {
        render(burningShip, 100);
    }
}

const loop = () => {
    controlMenu();
    requestAnimationFrame(loop);
}

canvas.width = applicationSettings.width;
canvas.height = applicationSettings.height;
loop();
