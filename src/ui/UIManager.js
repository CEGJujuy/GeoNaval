export class UIManager {
  constructor(gameController, soundManager) {
    this.gameController = gameController
    this.soundManager = soundManager
    this.currentModal = null
  }

  render() {
    const app = document.getElementById('app')
    app.innerHTML = this.getHTML()
    this.bindEvents()
    this.updateUI()
  }

  getHTML() {
    return `
      <header class="header">
        <h1>🌍 GeoNaval</h1>
        <p>Batalla Naval Educativa - Aprende geografía mientras juegas</p>
      </header>
      
      <main class="game-container">
        <div class="game-stats">
          <div class="stat-card">
            <span class="stat-value" id="hits">0</span>
            <div class="stat-label">Aciertos</div>
          </div>
          <div class="stat-card">
            <span class="stat-value" id="misses">0</span>
            <div class="stat-label">Fallos</div>
          </div>
          <div class="stat-card">
            <span class="stat-value" id="accuracy">0%</span>
            <div class="stat-label">Precisión</div>
          </div>
          <div class="stat-card">
            <span class="stat-value" id="ships-remaining">15</span>
            <div class="stat-label">Países restantes</div>
          </div>
        </div>
        
        <div class="game-controls">
          <div class="difficulty-selector">
            <label>Dificultad:</label>
            <button class="btn difficulty-btn active" data-difficulty="easy">Fácil</button>
            <button class="btn difficulty-btn" data-difficulty="medium">Medio</button>
            <button class="btn difficulty-btn" data-difficulty="hard">Difícil</button>
          </div>
          
          <div class="continent-selector">
            <label>Continente:</label>
            <button class="btn continent-btn active" data-continent="all">Todos</button>
            <button class="btn continent-btn" data-continent="america">América</button>
            <button class="btn continent-btn" data-continent="europe">Europa</button>
            <button class="btn continent-btn" data-continent="asia">Asia</button>
            <button class="btn continent-btn" data-continent="africa">África</button>
            <button class="btn continent-btn" data-continent="oceania">Oceanía</button>
          </div>
          
          <button class="btn btn-primary" id="new-game-btn">Nuevo Juego</button>
        </div>
        
        <div class="game-board" id="game-board">
          ${this.generateBoardHTML()}
        </div>
      </main>
    `
  }

  generateBoardHTML() {
    let html = ''
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const cellId = `cell-${row}-${col}`
        html += `<button class="cell" id="${cellId}" data-row="${row}" data-col="${col}"></button>`
      }
    }
    return html
  }

  bindEvents() {
    // Cell clicks
    document.querySelectorAll('.cell').forEach(cell => {
      cell.addEventListener('click', (e) => {
        const row = parseInt(e.target.dataset.row)
        const col = parseInt(e.target.dataset.col)
        this.handleCellClick(row, col)
      })
    })

    // Difficulty buttons
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const difficulty = e.target.dataset.difficulty
        this.setDifficulty(difficulty)
      })
    })

    // Continent buttons
    document.querySelectorAll('.continent-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const continent = e.target.dataset.continent
        this.setContinent(continent)
      })
    })

    // New game button
    document.getElementById('new-game-btn').addEventListener('click', () => {
      this.startNewGame()
    })
  }

  async handleCellClick(row, col) {
    const result = await this.gameController.attackCell(row, col)
    
    if (!result) return

    if (result.type === 'hit') {
      this.showQuestion(result.question, row, col)
    } else {
      this.updateCellDisplay(row, col, 'miss')
      this.updateUI()
    }
  }

  showQuestion(question, row, col) {
    this.currentModal = this.createModal(`
      <div class="question-modal">
        <h3 class="question-text">${question.question}</h3>
        <div class="answer-options">
          ${question.options.map((option, index) => 
            `<button class="answer-btn" data-answer="${index}">${option}</button>`
          ).join('')}
        </div>
      </div>
    `)

    // Bind answer events
    this.currentModal.querySelectorAll('.answer-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const answerIndex = parseInt(e.target.dataset.answer)
        this.handleAnswer(answerIndex, question.correct, row, col, question)
      })
    })
  }

  handleAnswer(answerIndex, correctIndex, row, col, question) {
    const isCorrect = answerIndex === correctIndex
    const answerBtns = this.currentModal.querySelectorAll('.answer-btn')
    
    // Show correct/incorrect feedback
    answerBtns.forEach((btn, index) => {
      btn.disabled = true
      if (index === correctIndex) {
        btn.classList.add('correct')
      } else if (index === answerIndex && !isCorrect) {
        btn.classList.add('incorrect')
      }
    })

    // Wait for feedback, then close modal
    setTimeout(() => {
      this.closeModal()
      
      if (isCorrect) {
        this.updateCellDisplay(row, col, 'hit')
        this.gameController.storageManager.incrementScore()
      } else {
        this.updateCellDisplay(row, col, 'miss')
        this.gameController.storageManager.incrementErrors()
        // Still mark as hit in game logic but show as miss visually
        this.gameController.board[row][col].hit = true
      }
      
      this.updateUI()
      this.gameController.checkGameOver()
      
      if (this.gameController.gameOver) {
        setTimeout(() => this.showGameOver(), 500)
      }
    }, 2000)
  }

  updateCellDisplay(row, col, type) {
    const cell = document.getElementById(`cell-${row}-${col}`)
    if (cell) {
      cell.classList.add(type)
      cell.classList.add('bounce')
      
      if (type === 'hit') {
        const country = this.gameController.board[row][col].country
        cell.textContent = country.country.substring(0, 3).toUpperCase()
      } else {
        cell.textContent = '💧'
      }
      
      setTimeout(() => cell.classList.remove('bounce'), 600)
    }
  }

  setDifficulty(difficulty) {
    this.gameController.setDifficulty(difficulty)
    
    // Update UI
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.difficulty === difficulty)
    })
  }

  setContinent(continent) {
    this.gameController.setContinent(continent)
    
    // Update UI
    document.querySelectorAll('.continent-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.continent === continent)
    })
  }

  startNewGame() {
    this.gameController.newGame()
    this.gameController.initializeGame()
    this.render()
  }

  updateUI() {
    const stats = this.gameController.getStats()
    
    document.getElementById('hits').textContent = stats.hits
    document.getElementById('misses').textContent = stats.misses
    document.getElementById('accuracy').textContent = `${stats.accuracy}%`
    document.getElementById('ships-remaining').textContent = stats.shipsRemaining
    
    // Update difficulty buttons
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.difficulty === this.gameController.currentDifficulty)
    })
    
    // Update continent buttons
    document.querySelectorAll('.continent-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.continent === this.gameController.currentContinent)
    })
  }

  showGameOver() {
    const stats = this.gameController.getStats()
    const totalGames = this.gameController.storageManager.getTotalGames()
    
    this.createModal(`
      <div class="game-over-modal">
        <h2 class="game-over-title">¡Felicitaciones! 🎉</h2>
        <p>Has completado el juego de GeoNaval</p>
        
        <div class="final-stats">
          <div class="final-stat">
            <span>Aciertos:</span>
            <span>${stats.hits}</span>
          </div>
          <div class="final-stat">
            <span>Fallos:</span>
            <span>${stats.misses}</span>
          </div>
          <div class="final-stat">
            <span>Precisión:</span>
            <span>${stats.accuracy}%</span>
          </div>
          <div class="final-stat">
            <span>Puntuación total:</span>
            <span>${stats.totalScore}</span>
          </div>
          <div class="final-stat">
            <span>Partidas jugadas:</span>
            <span>${totalGames}</span>
          </div>
        </div>
        
        <button class="btn btn-primary" onclick="window.uiManager.startNewGame()">
          Jugar de nuevo
        </button>
      </div>
    `)
  }

  createModal(content) {
    // Remove existing modal
    this.closeModal()
    
    const overlay = document.createElement('div')
    overlay.className = 'modal-overlay'
    overlay.innerHTML = `<div class="modal">${content}</div>`
    
    document.body.appendChild(overlay)
    this.currentModal = overlay
    
    // Close on overlay click
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        this.closeModal()
      }
    })
    
    return overlay.querySelector('.modal')
  }

  closeModal() {
    if (this.currentModal) {
      this.currentModal.remove()
      this.currentModal = null
    }
  }

  adjustLayout() {
    // Handle responsive adjustments if needed
    const gameBoard = document.getElementById('game-board')
    if (gameBoard) {
      const containerWidth = gameBoard.parentElement.clientWidth
      const maxSize = Math.min(containerWidth - 32, 600)
      gameBoard.style.maxWidth = `${maxSize}px`
    }
  }
}