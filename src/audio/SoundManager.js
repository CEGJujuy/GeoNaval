export class SoundManager {
  constructor() {
    this.enabled = true
    this.audioContext = null
    this.initAudioContext()
  }

  initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
    } catch (error) {
      console.warn('Audio not supported:', error)
      this.enabled = false
    }
  }

  async playHit() {
    if (!this.enabled) return
    
    try {
      await this.audioContext.resume()
      this.playTone(800, 0.2, 'sine')
      setTimeout(() => this.playTone(1000, 0.2, 'sine'), 100)
    } catch (error) {
      console.warn('Could not play hit sound:', error)
    }
  }

  async playMiss() {
    if (!this.enabled) return
    
    try {
      await this.audioContext.resume()
      this.playTone(300, 0.3, 'sawtooth')
    } catch (error) {
      console.warn('Could not play miss sound:', error)
    }
  }

  async playVictory() {
    if (!this.enabled) return
    
    try {
      await this.audioContext.resume()
      const notes = [523, 659, 784, 1047] // C, E, G, C
      notes.forEach((freq, index) => {
        setTimeout(() => this.playTone(freq, 0.3, 'sine'), index * 150)
      })
    } catch (error) {
      console.warn('Could not play victory sound:', error)
    }
  }

  playTone(frequency, duration, type = 'sine') {
    if (!this.audioContext) return

    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)
    
    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime)
    oscillator.type = type
    
    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration)
    
    oscillator.start(this.audioContext.currentTime)
    oscillator.stop(this.audioContext.currentTime + duration)
  }

  toggle() {
    this.enabled = !this.enabled
    return this.enabled
  }
}