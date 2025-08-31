import './style.css'
import { GameController } from './game/GameController.js'
import { UIManager } from './ui/UIManager.js'
import { SoundManager } from './audio/SoundManager.js'

class GeoNaval {
  constructor() {
    this.soundManager = new SoundManager()
    this.gameController = new GameController(this.soundManager)
    this.uiManager = new UIManager(this.gameController, this.soundManager)
    
    this.init()
  }

  init() {
    this.uiManager.render()
    this.setupEventListeners()
  }

  setupEventListeners() {
    // Responsive design adjustments
    window.addEventListener('resize', () => {
      this.uiManager.adjustLayout()
    })

    // Prevent context menu on mobile
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault()
    })
  }
}

// Initialize the game
new GeoNaval()