import { Player } from "../../entities/Player"
import { Flames } from "../../entities/Flames"
import { Spiders } from "../../entities/Spiders"
import { Axes } from "../../entities/Axes"
import { Saws } from "../../entities/Saws"
import { Camera } from "../../Camera"
import { Level } from "../Level"
import { UIManager } from "../../UIManager"
import { soundManager } from "../../SoundManager"
import { config } from "./config"
import { layout, mappings } from "./layout"

export function scene() {
  soundManager.pauseAllSounds()
  soundManager.addSound("lava-ambience", { loop: true })
  soundManager.play("lava-ambience")
  setGravity(config.gravity)

  const level = new Level()
  level.drawBackground("castle-background")
  level.drawMapLayout(layout, mappings)

  const player = new Player(
    config.playerStartPosX,
    config.playerStartPosY,
    config.playerSpeed,
    config.jumpForce,
    config.nbLives,
    2,
    false
  )
  player.enablePassthrough()
  player.enableCoinPickUp()
  player.enableMobVunerability()

  const flames = new Flames(
    config.flamePositions.map((flamePos) => flamePos()),
    config.flameAmplitudes,
    config.flameType
  )
  flames.setMovementPattern()

  const spiders = new Spiders(
    config.spiderPositions.map((spiderPos) => spiderPos()),
    config.spiderAmplitudes,
    config.spiderSpeeds,
    config.spiderType
  )
  spiders.setMovementPattern()
  spiders.enablePassthrough()

  const axes = new Axes(
    config.axesPositions.map((axePos) => axePos()),
    config.axesSwingTimes
  )
  axes.setMovementPattern()

  const saws = new Saws(
    config.sawPositions.map((sawPos) => sawPos()),
    config.sawRanges
  )
  saws.rotate()

  level.drawWaves("lava", "wave")

  const camera = new Camera()
  camera.attach(player.gameObj, 0, -200, null, 200)

  UIManager.displayLivesCount(player)
  UIManager.displayCoinCount(player)

  player.updateLives(UIManager.livesCountUI)
  player.updateCoinCount(UIManager.coinCountUI)
}
