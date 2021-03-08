class ParticleScale {
  constructor({ context }) {
    this.context = context;
    this.radius = 0;
  }

  draw() {
    this.context.beginPath();
    this.context.fillStyle = 'white';
    this.context.arc(100, 17, this.radius, 0, Math.PI * 2);
    this.context.fill();
  }
}

export default ParticleScale;
