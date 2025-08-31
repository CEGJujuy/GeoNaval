export class StorageManager {
  constructor() {
    this.GAME_STATE_KEY = 'geonaval_game_state'
    this.SCORE_KEY = 'geonaval_score'
    this.ERRORS_KEY = 'geonaval_errors'
    this.GAMES_KEY = 'geonaval_total_games'
  }

  saveGameState(gameState) {
    try {
      localStorage.setItem(this.GAME_STATE_KEY, JSON.stringify(gameState))
    } catch (error) {
      console.warn('Could not save game state:', error)
    }
  }

  loadGameState() {
    try {
      const saved = localStorage.getItem(this.GAME_STATE_KEY)
      return saved ? JSON.parse(saved) : null
    } catch (error) {
      console.warn('Could not load game state:', error)
      return null
    }
  }

  clearGameState() {
    try {
      localStorage.removeItem(this.GAME_STATE_KEY)
    } catch (error) {
      console.warn('Could not clear game state:', error)
    }
  }

  incrementScore() {
    const currentScore = this.getScore()
    this.setScore(currentScore + 1)
  }

  getScore() {
    try {
      return parseInt(localStorage.getItem(this.SCORE_KEY) || '0')
    } catch (error) {
      return 0
    }
  }

  setScore(score) {
    try {
      localStorage.setItem(this.SCORE_KEY, score.toString())
    } catch (error) {
      console.warn('Could not save score:', error)
    }
  }

  incrementErrors() {
    const currentErrors = this.getErrors()
    this.setErrors(currentErrors + 1)
  }

  getErrors() {
    try {
      return parseInt(localStorage.getItem(this.ERRORS_KEY) || '0')
    } catch (error) {
      return 0
    }
  }

  setErrors(errors) {
    try {
      localStorage.setItem(this.ERRORS_KEY, errors.toString())
    } catch (error) {
      console.warn('Could not save errors:', error)
    }
  }

  saveGame(gameData) {
    this.incrementTotalGames()
    
    // Save best accuracy
    const bestAccuracy = this.getBestAccuracy()
    const currentAccuracy = gameData.hits / (gameData.hits + gameData.misses) * 100
    
    if (currentAccuracy > bestAccuracy) {
      this.setBestAccuracy(currentAccuracy)
    }
  }

  incrementTotalGames() {
    const total = this.getTotalGames()
    try {
      localStorage.setItem(this.GAMES_KEY, (total + 1).toString())
    } catch (error) {
      console.warn('Could not save total games:', error)
    }
  }

  getTotalGames() {
    try {
      return parseInt(localStorage.getItem(this.GAMES_KEY) || '0')
    } catch (error) {
      return 0
    }
  }

  getBestAccuracy() {
    try {
      return parseFloat(localStorage.getItem('geonaval_best_accuracy') || '0')
    } catch (error) {
      return 0
    }
  }

  setBestAccuracy(accuracy) {
    try {
      localStorage.setItem('geonaval_best_accuracy', accuracy.toString())
    } catch (error) {
      console.warn('Could not save best accuracy:', error)
    }
  }

  resetAllData() {
    try {
      const keys = [
        this.GAME_STATE_KEY,
        this.SCORE_KEY,
        this.ERRORS_KEY,
        this.GAMES_KEY,
        'geonaval_best_accuracy'
      ]
      
      keys.forEach(key => localStorage.removeItem(key))
    } catch (error) {
      console.warn('Could not reset data:', error)
    }
  }
}