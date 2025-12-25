import { displayBlinkingUIMessage } from "../../utils/ui"

export function scene() {
  add([sprite("forest-background"), scale(width() / 320, height() / 180)])
  add([
    text("Controls", { font: "Round", size: 30 }),
    area(),
    anchor("center"),
    pos(center().x, center().y - 200),
  ])

  const controlPrompts = add([pos(center().x + 10, center().y - 50)])
  controlPrompts.add([sprite("up"), pos(0, -80)])
  controlPrompts.add([sprite("down")])
  controlPrompts.add([sprite("left"), pos(-80, 0)])
  controlPrompts.add([sprite("right"), pos(80, 0)])
  controlPrompts.add([sprite("space"), pos(-200, 0)])
  controlPrompts.add([
    text("Jump", { font: "Round", size: 32 }),
    pos(-190, 100),
  ])
  controlPrompts.add([text("Move", { font: "Round", size: 32 }), pos(10, 100)])

  displayBlinkingUIMessage(
    "Tap Left or Right to Move",
    vec2(center().x, center().y + 130)
  )

  displayBlinkingUIMessage(
    "Swipe Up to Jump",
    vec2(center().x, center().y + 160)
  )

  displayBlinkingUIMessage(
    "Press [ Enter ] or Tap",
    vec2(center().x, center().y + 240)
  )
  displayBlinkingUIMessage("to Start Game", vec2(center().x, center().y + 270))

  const startGame = () => {
    play("confirm-ui", { speed: 1.5 })
    go("1")
  }

  onKeyPress("enter", startGame)
  onMousePress(startGame)
  onTouchStart(startGame)
}
