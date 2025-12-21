import { Player } from "../../entities/Player"
import { Fish } from "../../entities/Fish"
import { Spiders } from "../../entities/Spiders"
import { Camera } from "../../Camera"
import { Level } from "../Level"
import { UIManager } from "../../UIManager"
import { soundManager } from "../../SoundManager"
import { config } from "./config"
import { layout, mappings } from "./layout"

export function scene() {
  soundManager.addSound("water-ambience", {
    volume: 0.02,
    loop: true,
  })
  soundManager.play("water-ambience")

  const level = new Level()
  setGravity(config.gravity)
  level.drawBackground("forest-background")
  level.drawMapLayout(layout, mappings)

  const player = new Player(
    config.playerStartPosX,
    config.playerStartPosY,
    config.playerSpeed,
    config.jumpForce,
    config.nbLives,
    1,
    false
  )
  player.enablePassthrough()
  player.enableCoinPickUp()
  player.enableMobVunerability()

  const fish = new Fish(
    config.fishPositions.map((fishPos) => fishPos()),
    config.fishAmplitudes,
    config.fishType
  )
  fish.setMovementPattern()

  const spiders = new Spiders(
    config.spiderPositions.map((spiderPos) => spiderPos()),
    config.spiderAmplitudes,
    config.spiderSpeeds,
    config.spiderType
  )
  spiders.setMovementPattern()
  spiders.enablePassthrough()

  level.drawWaves("water", "wave")

  const camera = new Camera()
  camera.attach(player.gameObj, 0, -200, null, 200)
  UIManager.addDarkBg()
  UIManager.displayLivesCount(player)
  UIManager.displayCoinCount(player)

  player.updateLives(UIManager.livesCountUI)
  player.updateCoinCount(UIManager.coinCountUI)
}
