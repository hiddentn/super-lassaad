import type { GameObj } from "kaboom"

export class Player {
  heightDelta = 0
  isMoving = false
  isRespawning = false
  lives = 3
  coins = 0
  hasJumpedOnce = false
  coyoteLapse = 0.1
  isInTerminalScene: boolean
  currentLevelScene: number
  speed: number
  jumpForce: number
  previousHeight: number
  initialX: number
  initialY: number
  timeSinceLastGrounded: number
  gameObj: GameObj

  // Touch control state
  isTouchingLeft = false
  isTouchingRight = false
  isSwipingDown = false
  touchControlsEnabled = true
  showTouchZones = false
  activeTouches: Map<number, { x: number; y: number }> = new Map()
  touchStartPositions: Map<number, { x: number; y: number }> = new Map()
  swipeThreshold = 50 // Minimum distance for swipe detection

  constructor(
    posX: number,
    posY: number,
    speed: number,
    jumpForce: number,
    nbLives: number,
    currentLevelScene: number,
    isInTerminalScene: boolean
  ) {
    this.isInTerminalScene = isInTerminalScene
    this.currentLevelScene = currentLevelScene
    this.makePlayer(posX, posY)
    this.speed = speed
    this.jumpForce = jumpForce
    this.lives = nbLives
    this.previousHeight = this.gameObj.pos.y
    this.setPlayerControls()
    this.setTouchControls()
    this.update()
  }

  makePlayer(x: number, y: number) {
    this.initialX = x
    this.initialY = y
    this.gameObj = add([
      sprite("player", { anim: "idle" }),
      area(),
      anchor("center"),
      pos(x, y),
      scale(0.5),
      body(),
      "player",
    ])
  }

  enablePassthrough() {
    this.gameObj.onBeforePhysicsResolve((collision) => {
      if (collision.target.is("passthrough") && this.gameObj.isJumping()) {
        collision.preventResolution()
      }

      if (
        collision.target.is("passthrough") &&
        (isKeyDown("down") || this.isSwipingDown)
      ) {
        collision.preventResolution()
      }
    })
  }

  enableCoinPickUp() {
    this.gameObj.onCollide("coin", (coin) => {
      this.coins++
      destroy(coin)
      play("coin")
    })
  }

  setPlayerControls() {
    onKeyDown("left", () => {
      if (this.gameObj.paused) return
      if (this.gameObj.curAnim() !== "run") this.gameObj.play("run")
      this.gameObj.flipX = true
      if (!this.isRespawning) this.gameObj.move(-this.speed, 0)
      this.isMoving = true
    })

    onKeyDown("right", () => {
      if (this.gameObj.paused) return
      if (this.gameObj.curAnim() !== "run") this.gameObj.play("run")
      this.gameObj.flipX = false
      if (!this.isRespawning) this.gameObj.move(this.speed, 0)
      this.isMoving = true
    })

    onKeyDown("space", () => {
      if (this.gameObj.paused) return
      if (this.gameObj.isGrounded() && !this.isRespawning) {
        this.hasJumpedOnce = true
        this.gameObj.jump(this.jumpForce)
        play("jump")
      }

      //coyote time
      if (
        !this.gameObj.isGrounded() &&
        time() - this.timeSinceLastGrounded < this.coyoteLapse &&
        !this.hasJumpedOnce
      ) {
        this.hasJumpedOnce = true
        this.gameObj.jump(this.jumpForce)
        play("jump")
      }
    })

    onKeyRelease(() => {
      if (this.gameObj.paused) return
      if (isKeyReleased("right") || isKeyReleased("left")) {
        this.gameObj.play("idle")
        this.isMoving = false
      }
    })
  }

