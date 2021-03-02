import random from 'canvas-sketch-util/random';

const HPi = Math.PI / 2;

class Particle {
  constructor({ context, index, startTick, coordsCount, mouseStart, angle, circlesRadius }) {
    this.context = context;
    this.coordsCount = coordsCount;
    this.x = 0;
    this.y = 0;
    this.mouse = mouseStart;
    this.circlesRadius = circlesRadius;
    this.color = `hsl(${index * 2 + 170}, 50%, 50%)`;
    this.tick = startTick;
    this.mouseX = this.mouse.x;
    this.mouseY = this.mouse.y;
    this.random = 3 + Math.random() * 10;
    this.angleX = angle;
    this.angleY = angle;
    this.radius = 2;
  }

  draw() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.context.fillStyle = this.color;
    this.context.fill();
  }

  update(mouse) {
    // check when particle goes through lowest this.tick (mouse position)
    // % from this.tick will be 0, 1, 2, or 3, as I add 4 every render
    if (
      this.tick % this.coordsCount === 0 ||
      this.tick % this.coordsCount === 1 ||
      this.tick % this.coordsCount === 2 ||
      this.tick % this.coordsCount === 3
    ) {
      // check if mouse position was changed
      if (mouse.x !== this.mouseX || mouse.y !== this.mouseY) {
        // change the angle (positive or negative)
        if (mouse.x - this.mouseX > 0) this.angleX = -this.angleX;
        if (mouse.y - this.mouseY > 0) this.angleY = -this.angleY;

        // find the distance between new and old mouse position
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        // add this.random to randomly change speed of the particle movement
        this.x += (dx / dist) * this.random;
        this.y += (dy / dist) * this.random;

        if (dist < 5) {
          this.x = mouse.x;
          this.y = mouse.y;
          // set current mouse position to compare later
          this.mouseX = mouse.x;
          this.mouseY = mouse.y;

          // set second lowest tick value to exit from if statement
          this.tick = random.rangeFloor(4, 8);
        }

        this.draw();

        // exit from update
        return;
      }
    }

    // circles (if mouse position doesn't change)
    // shift a circle with previous mouse position +- offset(radius)
    const offset = this.circlesRadius;

    if (this.tick % 4 === 3) {
      // left
      this.x =
        Math.cos(this.angleY * this.tick + HPi * 4) * this.circlesRadius + this.mouseX - offset;
      this.y = Math.sin(this.angleY * this.tick + HPi * 4) * this.circlesRadius + this.mouseY;
    } else if (this.tick % 4 === 2) {
      // right
      this.x =
        Math.cos(-this.angleY * this.tick - HPi * 2) * this.circlesRadius + this.mouseX + offset;
      this.y = Math.sin(-this.angleY * this.tick - HPi * 2) * this.circlesRadius + this.mouseY;
    } else if (this.tick % 4 === 1) {
      // top
      this.x = Math.cos(this.angleX * this.tick - HPi * 3) * this.circlesRadius + this.mouseX;
      this.y =
        Math.sin(this.angleX * this.tick - HPi * 3) * this.circlesRadius + this.mouseY - offset;
    } else if (this.tick % 4 === 0) {
      // bottom
      this.x = Math.cos(-this.angleX * this.tick + HPi * 3) * this.circlesRadius + this.mouseX;
      this.y =
        Math.sin(-this.angleX * this.tick + HPi * 3) * this.circlesRadius + this.mouseY + offset;
    }

    this.draw();
    this.tick += 4;
  }
}

export default Particle;
