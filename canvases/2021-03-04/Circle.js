import gsap from 'gsap';

class Circle {
  constructor({ context, cartridges, x, y }) {
    this.context = context;
    this.cartridges = cartridges;
    this.x = x;
    this.y = y;
    this.radius = 20;
    this.color = '#fff';
    this.shot = false;
  }

  draw() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.context.fillStyle = this.color;
    this.context.closePath();
    this.context.fill();
  }

  update() {
    this.y += 1;

    if (!this.shot) {
      this.cartridges.forEach((cartridge) => {
        const dx = this.x - cartridge.x;
        const dy = this.y - cartridge.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.radius) {
          this.shot = true;

          gsap.to(this, {
            radius: 30,
            duration: 0.3,
            ease: 'bounce.out',
          });
          gsap.to(this, {
            radius: 0,
            duration: 2,
            delay: 0.3,
            ease: 'bounce.in',
          });
          this.color = 'red';
        }
      });
    }
  }
}

export default Circle;
