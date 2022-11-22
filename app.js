const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.2;
const controlls = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  Arrowleft: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowUp: {
    pressed: false,
  },
};

const player = new Fighter({
  position: {
    x: 100,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 0,
    y: 0,
  },
  imgSrc: "fighter/PlayerIdle.png",
  maxFrame: 9,
  scale: 2,
  offset: {
    x: 100,
    y: 0,
  },
  sprites: {
    idle: {
      imgSrc: "fighter/PlayerIdle.png",
      maxFrame: 9,
    },
    run: {
      imgSrc: "fighter/PlayerRun.png",
      maxFrame: 8,
    },
    attack: {
      imgSrc: "fighter/Player.png",
      maxFrame: 8,
    },
    jump: {
      imgSrc: "fighter/PlayerJump.png",
      maxFrame: 10,
    },
    fall: {
      imgSrc: "fighter/PlayerFall.png",
      maxFrame: 6,
    },
  },
});

const enemy = new Fighter({
  position: {
    x: 800,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  color: "blue",
  offset: {
    x: 0,
    y: -70,
  },
  imgSrc: "fighter/EnemyIdle.png",
  maxFrame: 7,
  scale: 2,
  sprites: {
    idle: {
      imgSrc: "fighter/EnemyIdle.png",
      maxFrame: 7,
    },
    run: {
      imgSrc: "fighter/EnemyRun.png",
      maxFrame: 8,
    },
    attack: {
      imgSrc: "fighter/Enemy.png",
      maxFrame: 5,
    },
    jump: {
      imgSrc: "fighter/EnemyJump.png",
      maxFrame: 9,
    },
  },
});

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imgSrc: "background.png",
});

const shop = new Sprite({
  position: {
    x: 620,
    y: 160,
  },
  imgSrc: "shop.png",
  scale: 2.5,
  maxFrame: 6,
});

decreaseTime();

function animate() {
  window.requestAnimationFrame(animate);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  background.update();
  shop.update();
  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  if (controlls.a.pressed && player.lastKey === "a") {
    player.velocity.x = -5;
    player.switchSprite("run");
  } else if (controlls.d.pressed && player.lastKey === "d") {
    player.img = player.sprites.run.img;
    player.maxFrame = player.sprites.run.maxFrame;
    player.velocity.x = 5;
  } else player.switchSprite("idle");

  if (player.velocity.y < 0) {
    player.switchSprite("jump");
  } else if (player.velocity.y > 0) player.switchSprite("fall");

  if (controlls.Arrowleft.pressed && enemy.lastKey === "ArrowLeft") {
    enemy.velocity.x = -5;
    enemy.switchSprite("run");
  } else if (controlls.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
    enemy.velocity.x = 5;
    enemy.switchSprite("run");
  } else enemy.switchSprite("idle");

  if (enemy.velocity.y < 0) {
    enemy.switchSprite("jump");
  }

  if (
    rectangleCollision({
      recatngle1: player,
      rectangle2: enemy,
    }) &&
    player.isAttacking
  ) {
    player.isAttacking = false;
    enemy.health -= 10;
    document.querySelector(".enemy-health").style.width = `${enemy.health}%`;
  }

  if (
    rectangleCollision({
      recatngle1: enemy,
      rectangle2: player,
    }) &&
    enemy.isAttacking
  ) {
    enemy.isAttacking = false;
    player.health -= 10;
    document.querySelector(".player-health").style.width = `${player.health}%`;
  }

  if (enemy.health === 0 || player.health === 0)
    determineWinner({ player, enemy, timeId });
}

animate();

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "d":
      controlls.d.pressed = true;
      player.lastKey = "d";
      break;
    case "a":
      controlls.a.pressed = true;
      player.lastKey = "a";
      break;
    case "w":
      if (player.velocity.y === 0) player.velocity.y = -10;
      break;
    case " ":
      player.attack();
      break;
    case "ArrowLeft":
      controlls.Arrowleft.pressed = true;
      enemy.lastKey = "ArrowLeft";
      break;
    case "ArrowRight":
      controlls.ArrowRight.pressed = true;
      enemy.lastKey = "ArrowRight";
      break;
    case "ArrowUp":
      if (enemy.velocity.y === 0) enemy.velocity.y = -10;
      break;
    case "ArrowDown":
      enemy.attack();
      break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "d":
      controlls.d.pressed = false;
      break;
    case "a":
      controlls.a.pressed = false;
      break;
    case "ArrowLeft":
      controlls.Arrowleft.pressed = false;
      break;
    case "ArrowRight":
      controlls.ArrowRight.pressed = false;
      break;
  }
});
