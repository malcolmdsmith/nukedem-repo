const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// This defines a particle and is copied to create new particles
const starDust = {
  x: 0, // the current position
  y: 0,
  dx: 0, // delta x,y (velocity)
  dy: 0,
  drag: 0, // the rate that the particle slows down.
  life: 0, // count down till particle is removed
  age: 0, // the starting value of life
  draw() {
    // function to update and draw the particle
    this.x += this.dx; // move it
    this.y += this.dy;
    this.dx *= this.drag; // slow it down
    this.dy *= this.drag;
    const unitLife = this.life / this.age; // get the life left as a value
    // from 0 to 1 where 0 is end
    ctx.globalAlpha = unitLife; // set the alpha
    ctx.beginPath();
    // console.info(Math.floor(this.x), Math.floor(this.y));
    ctx.fillStyle = "white";
    ctx.arc(this.x, this.y, 1, 0, Math.PI); // draw the particle
    ctx.fill();
    this.life -= 1; // count down
    return this.life > 0; // return true if still alive
  },

  init(x, y, vx, vy) {
    // where x,y and velocity vx,vy of shooting star
    this.x = x;
    this.y = y;
    this.dx = vx;
    this.dy = vy;
    // give a random age
    this.age = (Math.random() * 100 + 60) | 0; // in frames and | 0 floors the value
    this.life = this.age; // and set the life countdown
    this.drag = Math.random() * 0.01 + 0.99; // the drag that slows the particle down
  },
};

const dust = {
  particles: [], // array of active particles
  pool: [], // array of unused particels
  createParticle(particleDesc) {
    // creates a new particle from particleDesc
    return Object.assign({}, particleDesc);
  },
  add(x, y, vx, vy) {
    // where x,y and velocity vx,vy
    var dust;
    if (this.pool.length) {
      // are there any particles in the pool
      dust = this.pool.pop(); // get one
    } else {
      // else there are no spare particles so create a new one
      dust = this.createParticle(starDust);
    }
    dust.init(x, y, vx, vy); // init  the particle
    this.particles.push(dust); // put it in the active particle array
    return dust; // return it (sometimes you want to do something with it)
  },
  draw() {
    // updates and draws all active particles
    console.info("drawing...", this.particles.length);
    var i = 0;
    while (i < this.particles.length) {
      // iterate each particle in particles
      if (this.particles[i].draw() === false) {
        // is it dead??
        this.pool.push(this.particles.splice(i, 1)[0]); // if dead put in the pool for later
      } else {
        i++;
      } // if not dead get index of next particle
    }
  },
}; //end of dust object

const star = {
  x: 500,
  y: 100,
  dx: 2,
  dy: -2,
};

function drawBG() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  animate();
}
function animate() {
  // assuming that the falling star is called star and has an x,y and dx,dy (delta)
  if (star) {
    // only if there is a start to spawn from
    // add a particle once every 10 frame (on average
    if (Math.random() < 0.1) {
      dust.add(star.x, star.y, star.dx, star.dy); // add some dust at the shooting starts position and speed
    }
  }

  dust.draw(); // draw all particles
  requestAnimationFrame(animate);
}

drawBG();