  setTouchControls() {
    if (!this.touchControlsEnabled) return

    // Handle touch start - store initial position for swipe detection
    onTouchStart((touchPos, touch) => {
      if (this.gameObj.paused) return
      this.activeTouches.set(touch.identifier, { x: touchPos.x, y: touchPos.y })
      this.touchStartPositions.set(touch.identifier, {
        x: touchPos.x,
        y: touchPos.y,
      })
      this.processTouches()
    })

    // Handle touch move - detect swipe up for jump, swipe down for passthrough
    onTouchMove((touchPos, touch) => {
      if (this.gameObj.paused) return
      const startPos = this.touchStartPositions.get(touch.identifier)
      if (startPos) {
        const deltaY = startPos.y - touchPos.y
        // Swipe up detected
        if (deltaY > this.swipeThreshold) {
          this.handleTouchJump()
          // Reset start position to prevent multiple jumps from same swipe
          this.touchStartPositions.set(touch.identifier, {
            x: touchPos.x,
            y: touchPos.y,
          })
        }
        // Swipe down detected
        else if (deltaY < -this.swipeThreshold) {
          this.isSwipingDown = true
          // Reset start position to prevent continuous triggering
          this.touchStartPositions.set(touch.identifier, {
            x: touchPos.x,
            y: touchPos.y,
          })
        }
      }
      this.activeTouches.set(touch.identifier, { x: touchPos.x, y: touchPos.y })
      this.processTouches()
    })

    // Handle touch end - clean up
    onTouchEnd((_touchPos, touch) => {
      this.activeTouches.delete(touch.identifier)
      this.touchStartPositions.delete(touch.identifier)
      // Reset swipe down state when touch ends
      if (this.activeTouches.size === 0) {
        this.isSwipingDown = false
      }
      this.processTouches()
    })

    // Fallback for mouse (desktop testing)
    onMousePress(() => {
      if (this.gameObj.paused) return
      const mpos = mousePos()
      this.activeTouches.set(-1, { x: mpos.x, y: mpos.y })
      this.touchStartPositions.set(-1, { x: mpos.x, y: mpos.y })
      this.processTouches()
    })

    onMouseMove(() => {
      if (this.gameObj.paused) return
      if (this.activeTouches.has(-1)) {
        const mpos = mousePos()
        const startPos = this.touchStartPositions.get(-1)
        if (startPos) {
          const deltaY = startPos.y - mpos.y
          // Swipe up detected
          if (deltaY > this.swipeThreshold) {
            this.handleTouchJump()
            // Reset start position to prevent multiple jumps from same swipe
            this.touchStartPositions.set(-1, { x: mpos.x, y: mpos.y })
          }
          // Swipe down detected
          else if (deltaY < -this.swipeThreshold) {
            this.isSwipingDown = true
            // Reset start position to prevent continuous triggering
            this.touchStartPositions.set(-1, { x: mpos.x, y: mpos.y })
          }
        }
        this.activeTouches.set(-1, { x: mpos.x, y: mpos.y })
        this.processTouches()
      }
    })

    onMouseRelease(() => {
      this.activeTouches.delete(-1)
      this.touchStartPositions.delete(-1)
      this.isSwipingDown = false
      this.processTouches()
    })

    // Create visual indicators if enabled
    this.createTouchZoneIndicators()
  }

  processTouches() {
    // Reset touch states
    this.isTouchingLeft = false
    this.isTouchingRight = false

    const screenW = width()

    // Process all active touches for left/right movement
    for (const [, touchPos] of this.activeTouches) {
      // Left third = move left
      if (touchPos.x < screenW / 3) {
        this.isTouchingLeft = true
      }
      // Right third = move right
      else if (touchPos.x > (screenW * 2) / 3) {
        this.isTouchingRight = true
      }
    }

    // Reset movement animation when no touches
    if (
      this.activeTouches.size === 0 &&
      !isKeyDown("left") &&
      !isKeyDown("right")
    ) {
      this.isMoving = false
    }
  }

