import type { GameObj, Vec2 } from "kaboom"

export class Fish {
  amplitudes: number[]
  fish: GameObj[]

  constructor(positions: Vec2[], amplitudes: number[], type: number) {
    this.amplitudes = amplitudes
    this.fish = []
    for (const position of positions) {
      this.fish.push(
        add([
          sprite(`fish-${type}`, { anim: "swim" }),
          area({ shape: new Rect(vec2(0), 12, 12) }),
          anchor("center"),
          pos(position),
          scale(4),
          rotate(90),
          state("launch", ["launch", "rotate", "fall"]),
          offscreen(),
          "fish",
        ])
      )
    }
  }

  setMovementPattern() {
    for (const [index, fish] of this.fish.entries()) {
      const launch = fish.onStateEnter("launch", async () => {
        await tween(
          fish.pos.y,
          fish.pos.y - this.amplitudes[index],
          2,
          (posY) => (fish.pos.y = posY),
          easings.easeOutSine
        )
        fish.enterState("rotate", "fall")
      })

      const rotate = fish.onStateEnter("rotate", (nextState: string) => {
        fish.rotateBy(180)
        fish.enterState(nextState)
      })

      const fall = fish.onStateEnter("fall", async () => {
        await tween(
          fish.pos.y,
          fish.pos.y + this.amplitudes[index],
          2,
          (posY) => (fish.pos.y = posY),
          easings.easeOutSine
        )
        fish.enterState("rotate", "launch")
      })

      onSceneLeave(() => {
        launch.cancel()
        rotate.cancel()
        fall.cancel()
      })
    }
  }
}
