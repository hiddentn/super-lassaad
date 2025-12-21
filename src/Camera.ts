import type { GameObj } from "kaboom"

export class Camera {
  attachedObj: GameObj | null = null

  attach(
    gameObj: GameObj,
    offsetX = 0,
    offsetY = 0,
    fixedX: number | null = null,
    fixedY: number | null = null
  ): void {
    this.attachedObj = gameObj
    if (fixedX && !fixedY) {
      onUpdate(() => {
        camPos(fixedX, this.attachedObj!.pos.y + offsetY)
      })

      return
    }

    if (!fixedX && fixedY) {
      onUpdate(() => {
        camPos(this.attachedObj!.pos.x + offsetX, fixedY)
      })

      return
    }

    if (fixedX && fixedY) {
      onUpdate(() => {
        camPos(fixedX, fixedY)
      })

      return
    }

    onUpdate(() => {
      camPos(
        this.attachedObj!.pos.x + offsetX,
        this.attachedObj!.pos.y + offsetY
      )
    })
  }
}
