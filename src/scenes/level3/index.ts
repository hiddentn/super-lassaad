import { Player } from "../../entities/Player"
import { Birds } from "../../entities/Birds"
import { Camera } from "../../Camera"
import { Level } from "../Level"
import { UIManager } from "../../UIManager"
import { soundManager } from "../../SoundManager"
import { config } from "./config"
import { layout, mappings } from "./layout"

export function scene() {
  soundManager.pauseAllSounds()
  soundManager.addSound("strong-wind", { volume: 0.2, loop: true })
  soundManager.play("strong-wind")
  setGravity(config.gravity)

  const level = new Level()
  level.drawBackground("sky-background-0")
  level.drawBackground("sky-background-1")
  level.drawBackground("sky-background-2")
  level.drawMapLayout(layout, mappings)

  const player = new Player(
    config.playerStartPosX,
    config.playerStartPosY,
    config.playerSpeed,
    config.jumpForce,
    config.nbLives,
    3,
    true
  )
  player.enablePassthrough()
  player.enableCoinPickUp()
  player.enableMobVunerability()

  level.drawWaves("clouds", "wave")

  const birds = new Birds(
    config.birdPositions.map((birdPos) => birdPos()),
    config.birdRanges,
    config.birdType
  )
  birds.setMovementPattern()

  const camera = new Camera()
  camera.attach(player.gameObj, 0, -200, null, 200)

  UIManager.displayLivesCount(player)
  UIManager.displayCoinCount(player)

  player.updateLives(UIManager.livesCountUI)
  player.updateCoinCount(UIManager.coinCountUI)
}
