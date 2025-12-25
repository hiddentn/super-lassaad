import { soundManager } from "../../SoundManager"
import { displayBlinkingUIMessage } from "../../utils/ui"

export function scene() {
  soundManager.pauseAllSounds()
  add([rect(width(), height()), color(0, 0, 0)])
  add([
    text("Mabrouk!", { size: 35, font: "Round" }),
    area(),
    anchor("center"),
    pos(center()),
  ])
  add([
    text("Rbe7t M3ana Prime", { size: 30, font: "Round" }),
    area(),
    anchor("center"),
    pos(vec2(center().x, center().y + 80)),
  ])

  displayBlinkingUIMessage(
    "Press [ Enter ] or Tap",
    vec2(center().x, center().y + 150)
  )
  displayBlinkingUIMessage("to Play Again", vec2(center().x, center().y + 180))

  const goToMenu = () => {
    play("confirm-ui")
    go("menu")
  }

  onKeyPress("enter", goToMenu)
  onMousePress(goToMenu)
  onTouchStart(goToMenu)
}
