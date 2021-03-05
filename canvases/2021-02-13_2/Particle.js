class Particle {
  constructor({ context, x, y }) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.radius = 3;
    this.anchorX = this.x;
    this.anchorY = this.y;
    this.power = Math.random() * 10;
    this.color = 'white';
    this.anchorDx = Math.random() - 0.5;
    this.anchorDy = Math.random() - 0.5;
    this.force = 1;
  }

  draw() {
    this.context.fillStyle = this.color;
    this.context.beginPath();
    this.context.rect(this.x, this.y, 2, 2);
    this.context.lineWidth = 0;
    this.context.closePath();
    this.context.fill();
  }

  update(mouse, width, height) {
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const returnSmooth = 15; // return back speed

    const returnXBack = () => {
      this.x -= (this.x - this.anchorX) / returnSmooth;
    };
    const returnYBack = () => {
      this.y -= (this.y - this.anchorY) / returnSmooth;
    };

    // move
    this.anchorX += this.anchorDx;
    this.anchorY += this.anchorDy;
    if (this.anchorX > width - 50 || this.anchorX <= 50) this.anchorDx = -this.anchorDx;
    if (this.anchorY > height - 50 || this.anchorY <= 50) this.anchorDy = -this.anchorDy;

    if (distance < mouse.radius) {
      this.force += 0.2;
      // pull
      this.x += ((dx / distance) * 5) / this.force;
      this.y += ((dy / distance) * 5) / this.force;
    } else {
      this.force = 1;
      // return to the anchor point
      if (this.x !== this.anchorX) returnXBack();
      if (this.y !== this.anchorY) returnYBack();
    }

    this.draw();
  }
}

export default Particle;
