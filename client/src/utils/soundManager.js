class SoundManager {
  constructor() {
    this.sounds = {};
    this.enabled = true;
    this.volume = 0.5;
  }

  load(name, src) {
    const audio = new Audio(src);
    audio.preload = "auto";
    audio.volume = this.volume;
    this.sounds[name] = audio;
  }

  play(name) {
    if (!this.enabled) return;

    const sound = this.sounds[name];
    if (!sound) return;

    // clone for overlapping clicks (important!)
    const clone = sound.cloneNode();
    clone.volume = this.volume;
    clone.play().catch(() => {});
  }

  setVolume(value) {
    this.volume = value;
  }

  toggle() {
    this.enabled = !this.enabled;
  }
}

export const soundManager = new SoundManager();
