class Particle {
  constructor({ context, x, y }) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.radius = 3;
    this.anchorX = this.x;
    this.anchorY = this.y;
    this.power = (Math.random() * 10) + 10;
    this.color = 'white';
    this.anchorDx = Math.random() - 0.5;
    this.anchorDy = Math.random() - 0.5;
  }

  draw() {
    this.context.fillStyle = this.color;
    this.context.beginPath();
    this.context.rect(this.x, this.y, 2.5, 2.5)
    this.context.lineWidth = 0;
    this.context.closePath();
    this.context.fill();
  }

  update(mouse, width, height) {
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const returnSmooth = 15; // return back speed

    const maxDistance = mouse.radius;
    const force = (maxDistance - distance) / maxDistance;

    const returnXBack = () => {
      const dx = this.x - this.anchorX;
      this.x -= dx / returnSmooth;
    }
    const returnYBack = () => {
      const dy = this.y - this.anchorY;
      this.y -= dy / returnSmooth;
    }

    // move
    this.anchorX += this.anchorDx;
    this.anchorY += this.anchorDy;
    if (this.anchorX > width - 50 || this.anchorX <= 50) this.anchorDx = -this.anchorDx;
    if (this.anchorY > height - 50 || this.anchorY <= 50) this.anchorDy = -this.anchorDy;

    if (distance < mouse.radius) {
      // push
      this.x -= (dx / distance) * force * this.power;
      this.y -= (dy / distance) * force * this.power;

      // particle color inside mouse radius
      // this.color = 'rgba(255, 0, 0 1)';
    } else {
      // return to the anchor point
      if (this.x !== this.anchorX) returnXBack();
      if (this.y !== this.anchorY) returnYBack();
      
      // restore previous color
      // this.color = 'white';

    }
    
    this.draw();
  }
}

export default Particle;