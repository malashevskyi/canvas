class Particle {
  constructor({ context, x, y }) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.anchorX = this.x;
    this.anchorY = this.y;
    this.density = Math.random() * 10 + 15;
    this.color = 'white';
    this.side = 0;
  }

  draw() {
    this.context.fillStyle = this.color;
    this.context.beginPath();
    this.context.rect(this.x, this.y, this.side, this.side);
    this.context.lineWidth = 0;
    this.context.closePath();
    this.context.fill();
  }

  update(mouse) {
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const forceDirectionX = dx / distance;
    const forceDirectionY = dy / distance;
    const maxDistance = mouse.radius;
    const force = (maxDistance - distance) / maxDistance;
    const directionX = forceDirectionX * force * this.density;
    const directionY = forceDirectionY * force * this.density;

    if (distance < mouse.radius) {
      this.x -= directionX;
      this.y -= directionY;
    } else {
      if (this.x !== this.anchorX) {
        this.x -= (this.x - this.anchorX) / 10;
      }
      if (this.y !== this.anchorY) {
        this.y -= (this.y - this.anchorY) / 10;
      }
    }
  }
}

export default Particle;
