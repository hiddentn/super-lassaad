import type { GameObj } from "kaboom"
import { Player } from "./entities/Player"

class UI {
  livesCountUI: GameObj
  coinCountUI: GameObj & { fullCoinCount: number }
  fullCoinCount: number

  displayLivesCount(player: Player): void {
    this.livesCountUI = add([
      text(`${player.lives}`, {
        font: "Round",
        size: 50,
      }),
      fixed(),
      pos(70, 10),
    ])

    this.livesCountUI.add([
      sprite("star-icon"),
      pos(-60, -5),
      scale(3),
      fixed(),
    ])
  }

  displayCoinCount(player: Player): void {
    this.coinCountUI = add([
      text(`${player.coins} / ${this.fullCoinCount}`, {
        font: "Round",
        size: 50,
      }),
      {
        fullCoinCount: get("coin", { recursive: true }).length,
      },
      fixed(),
      pos(70, 70),
    ])

    this.coinCountUI.add([sprite("coin-icon"), pos(-60, 0), scale(3), fixed()])
  }

  addDarkBg(): void {
    add([rect(270, 130), color(0, 0, 0), fixed()])
  }
}

export const UIManager = new UI()
