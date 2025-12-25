import type { GameObj } from "kaboom"
import type { TileMappings } from "./generateMappings"

export class Level {
  map: GameObj[] = []

  drawWaves(type: string, anim: string) {
    const tileWidth = 64
    const numTiles = Math.ceil(width() / tileWidth) + 2
    let offset = -100
    for (let i = 0; i < numTiles; i++) {
      add([
        sprite(type, { anim }),
        pos(offset, height() - 150),
        scale(4),
        fixed(),
      ])
      offset += tileWidth
    }
  }

  drawMapLayout(levelLayout: string[][], mappings: TileMappings) {
    const layerSettings = {
      tileWidth: 16,
      tileHeight: 12,
      tiles: mappings,
    }

    this.map = []
    for (const layerLayout of levelLayout) {
      this.map.push(addLevel(layerLayout, layerSettings))
    }

    for (const layer of this.map) {
      layer.use(scale(4))
    }
  }

  drawBackground(bgSpriteName: string) {
    add([sprite(bgSpriteName), fixed(), scale(width() / 320, height() / 180)])
  }
}
