import kaboom from "kaboom"
import { load } from "./loader"
import { scene as menuScene } from "./scenes/menu"
import { scene as controlsScene } from "./scenes/controls"
import { scene as level1Scene } from "./scenes/level1"
import { scene as level2Scene } from "./scenes/level2"
import { scene as level3Scene } from "./scenes/level3"
import { scene as gameoverScene } from "./scenes/gameover"
import { scene as endScene } from "./scenes/end"

const devToolsMessage = () => {
  // eslint-disable-next-line no-console
  console.log(
    "%c💸 Pro tip: %cctrl+w gives you 1000 coins!",
    "color: #ffd93d; font-size: 16px; font-weight: bold;",
    "color: #6bcb77; font-size: 16px; font-style: italic;"
  )

  // eslint-disable-next-line no-console
  console.log(
    `%c
    ┌─────────────────────────────────────────────────────────────┐
    │  🇹🇳 Message men Lassaad:                                    │
    │                                                             │
    │  "Ma thamma salaire hatta tkammel les 3 niveaux...          │
    │   W ken t7eb bonus, jib    3 étoiles f kol niveau! 😤"      │
    │             and send screenshot                             │
    │                                                             │
    └─────────────────────────────────────────────────────────────┘`,
    "color: #e63946; font-size: 13px; font-weight: bold; background: linear-gradient(#fff, #fff);"
  )
}

const main = () => {
  kaboom({
    width: window.innerWidth,
    height: window.innerHeight,
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
}

devToolsMessage()
main()
