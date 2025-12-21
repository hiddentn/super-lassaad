import type { Comp } from "kaboom"

/**
 * A tile key character used in level layout strings.
 *
 * The mapping uses single characters to represent different tile types:
 * - `0-2`: Top row tiles (tl, tm, tr) - solid with collision
 * - `3-5`: Middle row tiles (ml, mm, mr) - ml/mr solid, mm decorative
 * - `6-8`: Bottom row tiles (ml-2, mm-2, mr-2) - decorative only
 * - `9-b`: One-way platform top row - can jump through from below
 * - `c-e`: One-way platform bottom - decorative only
 * - `o`: Bridge tile - solid platform
 * - `@`: Coin collectible
 */
export type TileKey =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "o"
  | "@"

/**
 * Function that returns an array of Kaboom components for a tile.
 * Used by Kaboom's `addLevel()` to create game objects from layout strings.
 */
export type TileComponentFactory = () => (Comp | string)[]

/**
 * Mapping of tile keys to their component factory functions.
 * Used with Kaboom's `addLevel()` tiles configuration.
 */
export type TileMappings = Record<TileKey, TileComponentFactory>

/**
 * Supported tileset types that have corresponding sprite assets.
 * Each type has both a main tileset and a one-way platform variant.
 *
 * - `grass`: Forest/nature themed tiles (level 1)
 * - `brick`: Castle/dungeon themed tiles (level 2)
 * - `rock`: Sky/mountain themed tiles (level 3)
 */
export type TilesetType = "grass" | "brick" | "rock"

/**
 * Generates a complete tile mapping configuration for a given tileset type.
 *
 * This function creates mappings for use with Kaboom's `addLevel()` function,
 * allowing level layouts to be defined as arrays of strings where each character
 * represents a specific tile type.
 *
 * ## Tile Grid Layout
 *
 * The tileset is organized in a 3x3 grid pattern for building terrain:
 *
 * ```
 * Solid tiles:        One-way platforms:
 * ┌───┬───┬───┐       ┌───┬───┬───┐
 * │ 0 │ 1 │ 2 │  top  │ 9 │ a │ b │  passthrough top
 * ├───┼───┼───┤       ├───┼───┼───┤
 * │ 3 │ 4 │ 5 │  mid  │ c │ d │ e │  decorative
 * ├───┼───┼───┤       └───┴───┴───┘
 * │ 6 │ 7 │ 8 │  bot
 * └───┴───┴───┘
 * ```
 *
 * ## Collision Behavior
 *
 * - **Solid tiles (0-2, 3, 5)**: Full collision, blocks movement from all directions
 * - **One-way platforms (9-b)**: Can jump through from below, solid from above
 * - **Decorative tiles (4, 6-8, c-e)**: No collision, visual only
 * - **Bridge (o)**: Full collision, standalone platform
 * - **Coin (@)**: Collectible item with "coin" tag
 *
 * @param tileType - The tileset theme to use ("grass", "brick", or "rock")
 * @returns A mapping object compatible with Kaboom's `addLevel()` tiles config
 *
 * @example
 * ```ts
 * // Generate mappings for a grass-themed level
 * const grassMappings = generateMappings("grass")
 *
 * // Use with addLevel to create the map
 * const levelLayout = [
 *   "  012  ",
 *   "  345  ",
 *   "  678  ",
 * ]
 *
 * addLevel(levelLayout, {
 *   tileWidth: 16,
 *   tileHeight: 12,
 *   tiles: grassMappings,
 * })
 * ```
 */
export function generateMappings(tileType: TilesetType): TileMappings {
  return {
    // Top row - solid tiles with collision
    0: () => [
      sprite(`${tileType}-tileset`, { anim: "tl" }),
      area(),
      body({ isStatic: true }),
      offscreen(),
    ],
    1: () => [
      sprite(`${tileType}-tileset`, { anim: "tm" }),
      area(),
      body({ isStatic: true }),
      offscreen(),
    ],
    2: () => [
      sprite(`${tileType}-tileset`, { anim: "tr" }),
      area(),
      body({ isStatic: true }),
      offscreen(),
    ],

    // Middle row - left/right solid, middle decorative
    3: () => [
      sprite(`${tileType}-tileset`, { anim: "ml" }),
      area(),
      body({ isStatic: true }),
      offscreen(),
    ],
    4: () => [sprite(`${tileType}-tileset`, { anim: "mm" }), offscreen()],
    5: () => [
      sprite(`${tileType}-tileset`, { anim: "mr" }),
      area(),
      body({ isStatic: true }),
      offscreen(),
    ],

    // Bottom row - decorative only
    6: () => [sprite(`${tileType}-tileset`, { anim: "ml-2" }), offscreen()],
    7: () => [sprite(`${tileType}-tileset`, { anim: "mm-2" }), offscreen()],
    8: () => [sprite(`${tileType}-tileset`, { anim: "mr-2" }), offscreen()],

    // One-way platform top row - can jump through from below
    9: () => [
      sprite(`${tileType}-oneway-tileset`, { anim: "tl" }),
      area({ shape: new Rect(vec2(0), 16, 3) }),
      "passthrough",
      body({ isStatic: true }),
      offscreen(),
    ],
    a: () => [
      sprite(`${tileType}-oneway-tileset`, { anim: "tm" }),
      area({ shape: new Rect(vec2(0), 16, 3) }),
      "passthrough",
      body({ isStatic: true }),
      offscreen(),
    ],
    b: () => [
      sprite(`${tileType}-oneway-tileset`, { anim: "tr" }),
      area({ shape: new Rect(vec2(0), 16, 3) }),
      "passthrough",
      body({ isStatic: true }),
      offscreen(),
    ],

    // One-way platform bottom - decorative only
    c: () => [
      sprite(`${tileType}-oneway-tileset`, { anim: "ml" }),
      offscreen(),
    ],
    d: () => [
      sprite(`${tileType}-oneway-tileset`, { anim: "mm" }),
      offscreen(),
    ],
    e: () => [
      sprite(`${tileType}-oneway-tileset`, { anim: "mr" }),
      offscreen(),
    ],

    // Special tiles
    o: () => [sprite("bridge"), area(), body({ isStatic: true }), offscreen()],
    "@": () => [sprite("coin"), area(), "coin", offscreen()],
  }
}
