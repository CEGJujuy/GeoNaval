export class UIManager {
  constructor(gameController, soundManager) {
    this.gameController = gameController
    this.soundManager = soundManager
    this.currentModal = null
    this.isAnimating = false
  }

  render() {
    const app = document.getElementById('app')
    app.innerHTML = this.getHTML()
    this.bindEvents()
    this.updateUI()
    this.adjustLayout()
  }

  getHTML() {
    return `
      <header class="header">
        <h1>🌍 GeoNaval</h1>
        <p>Descubre países del mundo en esta batalla naval educativa</p>
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
          <div class="controls-grid">
            <div class="control-section">
              <div class="control-label">Dificultad</div>
              <div class="button-group">
                <button class="btn difficulty-btn active" data-difficulty="easy">Fácil</button>
                <button class="btn difficulty-btn" data-difficulty="medium">Medio</button>
                <button class="btn difficulty-btn" data-difficulty="hard">Difícil</button>
              </div>
            </div>
            
            <div class="control-section">
              <div class="control-label">Continente</div>
              <div class="button-group">
                <button class="btn continent-btn active" data-continent="all">Todos</button>
                <button class="btn continent-btn" data-continent="america">América</button>
                <button class="btn continent-btn" data-continent="europe">Europa</button>
                <button class="btn continent-btn" data-continent="asia">Asia</button>
                <button class="btn continent-btn" data-continent="africa">África</button>
                <button class="btn continent-btn" data-continent="oceania">Oceanía</button>
              </div>
            </div>
            
            <div class="control-section">
              <button class="btn btn-primary" id="new-game-btn">
                ${this.gameController.gameStarted ? '🔄 Reiniciar Juego' : '🚀 Comenzar Juego'}
              </button>
            </div>
          </div>
        </div>
        
        <div class="board-container">
          <div class="game-board" id="game-board">
            ${this.generateBoardHTML()}
          </div>
        </div>
      </main>
      
      <button class="fab" id="sound-toggle" title="Alternar sonido">
        🔊
      </button>
    `
  }

  generateBoardHTML() {
    let html = ''
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const cellId = `cell-${row}-${col}`
        html += `<button class="cell" id="${cellId}" data-row="${row}" data-col="${col}" aria-label="Casilla ${row + 1}, ${col + 1}"></button>`
      }
    }
    return html
  }

  bindEvents() {
    // Cell clicks with touch support
    document.querySelectorAll('.cell').forEach(cell => {
      cell.addEventListener('click', (e) => {
        e.preventDefault()
        if (this.isAnimating) return
        
        const row = parseInt(e.target.dataset.row)
        const col = parseInt(e.target.dataset.col)
        this.handleCellClick(row, col)
      })
      
      // Prevent double-tap zoom on mobile
      cell.addEventListener('touchend', (e) => {
        e.preventDefault()
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

    // Sound toggle
    document.getElementById('sound-toggle').addEventListener('click', () => {
      const enabled = this.soundManager.toggle()
      document.getElementById('sound-toggle').textContent = enabled ? '🔊' : '🔇'
    })

    // Keyboard support
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.currentModal) {
        this.closeModal()
      }
    })

    // Make UIManager globally accessible for modal callbacks
    window.uiManager = this
  }

  async handleCellClick(row, col) {
    if (this.isAnimating) return
    
    const cell = document.getElementById(`cell-${row}-${col}`)
    if (!cell || cell.classList.contains('hit') || cell.classList.contains('miss')) return

    this.isAnimating = true
    
    // Add loading state
    cell.classList.add('loading')
    
    try {
      const result = await this.gameController.attackCell(row, col)
      
      if (!result) {
        this.isAnimating = false
        cell.classList.remove('loading')
        return
      }

      if (result.type === 'hit') {
        this.showQuestion(result.question, row, col)
      } else {
        this.updateCellDisplay(row, col, 'miss')
        this.updateUI()
        setTimeout(() => {
          this.isAnimating = false
        }, 500)
      }
    } catch (error) {
      console.error('Error handling cell click:', error)
      this.isAnimating = false
      cell.classList.remove('loading')
    }
  }

  showQuestion(question, row, col) {
    const questionModal = this.createModal(`
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
    questionModal.querySelectorAll('.answer-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const answerIndex = parseInt(e.target.dataset.answer)
        this.handleAnswer(answerIndex, question.correct, row, col, question)
      })
    })
  }

  handleAnswer(answerIndex, correctIndex, row, col, question) {
    const answerBtns = this.currentModal.querySelectorAll('.answer-btn')
    const isCorrect = answerIndex === correctIndex
    
    // Disable all buttons and show feedback
    answerBtns.forEach((btn, index) => {
      btn.disabled = true
      btn.style.pointerEvents = 'none'
      
      if (index === correctIndex) {
        btn.classList.add('correct')
      } else if (index === answerIndex && !isCorrect) {
        btn.classList.add('incorrect')
      }
    })

    // Play sound and update game state
    if (isCorrect) {
      this.soundManager.playHit()
      this.gameController.storageManager.incrementScore()
    } else {
      this.soundManager.playMiss()
      this.gameController.storageManager.incrementErrors()
    }

    // Wait for feedback, then close modal and update display
    setTimeout(() => {
      this.closeModal()
      
      if (isCorrect) {
        this.updateCellDisplay(row, col, 'hit')
      } else {
        this.updateCellDisplay(row, col, 'miss')
        // Mark as hit in game logic even if answer was wrong
        this.gameController.board[row][col].hit = true
      }
      
      this.updateUI()
      this.gameController.checkGameOver()
      
      if (this.gameController.gameOver) {
        setTimeout(() => {
          this.showGameOver()
        }, 800)
      }
      
      this.isAnimating = false
    }, 2500)
  }

  updateCellDisplay(row, col, type) {
    const cell = document.getElementById(`cell-${row}-${col}`)
    if (!cell) return

    cell.classList.remove('loading')
    cell.classList.add(type)
    
    if (type === 'hit') {
      const country = this.gameController.board[row][col].country
      cell.textContent = country.country.substring(0, 3).toUpperCase()
      cell.setAttribute('title', `${country.country} - ${country.capital}`)
    } else {
      cell.textContent = '💧'
      cell.setAttribute('title', 'Agua - No hay país aquí')
    }
    
    // Add bounce animation
    setTimeout(() => {
      cell.style.animation = 'hit-pulse 0.6s ease'
    }, 100)
  }

  setDifficulty(difficulty) {
    this.gameController.setDifficulty(difficulty)
    
    // Update UI
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.difficulty === difficulty)
    })
    
    // Add visual feedback
    this.showToast(`Dificultad cambiada a: ${this.getDifficultyLabel(difficulty)}`)
  }

  setContinent(continent) {
    this.gameController.setContinent(continent)
    
    // Update UI
    document.querySelectorAll('.continent-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.continent === continent)
    })
    
    // Add visual feedback
    this.showToast(`Continente seleccionado: ${this.getContinentLabel(continent)}`)
  }

  getDifficultyLabel(difficulty) {
    const labels = {
      easy: 'Fácil',
      medium: 'Medio',
      hard: 'Difícil'
    }
    return labels[difficulty] || difficulty
  }

  getContinentLabel(continent) {
    const labels = {
      all: 'Todos',
      america: 'América',
      europe: 'Europa',
      asia: 'Asia',
      africa: 'África',
      oceania: 'Oceanía'
    }
    return labels[continent] || continent
  }

  startNewGame() {
    // Add loading state
    const newGameBtn = document.getElementById('new-game-btn')
    newGameBtn.classList.add('loading')
    newGameBtn.textContent = 'Preparando...'
    
    setTimeout(() => {
      this.gameController.newGame()
      this.gameController.initializeGame()
      this.updateBoardDisplay()
      this.updateUI()
      
      newGameBtn.classList.remove('loading')
      newGameBtn.textContent = '🔄 Reiniciar Juego'
      
      this.showToast('¡Nuevo juego iniciado! Encuentra todos los países.')
    }, 1000)
  }

  updateUI() {
    const stats = this.gameController.getStats()
    
    // Animate stat updates
    this.animateStatUpdate('hits', stats.hits)
    this.animateStatUpdate('misses', stats.misses)
    this.animateStatUpdate('accuracy', `${stats.accuracy}%`)
    this.animateStatUpdate('ships-remaining', stats.shipsRemaining)
    
    // Update button states
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.difficulty === this.gameController.currentDifficulty)
    })
    
    document.querySelectorAll('.continent-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.continent === this.gameController.currentContinent)
    })

    this.updateBoardDisplay()
  }

  animateStatUpdate(elementId, newValue) {
    const element = document.getElementById(elementId)
    if (!element) return
    
    const currentValue = element.textContent
    if (currentValue !== newValue.toString()) {
      element.style.transform = 'scale(1.2)'
      element.style.color = 'var(--primary-blue)'
      
      setTimeout(() => {
        element.textContent = newValue
        element.style.transform = 'scale(1)'
        element.style.color = ''
      }, 150)
    }
  }

  updateBoardDisplay() {
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const cell = document.getElementById(`cell-${row}-${col}`)
        const boardCell = this.gameController.board[row][col]
        
        if (cell) {
          // Reset cell classes
          cell.className = 'cell'
          cell.textContent = ''
          cell.removeAttribute('title')
          
          if (boardCell && boardCell.hit) {
            if (boardCell.type === 'ship') {
              cell.classList.add('hit')
              cell.textContent = boardCell.country.country.substring(0, 3).toUpperCase()
              cell.setAttribute('title', `${boardCell.country.country} - ${boardCell.country.capital}`)
            } else if (boardCell.type === 'miss') {
              cell.classList.add('miss')
              cell.textContent = '💧'
              cell.setAttribute('title', 'Agua - No hay país aquí')
            }
          }
        }
      }
    }
  }

  showGameOver() {
    const stats = this.gameController.getStats()
    const totalGames = this.gameController.storageManager.getTotalGames()
    const bestAccuracy = this.gameController.storageManager.getBestAccuracy()
    
    this.createModal(`
      <div class="game-over-modal">
        <h2 class="game-over-title">¡Misión Completada! 🎉</h2>
        <p style="font-size: 1.1rem; color: var(--neutral-600); margin-bottom: var(--spacing-lg);">
          Has descubierto todos los países del mapa
        </p>
        
        <div class="final-stats">
          <div class="final-stat">
            <span>🎯 Aciertos:</span>
            <span>${stats.hits}</span>
          </div>
          <div class="final-stat">
            <span>❌ Fallos:</span>
            <span>${stats.misses}</span>
          </div>
          <div class="final-stat">
            <span>📊 Precisión:</span>
            <span>${stats.accuracy}%</span>
          </div>
          <div class="final-stat">
            <span>🏆 Puntuación total:</span>
            <span>${stats.totalScore}</span>
          </div>
          <div class="final-stat">
            <span>🎮 Partidas jugadas:</span>
            <span>${totalGames}</span>
          </div>
          <div class="final-stat">
            <span>⭐ Mejor precisión:</span>
            <span>${Math.round(bestAccuracy)}%</span>
          </div>
        </div>
        
        <button class="btn btn-primary" onclick="window.uiManager.startNewGame(); window.uiManager.closeModal();" style="width: 100%; margin-top: var(--spacing-md);">
          🚀 Nueva Aventura
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
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden'
    
    return overlay.querySelector('.modal')
  }

  closeModal() {
    if (this.currentModal) {
      this.currentModal.style.animation = 'modal-fade-in 0.2s ease reverse'
      setTimeout(() => {
        if (this.currentModal) {
          this.currentModal.remove()
          this.currentModal = null
          document.body.style.overflow = ''
        }
      }, 200)
    }
  }

  showToast(message) {
    // Remove existing toast
    const existingToast = document.querySelector('.toast')
    if (existingToast) {
      existingToast.remove()
    }
    
    const toast = document.createElement('div')
    toast.className = 'toast'
    toast.textContent = message
    toast.style.cssText = `
      position: fixed;
      top: 100px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: var(--spacing-md) var(--spacing-lg);
      border-radius: var(--border-radius-lg);
      font-weight: 600;
      z-index: 1001;
      animation: toast-slide-down 0.3s ease;
      backdrop-filter: blur(10px);
      max-width: 90vw;
      text-align: center;
    `
    
    document.body.appendChild(toast)
    
    setTimeout(() => {
      toast.style.animation = 'toast-slide-down 0.3s ease reverse'
      setTimeout(() => toast.remove(), 300)
    }, 2500)
  }

  adjustLayout() {
    // Handle responsive adjustments
    const gameBoard = document.getElementById('game-board')
    if (gameBoard) {
      const containerWidth = window.innerWidth
      const maxSize = Math.min(containerWidth * 0.9, 500)
      gameBoard.style.maxWidth = `${maxSize}px`
    }
    
    // Adjust controls layout on very small screens
    const controls = document.querySelector('.game-controls')
    if (controls && window.innerWidth < 480) {
      controls.style.padding = 'var(--spacing-md)'
    }
  }
}

// Add toast animation styles
const style = document.createElement('style')
style.textContent = `
  @keyframes toast-slide-down {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }
`
document.head.appendChild(style)