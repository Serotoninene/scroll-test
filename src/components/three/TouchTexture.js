import { Texture } from "three";

function outSine(n) {
  return Math.sin((n * Math.PI) / 2);
}

export default class TouchTexture {
  constructor(isOnScreen = false, size = 128, maxAge = 120, radius = 0.2) {
    this.size = size;
    this.maxAge = maxAge;
    this.radius = radius;
    this.trail = [];
    this.canDraw = true;

    this.initTexture(isOnScreen);
  }

  initTexture(onScreen) {
    // create a 2D canvas to store the information of the cursor
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.canvas.height = this.size;
    this.ctx = this.canvas.getContext("2d");
    // draw black background
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    // use the canvas as a texture
    this.texture = new Texture(this.canvas);

    this.canvas.id = "touchTexture";
    // this.canvas.style.width = this.canvas.style.height = `150px`
    this.canvas.style.position = "fixed";
    this.canvas.style.bottom = "0";
    this.canvas.style.zIndex = "10000";

    // No need to add it to the body,
    onScreen && document.body.appendChild(this.canvas);
  }

  update() {
    this.clear();
    if (!this.canDraw) {
      return false;
    }

    // age points
    this.trail.forEach((point, i) => {
      point.age++;
      // remove old
      if (point.age > this.maxAge) {
        this.trail.splice(i, 1);
      }
    });

    // draw white points
    this.trail.forEach((point) => {
      this.drawTouch(point);
    });

    // update texture
    this.texture.needsUpdate = true;
  }

  clear() {
    // clear canvas
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  addTouch(point) {
    let force = 0;
    const last = this.trail[this.trail.length - 1];
    if (last) {
      const dx = last.x - point.x;
      const dy = last.y - point.y;
      const dd = dx * dx + dy * dy;
      force = Math.min(dd * 10000, 1);
    }

    this.trail.push({ x: point.x, y: point.y, age: 0, force });
  }

  drawTouch(point) {
    // draw point based on size and age
    const pos = {
      x: point.x * this.size,
      y: (1 - point.y) * this.size,
    };

    let intensity = 1;
    if (point.age < this.maxAge * 0.3) {
      intensity = outSine(point.age / (this.maxAge * 0.3), 0, 1, 1);
    } else {
      intensity = outSine(
        1 - (point.age - this.maxAge * 0.3) / (this.maxAge * 0.7),
        0,
        1,
        1
      );
    }

    intensity *= point.force;

    const radius = this.size * this.radius * intensity;
    const grd = this.ctx.createRadialGradient(
      pos.x,
      pos.y,
      radius * 0.25,
      pos.x,
      pos.y,
      radius
    );
    // draw gradient white circles
    grd.addColorStop(0, `rgba(255, 255, 255, 0.35)`);
    grd.addColorStop(1, "rgba(0, 0, 0, 0.0)");

    this.ctx.beginPath();
    this.ctx.fillStyle = grd;
    this.ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
    this.ctx.fill();
    // fill canvas
  }

  reset() {
    // reset canvas
    this.trail = [];
    this.canDraw = false;
    this.ctx.beginPath();
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.0)";
    this.ctx.fill();
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => (this.canDraw = true), 0);
  }
}
