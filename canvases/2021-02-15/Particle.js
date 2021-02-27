class Particle {
  constructor({ context, x, y }) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.radius = 3;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = (Math.random() * 10) + 15;
    this.color = 'rgba(255, 255, 255, 0.1)';
  }

  draw() {
    this.context.fillStyle = this.color;
    this.context.beginPath();
    this.context.rect(this.x, this.y, 2.5, 2.5)
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
      this.color = 'rgba(255, 0, 255, 1)';
      this.x -= directionX;
      this.y -= directionY;
    } else {
      this.color = 'rgba(255, 255, 255, 0.1)';
      if (this.x !== this.baseX) {
        let dx = this.x - this.baseX;
        this.x -= dx / 10;
      }
      if (this.y !== this.baseY) {
        let dy = this.y - this.baseY;
        this.y -= dy / 10;
      }
    }

    this.draw();
  }
}

export default Particle;