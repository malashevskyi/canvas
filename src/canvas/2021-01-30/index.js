import React from 'react'
import { lerp } from 'canvas-sketch-util/math';

import { useCanvas } from './../../hooks/useCanvas';
import getGui from '../../utils/getGui';
import Point from './Point';

const sketch = ({ context, width, height }) => {
  const points = [];
  const opt = {
    fillStyle: 'red',
    showPoints: false,
    count: 30,
    thickness: 5,
    level: 0.35
  };

  function updatePoints() {
    let i = points.length;
    while (i--) {
      points[i].update();
    }
  };

  function renderPoints() {
    let i = points.length;
    while (i--) {
      points[i].draw();
    }
  };

  function renderCurve(space) {
    let pointCount = points.length;
    let s = space === 'top';
    for (let i = 0; i < pointCount - 1; i++) {
      let c = (points[i].x + points[i + 1].x) / 2;
      let d = (points[i].y + points[i + 1].y) / 2;

      if (space === 'top') {
        d = (height - points[i].y + (height - points[i + 1].y)) / 2;
      }

      context.quadraticCurveTo( points[i].x, s ? height - points[i].y : points[i].y, c, d );
    }
  }

  let renderShape = function () {
    context.fillStyle = opt.fillStyle;
    context.lineWidth = opt.thickness;

    // bottom wave
    context.beginPath();
    // left-top
    context.moveTo( points[0].x - opt.thickness - 20, points[0].y );
    // connect dots from left-top to right-top
    renderCurve();
    // right-bottom
    context.lineTo( width + opt.thickness, height + opt.thickness );
    // left-bottom
    context.lineTo( -opt.thickness * 2, height + opt.thickness );
    context.fill();
    context.stroke();

    // top wave
    context.beginPath();
    // right-top
    context.moveTo( width + opt.thickness, 0 - opt.thickness );
    // left-top
    context.lineTo(0 - opt.thickness, 0 - opt.thickness);
    // left-bottom
    context.lineTo( points[0].x - opt.thickness, height - points[0].y );
    // connect dots from left-bottmom
    renderCurve('top');
    context.closePath();
    context.fill();
    context.stroke();
  };

  function drawPoints() {
    points.length = 0;
    for (let i = 0; i <= opt.count; i++) {
      points.push(
        new Point({
          context,
          x: lerp(
            -opt.thickness,
            width + opt.thickness,
            i / (opt.count - 1)
          ),
          y: height - height * opt.level,
        })
      );
    }
  }
  
  getGui((gui) => {
    gui.add(opt, 'count').min(5).max(40).step(1).name('Count').onChange(drawPoints);
    gui.add(opt, 'level').min(0.1).max(0.4).name('Level').onChange(() => { drawPoints(); });
    gui.add(opt, 'thickness').min(5).max(Math.floor(height * 0.05)).name('Thickness').onChange(renderShape);
  });

  drawPoints();

  return (props) => {
    ({ width, height } = props);

    context.clearRect(0, 0, width, height);
    context.lineJoin = 'round';

    updatePoints();
    renderShape();
    if (opt.showPoints) {
      renderPoints();
    }
  };
};

const Canvas = React.forwardRef((props, ref) => {
  const canvas = ref.current;
  useCanvas({ canvas, sketch });

  return '';
});

export default Canvas;