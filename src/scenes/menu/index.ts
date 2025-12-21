import { displayBlinkingUIMessage } from "../../utils/ui"

export function scene() {
  add([sprite("forest-background"), scale(4)])
  add([
    sprite("logo"),
    fixed(),
    area(),
    anchor("center"),
    pos(center().x, center().y - 100),
    scale(3 / 5),
  ])

  displayBlinkingUIMessage(
    "Press [ Enter ] to Start Game",
    vec2(center().x, center().y + 100)
  )

  onKeyPress("enter", () => {
    play("confirm-ui", { speed: 1.5 })
    go("controls")
  })
}
