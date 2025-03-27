const { createCanvas } = require('canvas');
const fs = require('fs');

function generateIcon(size) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    // Background
    ctx.fillStyle = '#4CAF50';
    ctx.beginPath();
    ctx.arc(size/2, size/2, size/2, 0, Math.PI * 2);
    ctx.fill();
    
    // Timer circle
    ctx.strokeStyle = 'white';
    ctx.lineWidth = size/8;
    ctx.beginPath();
    ctx.arc(size/2, size/2, size/3, -Math.PI/2, Math.PI * 1.5);
    ctx.stroke();
    
    // Timer hands
    ctx.strokeStyle = 'white';
    ctx.lineWidth = size/16;
    
    // Hour hand
    ctx.beginPath();
    ctx.moveTo(size/2, size/2);
    ctx.lineTo(size/2, size/4);
    ctx.stroke();
    
    // Minute hand
    ctx.beginPath();
    ctx.moveTo(size/2, size/2);
    ctx.lineTo(size/2 + size/4, size/2);
    ctx.stroke();
    
    // Center dot
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(size/2, size/2, size/16, 0, Math.PI * 2);
    ctx.fill();
    
    // Save to file
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(`icons/icon${size}.png`, buffer);
}

// Generate icons
[16, 48, 128].forEach(size => generateIcon(size)); 