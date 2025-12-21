import { displayBlinkingUIMessage } from "../../utils/ui"

export function scene() {
  add([sprite("forest-background"), scale(4)])
  add([
    text("Controls", { font: "Round", size: 50 }),
    area(),
    anchor("center"),
    pos(center().x, center().y - 200),
  ])

  const controlPrompts = add([pos(center().x + 30, center().y)])
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
    "Press [ Enter ] to Start Game",
    vec2(center().x, center().y + 300)
  )

  onKeyPress("enter", () => {
    play("confirm-ui", { speed: 1.5 })
    go("1")
  })
}
