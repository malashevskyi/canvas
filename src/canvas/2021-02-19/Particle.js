class Particle {
  constructor({ context, x, y }) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.radius = 3;
    this.anchorX = this.x;
    this.anchorY = this.y;
    this.density = (Math.random() * 10) + 15;
    this.color = 'red';
  }

  draw() {
    this.context.fillStyle = this.color;
    this.context.beginPath();
    this.context.rect(this.x, this.y, 2, 2)
    this.context.lineWidth = 0;
    this.context.closePath();
    this.context.fill();
  }

  update(mouse) {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    let maxDistance = mouse.radius;
    let force = (maxDistance - distance) / maxDistance;
    let directionX = forceDirectionX * force * this.density;
    let directionY = forceDirectionY * force * this.density;

    if (distance < mouse.radius + 5) {
      this.color = 'red';
    } else {
      this.color = 'red';
    }
    if (distance < mouse.radius) {
      this.x -= directionX;
      this.y -= directionY;
    } else {
      if (this.x !== this.anchorX) {
        let dx = this.x - this.anchorX;
        this.x -= dx / 10;
      }
      if (this.y !== this.anchorY) {
        let dy = this.y - this.anchorY;
        this.y -= dy / 10;
      }
    }
  }
}

export default Particle;
