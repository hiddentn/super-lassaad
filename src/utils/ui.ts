import type { Vec2 } from "kaboom"

export function displayBlinkingUIMessage(
  content: string,
  position: Vec2
): void {
  const message = add([
    text(content, { size: 24, font: "Round" }),
    area(),
    anchor("center"),
    pos(position),
    opacity(),
    state("flash-up", ["flash-up", "flash-down"]),
  ])

  message.onStateEnter("flash-up", async () => {
    await tween(
      message.opacity,
      0,
      0.5,
      (val) => (message.opacity = val),
      easings.linear
    )
    message.enterState("flash-down")
  })

  message.onStateEnter("flash-down", async () => {
    await tween(
      message.opacity,
      1,
      0.5,
      (val) => (message.opacity = val),
      easings.linear
    )
    message.enterState("flash-up")
  })
}
