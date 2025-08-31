import { GEOGRAPHY_DATA, BONUS_QUESTIONS } from '../data/geography.js'
import { StorageManager } from '../utils/StorageManager.js'

export class GameController {
  constructor(soundManager) {
    this.soundManager = soundManager
    this.storageManager = new StorageManager()
    
    this.board = Array(10).fill().map(() => Array(10).fill(null))
    this.ships = []
    this.hits = 0
    this.misses = 0
    this.totalShips = 15
    this.currentDifficulty = 'easy'
    this.currentContinent = 'all'
    this.gameStarted = false
    this.gameOver = false
    
    this.loadGameState()
  }

  initializeGame() {
    this.resetBoard()
    this.placeShips()
    this.gameStarted = true
    this.gameOver = false
    this.hits = 0
    this.misses = 0
    this.saveGameState()
  }

  resetBoard() {
    this.board = Array(10).fill().map(() => Array(10).fill(null))
    this.ships = []
  }

  placeShips() {
    const availableCountries = this.getFilteredCountries()
    const shuffled = [...availableCountries].sort(() => Math.random() - 0.5)
    
    for (let i = 0; i < this.totalShips && i < shuffled.length; i++) {
      let placed = false
      let attempts = 0
      
      while (!placed && attempts < 100) {
        const row = Math.floor(Math.random() * 10)
        const col = Math.floor(Math.random() * 10)
        
        if (!this.board[row][col]) {
          this.board[row][col] = {
            type: 'ship',
            country: shuffled[i],
            hit: false
          }
          this.ships.push({ row, col, country: shuffled[i] })
          placed = true
        }
        attempts++
      }
    }
  }

  getFilteredCountries() {
    let countries = []
    
    if (this.currentContinent === 'all') {
      countries = Object.values(GEOGRAPHY_DATA).flat()
    } else {
      countries = GEOGRAPHY_DATA[this.currentContinent] || []
    }
    
    return countries.filter(country => 
      this.currentDifficulty === 'all' || country.difficulty === this.currentDifficulty
    )
  }

  async attackCell(row, col) {
    if (!this.gameStarted || this.gameOver) return null
    if (this.board[row][col] && this.board[row][col].hit) return null

    const cell = this.board[row][col]
    
    if (cell && cell.type === 'ship') {
      // Hit!
      cell.hit = true
      this.hits++
      
      // Generate question
      const question = this.generateQuestion(cell.country)
      return {
        type: 'hit',
        question: question,
        country: cell.country
      }
    } else {
      // Miss
      this.board[row][col] = { type: 'miss', hit: true }
      this.misses++
      this.soundManager.playMiss()
      
      this.checkGameOver()
      this.saveGameState()
      
      return { type: 'miss' }
    }
  }

  generateQuestion(country) {
    const questionType = Math.random() < 0.7 ? 'capital' : 'bonus'
    
    if (questionType === 'capital') {
      return this.generateCapitalQuestion(country)
    } else {
      return this.generateBonusQuestion()
    }
  }

  generateCapitalQuestion(country) {
    const correctAnswer = country.capital
    const allCountries = Object.values(GEOGRAPHY_DATA).flat()
    const wrongAnswers = allCountries
      .filter(c => c.capital !== correctAnswer)
      .map(c => c.capital)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
    
    const options = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5)
    const correctIndex = options.indexOf(correctAnswer)
    
    return {
      question: `¿Cuál es la capital de ${country.country}?`,
      options: options,
      correct: correctIndex,
      type: 'capital',
      country: country
    }
  }

  generateBonusQuestion() {
    const questions = BONUS_QUESTIONS[this.currentDifficulty] || BONUS_QUESTIONS.easy
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)]
    
    return {
      ...randomQuestion,
      type: 'bonus'
    }
  }

  answerQuestion(questionIndex, country) {
    const isCorrect = questionIndex === 0 // Assuming correct answer is always first for simplicity
    
    if (isCorrect) {
      this.soundManager.playHit()
      this.storageManager.incrementScore()
    } else {
      this.soundManager.playMiss()
      this.storageManager.incrementErrors()
    }
    
    this.checkGameOver()
    this.saveGameState()
    
    return isCorrect
  }

  checkGameOver() {
    const allShipsHit = this.ships.every(ship => 
      this.board[ship.row][ship.col].hit
    )
    
    if (allShipsHit) {
      this.gameOver = true
      this.soundManager.playVictory()
      this.storageManager.saveGame({
        hits: this.hits,
        misses: this.misses,
        difficulty: this.currentDifficulty,
        continent: this.currentContinent,
        completed: true
      })
    }
  }

  setDifficulty(difficulty) {
    this.currentDifficulty = difficulty
    this.saveGameState()
  }

  setContinent(continent) {
    this.currentContinent = continent
    this.saveGameState()
  }

  getStats() {
    return {
      hits: this.hits,
      misses: this.misses,
      accuracy: this.hits + this.misses > 0 ? Math.round((this.hits / (this.hits + this.misses)) * 100) : 0,
      shipsRemaining: this.ships.filter(ship => !this.board[ship.row][ship.col].hit).length,
      totalScore: this.storageManager.getScore(),
      totalErrors: this.storageManager.getErrors()
    }
  }

  saveGameState() {
    const gameState = {
      board: this.board,
      ships: this.ships,
      hits: this.hits,
      misses: this.misses,
      difficulty: this.currentDifficulty,
      continent: this.currentContinent,
      gameStarted: this.gameStarted,
      gameOver: this.gameOver
    }
    
    this.storageManager.saveGameState(gameState)
  }

  loadGameState() {
    const savedState = this.storageManager.loadGameState()
    
    if (savedState) {
      this.board = savedState.board || this.board
      this.ships = savedState.ships || this.ships
      this.hits = savedState.hits || 0
      this.misses = savedState.misses || 0
      this.currentDifficulty = savedState.difficulty || 'easy'
      this.currentContinent = savedState.continent || 'all'
      this.gameStarted = savedState.gameStarted || false
      this.gameOver = savedState.gameOver || false
    }
  }

  newGame() {
    this.resetBoard()
    this.gameStarted = false
    this.gameOver = false
    this.hits = 0
    this.misses = 0
    this.storageManager.clearGameState()
  }
}