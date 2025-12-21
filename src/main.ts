import kaboom from "kaboom"
import { load } from "./loader"
import { scene as menuScene } from "./scenes/menu"
import { scene as controlsScene } from "./scenes/controls"
import { scene as level1Scene } from "./scenes/level1"
import { scene as level2Scene } from "./scenes/level2"
import { scene as level3Scene } from "./scenes/level3"
import { scene as gameoverScene } from "./scenes/gameover"
import { scene as endScene } from "./scenes/end"

kaboom({
  width: 1280,
  height: 720,
  letterbox: true,
  debug: true,
})

load.fonts()
load.assets()
load.sounds()

const scenes = {
  menu: menuScene,
  controls: controlsScene,
  1: level1Scene,
  2: level2Scene,
  3: level3Scene,
  gameover: gameoverScene,
  end: endScene,
}

for (const key in scenes) {
  scene(key, scenes[key])
}

go("menu")
