class Square {
  constructor({ context, xy }) {
    this.context = context;
    // eslint-disable-next-line
    this.x = xy[0];
    // eslint-disable-next-line
    this.y = xy[1];
  }

  render(clear) {
    this.context.beginPath();
    this.context.fillStyle = 'orange';
    if (clear) {
      this.context.clearRect(this.x - 0.5, this.y - 0.5, 7, 7);
    } else {
      this.context.fillRect(this.x, this.y, 6, 6);
    }
    this.context.closePath();
  }
}

export default Square;
