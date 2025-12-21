import { soundManager } from "../../SoundManager"
import { displayBlinkingUIMessage } from "../../utils/ui"

export function scene() {
  soundManager.pauseAllSounds()
  add([rect(1280, 720), color(0, 0, 0)])
  add([
    text("Mafamech Salaire ! Nchalah Lmara Ejeya ", {
      size: 50,
      font: "Round",
    }),
    area(),
    anchor("center"),
    pos(center()),
  ])

  displayBlinkingUIMessage(
    "Press [ Enter ] to Start Game",
    vec2(center().x, center().y + 100)
  )

  onKeyPress("enter", () => {
    play("confirm-ui")
    go("1")
  })
}
