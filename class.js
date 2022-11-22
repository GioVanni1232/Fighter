class Sprite {
  constructor({
    position,
    imgSrc,
    scale = 1,
    maxFrame = 1,
    offset = { x: 0, y: 0 },
  }) {
    this.position = position;
    this.height = 150;
    this.width = 50;
    this.img = new Image();
    this.img.src = imgSrc;
    this.scale = scale;
    this.maxFrame = maxFrame;
    this.frame = 0;
    this.stagger = 0;
    this.speed = 15;
    this.offset = offset;
  }

  draw() {
    ctx.drawImage(
      this.img,
      this.frame * (this.img.width / this.maxFrame),
      0,
      this.img.width / this.maxFrame,
      this.img.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.img.width / this.maxFrame) * this.scale,
      this.img.height * this.scale
    );
  }

  animateFrames() {
    this.stagger++;
    if (this.stagger % this.speed === 0) {
      if (this.frame < this.maxFrame - 1) this.frame++;
      else this.frame = 0;
    }
  }

  update() {
    this.draw();
    this.animateFrames();
  }
}

class Fighter extends Sprite {
  constructor({
    position,
    velocity,
    imgSrc,
    scale = 1,
    maxFrame = 1,
    offset = { x: 0, y: 0 },
    sprites,
  }) {
    super({
      position,
      imgSrc,
      scale,
      maxFrame,
      offset,
    });

    this.velocity = velocity;
    this.height = 150;
    this.width = 50;
    this.lastKey;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 150,
      height: 50,
      offset,
    };
    this.offset;
    this.isAttacking;
    this.health = 100;
    this.frame = 0;
    this.stagger = 0;
    this.speed = 15;
    this.sprites = sprites;

    for (const sprite in this.sprites) {
      sprites[sprite].img = new Image();
      sprites[sprite].img.src = sprites[sprite].imgSrc;
    }
  }

  update() {
    this.draw();
    this.animateFrames();
    this.attackBox.position.x = this.position.x - this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (
      this.height + this.position.y + this.velocity.y >=
      canvas.height - 205
    ) {
      this.velocity.y = 0;
      this.position.y = 221;
    } else this.velocity.y += gravity;
  }

  attack() {
    this.switchSprite("attack");
    this.isAttacking = true;

    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }

  switchSprite(sprite) {
    if (
      (this,
      this.img === this.sprites.attack.img &&
        this.frame < this.sprites.attack.maxFrame - 1)
    )
      return;
    switch (sprite) {
      case "idle":
        if (this.img !== this.sprites.idle.img) {
          this.img = this.sprites.idle.img;
          this.maxFrame = this.sprites.idle.maxFrame;
          this.frame = 0;
        }
        break;

      case "run":
        if (this.img !== this.sprites.run.img) {
          this.img = this.sprites.run.img;
          this.maxFrame = this.sprites.run.maxFrame;
          this.frame = 0;
        }

        break;
      case "jump":
        if (this.img !== this.sprites.jump.img) {
          this.img = this.sprites.jump.img;
          this.maxFrame = this.sprites.jump.maxFrame;
          this.frame = 0;
        }

        break;
      case "attack":
        if (this.img !== this.sprites.attack.img) {
          this.img = this.sprites.attack.img;
          this.maxFrame = this.sprites.attack.maxFrame;
          this.frame = 0;
        }
        break;
      case "fall":
        if (this.img !== this.sprites.fall.img) {
          this.img = this.sprites.fall.img;
          this.maxFrame = this.sprites.fall.maxFrame;
          this.frame = 0;
        }
        break;
    }
  }
}
