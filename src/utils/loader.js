export const load = {
  fonts: () => {
    loadFont("Round", "/fonts/Round9x13.ttf")
  },
  assets: () => {
    // controls prompts
    loadSprite("up", "/images/Arrow_Up_Key_Dark.png")
    loadSprite("down", "/images/Arrow_Down_Key_Dark.png")
    loadSprite("left", "/images/Arrow_Left_Key_Dark.png")
    loadSprite("right", "/images/Arrow_Right_Key_Dark.png")
    loadSprite("space", "/images/Space_Key_Dark.png")

    loadSprite("coin-icon", "/images/Coins_Ui.png")
    loadSprite("star-icon", "/images/Stars_Ui.png")
    loadSprite("coin", "/images/Coin.png")
    loadSprite("logo", "/images/Logo.png")
    loadSprite("player", "/images/Player.png", {
      sliceX: 4,
      sliceY: 4,
      anims: {
        idle: 0,
        run: {
          from: 4,
          to: 7,
          loop: true,
        },
        "jump-up": 8,
        "jump-down": 8,
      },
    })
    loadSprite("bridge", "/images/Bridge.png")
    loadSprite("spider-1", "/images/Spider_1.png", {
      sliceX: 3,
      sliceY: 1,
      anims: {
        crawl: { from: 0, to: 2, loop: true },
        idle: 0,
      },
    })
    loadSprite("spider-2", "/images/Spider_2.png", {
      sliceX: 3,
      sliceY: 1,
      anims: {
        crawl: { from: 0, to: 2, loop: true },
        idle: 0,
      },
    })
    loadSprite("forest-background", "/images/Forest_Background_0.png")
    loadSprite("grass-tileset", "/images/Grass_Tileset.png", {
      sliceX: 3,
      sliceY: 4,
      anims: {
        tl: 0,
        tm: 1,
        tr: 2,
        ml: 3,
        mm: 4,
        mr: 5,
        "ml-2": 6,
        "mm-2": 7,
        "mr-2": 8,
      },
    })
    loadSprite("grass-oneway-tileset", "/images/Grass_Oneway.png", {
      sliceX: 3,
      sliceY: 4,
      anims: {
        tl: 0,
        tm: 1,
        tr: 2,
        ml: 3,
        mm: 4,
        mr: 5,
        "ml-2": 6,
        "mm-2": 7,
        "mr-2": 8,
      },
    })
    loadSprite("water", "/images/Water.png", {
      sliceX: 8,
      sliceY: 1,
      anims: {
        wave: {
          from: 0,
          to: 7,
          speed: 16,
          loop: true,
        },
        "wave-reversed": {
          from: 7,
          to: 0,
          speed: 16,
          loop: true,
        },
      },
    })
    loadSprite("fish-1", "/images/Fish_1.png", {
      sliceX: 2,
      sliceY: 1,
      anims: {
        swim: { from: 0, to: 1, loop: true },
      },
    })
    loadSprite("fish-2", "/images/Fish_2.png", {
      sliceX: 2,
      sliceY: 1,
      anims: {
        swim: { from: 0, to: 1, loop: true },
      },
    })
    loadSprite("castle-background", "/images/Castle_Background_0.png")
    loadSprite("brick-tileset", "/images/Brick_Tileset.png", {
      sliceX: 3,
      sliceY: 4,
      anims: {
        tl: 0,
        tm: 1,
        tr: 2,
        ml: 3,
        mm: 4,
        mr: 5,
        "ml-2": 6,
        "mm-2": 7,
        "mr-2": 8,
      },
    })
    loadSprite("brick-oneway-tileset", "/images/Brick_Oneway.png", {
      sliceX: 3,
      sliceY: 4,
      anims: {
        tl: 0,
        tm: 1,
        tr: 2,
        ml: 3,
        mm: 4,
        mr: 5,
        "ml-2": 6,
        "mm-2": 7,
        "mr-2": 8,
      },
    })

    loadSprite("lava", "/images/Lava.png", {
      sliceX: 8,
      sliceY: 1,
      anims: {
        wave: {
          from: 0,
          to: 7,
          speed: 16,
          loop: true,
        },
        "wave-reversed": {
          from: 7,
          to: 0,
          speed: 16,
          loop: true,
        },
      },
    })
    loadSprite("flame-1", "/images/Flame_1.png", {
      sliceX: 2,
      sliceY: 1,
      anims: {
        burn: { from: 0, to: 1, loop: true },
      },
    })
    loadSprite("flame-2", "/images/Flame_2.png", {
      sliceX: 2,
      sliceY: 1,
      anims: {
        burn: { from: 0, to: 1, loop: true },
      },
    })
    loadSprite("axe", "/images/Axe_Trap.png")
    loadSprite("saw", "/images/Circular_Saw.png")

    loadSprite("sky-background-0", "/images/Sky_Background_0.png")
    loadSprite("sky-background-1", "/images/Sky_Background_1.png")
    loadSprite("sky-background-2", "/images/Sky_Background_2.png")

    loadSprite("rock-tileset", "/images/Grass_Rock_Tileset.png", {
      sliceX: 3,
      sliceY: 4,
      anims: {
        tl: 0,
        tm: 1,
        tr: 2,
        ml: 3,
        mm: 4,
        mr: 5,
        "ml-2": 6,
        "mm-2": 7,
        "mr-2": 8,
      },
    })
    loadSprite("rock-oneway-tileset", "/images/Grass_Rock_Oneway.png", {
      sliceX: 3,
      sliceY: 4,
      anims: {
        tl: 0,
        tm: 1,
        tr: 2,
        ml: 3,
        mm: 4,
        mr: 5,
        "ml-2": 6,
        "mm-2": 7,
        "mr-2": 8,
      },
    })
    loadSprite("clouds", "/images/Clouds.png", {
      sliceX: 8,
      sliceY: 1,
      anims: {
        wave: {
          from: 0,
          to: 7,
          speed: 16,
          loop: true,
        },
        "wave-reversed": {
          from: 7,
          to: 0,
          speed: 16,
          loop: true,
        },
      },
    })
    loadSprite("bird-1", "/images/Bird_1.png", {
      sliceX: 3,
      sliceY: 1,
      anims: {
        fly: {
          from: 0,
          to: 2,
          speed: 9,
          loop: true,
        },
      },
    })
    loadSprite("bird-2", "/images/Bird_2.png", {
      sliceX: 3,
      sliceY: 1,
      anims: {
        fly: {
          from: 0,
          to: 2,
          speed: 9,
          loop: true,
        },
      },
    })
  },
  sounds: () => {
    loadSound("jump", "/sounds/jump.wav")
    loadSound("coin", "/sounds/coin.wav")
    loadSound("water-ambience", "/sounds/water-ambience.mp3")
    loadSound("spider-attack", "/sounds/spider-attack.mp3")
    loadSound("hit", "/sounds/hit.wav")
    loadSound("lava-ambience", "/sounds/lava.wav")
    loadSound("confirm-ui", "/sounds/confirm-ui.wav")
    loadSound("swinging-axe", "/sounds/swinging-axe.mp3")
    loadSound("saw", "/sounds/saw.wav")
    loadSound("fireball", "/sounds/fireball.wav")
    loadSound("strong-wind", "/sounds/strong-wind.wav")
    loadSound("dive", "/sounds/dive.wav")
  },
}