  handleTouchJump() {
    if (this.gameObj.paused || this.isRespawning) return

    if (this.gameObj.isGrounded()) {
      this.hasJumpedOnce = true
      this.gameObj.jump(this.jumpForce)
      play("jump")
      return
    }

    // Coyote time support
    if (
      !this.gameObj.isGrounded() &&
      time() - this.timeSinceLastGrounded < this.coyoteLapse &&
      !this.hasJumpedOnce
    ) {
      this.hasJumpedOnce = true
      this.gameObj.jump(this.jumpForce)
      play("jump")
    }
  }

  createTouchZoneIndicators() {
    if (!this.showTouchZones) return

    const screenW = width()
    const screenH = height()

    // Left zone indicator (full height)
    add([
      rect(screenW / 3, screenH),
      pos(0, 0),
      color(255, 255, 255),
      opacity(0.1),
      fixed(),
      z(100),
      "touch-zone-indicator",
    ])

    // Right zone indicator (full height)
    add([
      rect(screenW / 3, screenH),
      pos((screenW * 2) / 3, 0),
      color(255, 255, 255),
      opacity(0.1),
      fixed(),
      z(100),
      "touch-zone-indicator",
    ])
  }

  respawnPlayer() {
    if (this.lives > 0) {
      this.gameObj.pos = vec2(this.initialX, this.initialY)
      this.lives--
      this.isRespawning = true
      setTimeout(() => (this.isRespawning = false), 1000)
      return
    }

    go("gameover")
  }

  enableMobVunerability() {
    const hitAndRespawn = () => {
      play("hit", { speed: 1.5 })
      this.respawnPlayer()
    }
    this.gameObj.onCollide("fish", () => hitAndRespawn())
    this.gameObj.onCollide("spiders", () => hitAndRespawn())
    this.gameObj.onCollide("flames", () => hitAndRespawn())
    this.gameObj.onCollide("axes", () => hitAndRespawn())
    this.gameObj.onCollide("saws", () => hitAndRespawn())
    this.gameObj.onCollide("birds", () => hitAndRespawn())
  }

  update() {
    onUpdate(() => {
      if (this.gameObj.isGrounded()) {
        this.hasJumpedOnce = false
        this.timeSinceLastGrounded = time()
      }

      this.heightDelta = this.previousHeight - this.gameObj.pos.y
      this.previousHeight = this.gameObj.pos.y

      // Handle touch-based continuous movement
      if (this.touchControlsEnabled && !this.gameObj.paused) {
        if (this.isTouchingLeft && !this.isRespawning) {
          if (this.gameObj.curAnim() !== "run") this.gameObj.play("run")
          this.gameObj.flipX = true
          this.gameObj.move(-this.speed, 0)
          this.isMoving = true
        }
        if (this.isTouchingRight && !this.isRespawning) {
          if (this.gameObj.curAnim() !== "run") this.gameObj.play("run")
          this.gameObj.flipX = false
          this.gameObj.move(this.speed, 0)
          this.isMoving = true
        }
      }

      if (!this.isMoving && this.gameObj.curAnim() !== "idle") {
        this.gameObj.play("idle")
      }

      if (
        !this.gameObj.isGrounded() &&
        this.heightDelta > 0 &&
        this.gameObj.curAnim() !== "jump-up"
      ) {
        this.gameObj.play("jump-up")
      }

      if (
        !this.gameObj.isGrounded() &&
        this.heightDelta < 0 &&
        this.gameObj.curAnim() !== "jump-down"
      ) {
        this.gameObj.play("jump-down")
      }

      if (this.gameObj.pos.y > 1000) {
        play("hit", { speed: 1.5 })
        this.respawnPlayer()
      }
    })
  }

  updateLives(livesCountUI: GameObj) {
    onUpdate(() => {
      livesCountUI.text = `${this.lives}`
    })
  }

  updateCoinCount(coinCountUI: GameObj & { fullCoinCount: number }) {
    onUpdate(() => {
      coinCountUI.text = `${this.coins} / ${coinCountUI.fullCoinCount}`
      if (this.coins === coinCountUI.fullCoinCount) {
        go(this.isInTerminalScene ? "end" : String(this.currentLevelScene + 1))
      }
    })
  }
}
