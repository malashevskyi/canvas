class Particle {
  constructor({ context, x, y }) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.radius = 0;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = (Math.random() * 40) + 5;
    this.color = `hsl(${this.radius * 3 + 170}, 50%, 50%)`;
  }
  
  draw() {
    this.context.fillStyle = this.color;
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    this.context.closePath();
    this.context.fill();
  }
  
  update(mouse) {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < mouse.radius) {
      this.radiusTarget = Math.max((mouse.radius - distance) / 4.5, 3);
      this.color = `hsl(${this.radius * 2 + 170}, 50%, 50%)`;
    } else {
      this.radiusTarget = 0;
      this.color = `hsl(${this.radius * 2 + 170}, 50%, 50%)`;
    }

    if (this.radiusTarget - this.radius > 0) {
      this.radius += 0.4;
    }
    if (this.radiusTarget - this.radius < -0.4) {
      this.radius -= 0.4;
    }

    if (distance > mouse.radius + 150) {
      this.radius = 0
    }
    this.draw();
  }
}

export default Particle;