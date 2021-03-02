function connectDots(context, dots) {
  for (let i = 0, l = dots.length; i <= l; i++) {
    let p0 = dots[i === l ? 0 : i];
    let p1 = dots[i + 1 >= l ? i + 1 - l : i + 1];

    context.quadraticCurveTo(p0.x, p0.y, (p0.x + p1.x) * 0.5, (p0.y + p1.y) * 0.5);
  }
}

export default connectDots;
