import type { AudioPlay, AudioPlayOpt } from "kaboom"

class SoundManager {
  soundMap: Record<string, AudioPlay> = {}

  addSound(key: string, options?: AudioPlayOpt): void {
    this.soundMap[key] = play(key, options)
  }

  play(key: string): void {
    this.soundMap[key].seek(0)
    this.soundMap[key].paused = false
  }

  pause(key: string): void {
    this.soundMap[key].paused = true
    this.soundMap[key].seek(0)
  }

  pauseAllSounds(): void {
    for (const key in this.soundMap) {
      this.soundMap[key].paused = true
      this.soundMap[key].seek(0)
    }
  }
}

export const soundManager = new SoundManager()
