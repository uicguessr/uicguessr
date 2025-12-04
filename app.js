// UICguessr Game Logic

class UICGuessrGame {
    constructor() {
        this.currentRound = 0;
        this.score = 0;
        this.attemptsRemaining = 2;
        this.currentQuestion = null;
        this.selectedAnswer = null;
        this.lastGuess = null;
        this.roundResults = [];
        this.difficulty = 'easy';
        this.gameStarted = false;
        this.focusFilters = ['academic', 'recreation', 'services', 'dining'];
        this.mode = 'classic';
        this.endless = false;
        this.attemptsPerQuestion = gameSettings.attemptsPerQuestion;
        
        // Timer properties
        this.timer = null;
        this.timeRemaining = 0;
        this.timerEnabled = true;
        this.timePerQuestion = 60; // seconds
        this.hintTimeoutId = null;
        this.currentBlurLevel = 0;
        
        // Question pool per game session
        this.activeQuestionPool = [];
        this.activeQuestionIndex = 0;
        
        // Hint properties
        this.hintsUsed = 0;
        this.hintAvailable = true;
        this.currentHints = [];
        
        // Bonus tracking
        this.streak = 0;
        this.maxStreak = 0;
        this.timeBonus = 0;
        this.perfectRounds = 0;
        
        // Achievements
        this.achievements = {};
        
        // Navigation state
        this.navWatchId = null;
        this.navFromCoords = null;
        this.navDestKey = null;
        
        // Persona & Learning features
        this.selectedPersona = null;
        this.selectedMajorDeck = null;
        this.totalRounds = 5; // Configurable: 5, 10, or 15
        
        // Cross-session learning analytics
        this.learningData = {
            buildingAttempts: {},   // buildingKey -> { attempts: N, correct: N, lastSeen: Date }
            sessionHistory: [],      // Array of past sessions
            weakBuildings: [],       // Buildings player struggles with
            masteredBuildings: []    // Buildings player knows well
        };
        
        this.loadSettings();
        this.loadAchievements();
        this.loadLearningData();
        this.init();
    }

    init() {
        console.log('UICguessr initialized');
        // Show welcome screen by default
        this.showScreen('welcome');
        this.updateSettingsDisplay();
        this.setupKeyboardShortcuts();
        this.loadStats();
    }
    
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Only handle shortcuts on question screen
            const questionScreen = document.getElementById('question-screen');
            if (!questionScreen || !questionScreen.classList.contains('active')) return;
            
            // Enter key to submit answer
            if (e.key === 'Enter') {
                const submitBtn = document.getElementById('submit-answer-btn');
                if (submitBtn && !submitBtn.disabled) {
                    submitBtn.click();
                }
            }
            
            // Number keys 1-4 to select options
            if (['1', '2', '3', '4'].includes(e.key)) {
                const optionIndex = parseInt(e.key) - 1;
                const options = document.querySelectorAll('.answer-option');
                if (options[optionIndex]) {
                    const input = options[optionIndex].querySelector('input');
                    if (input) {
                        this.selectAnswer(input.value);
                    }
                }
            }
            
            // H key for hint
            if (e.key === 'h' || e.key === 'H') {
                const hintBtn = document.getElementById('hint-btn');
                if (hintBtn && !hintBtn.disabled) {
                    hintBtn.click();
                }
            }
        });
    }
    
    updateSettingsDisplay() {
        const container = document.getElementById('current-settings-display');
        if (!container) return;
        
        const difficultyEmoji = {
            'easy': '🟢',
            'medium': '🟡',
            'hard': '🔴'
        };
        
        const badges = [];
        
        // Difficulty badge
        badges.push(`<div class="settings-badge">
            <span class="settings-badge-icon">${difficultyEmoji[this.difficulty]}</span>
            <span>${this.difficulty.charAt(0).toUpperCase() + this.difficulty.slice(1)}</span>
        </div>`);
        
        // Mode badge
        const modeIcon = this.mode === 'zen' ? '🧘' : this.mode === 'sprint' ? '⚡' : this.mode === 'hardcore' ? '💀' : this.mode === 'endless' ? '♾️' : '🎮';
        badges.push(`<div class="settings-badge">
            <span class="settings-badge-icon">${modeIcon}</span>
            <span>${this.mode.charAt(0).toUpperCase() + this.mode.slice(1)} Mode</span>
        </div>`);
        
        // Focus areas count
        const focusCount = this.focusFilters.length;
        badges.push(`<div class="settings-badge">
            <span class="settings-badge-icon">🎯</span>
            <span>${focusCount} Focus Area${focusCount !== 1 ? 's' : ''}</span>
        </div>`);
        
        // Rounds badge
        const rounds = this.totalRounds || 5;
        badges.push(`<div class="settings-badge">
            <span class="settings-badge-icon">🔢</span>
            <span>${rounds} Rounds</span>
        </div>`);
        
        // Persona badge
        if (this.selectedPersona && typeof personaDefinitions !== 'undefined' && personaDefinitions[this.selectedPersona]) {
            const persona = personaDefinitions[this.selectedPersona];
            badges.push(`<div class="settings-badge">
                <span class="settings-badge-icon">${persona.icon}</span>
                <span>${persona.name}</span>
            </div>`);
        }
        
        // Major deck badge
        if (this.selectedMajorDeck && typeof majorDecks !== 'undefined' && majorDecks[this.selectedMajorDeck]) {
            const deck = majorDecks[this.selectedMajorDeck];
            badges.push(`<div class="settings-badge">
                <span class="settings-badge-icon">${deck.icon}</span>
                <span>${deck.name}</span>
            </div>`);
        }
        
        // Timer status
        if (this.timerEnabled) {
            badges.push(`<div class="settings-badge">
                <span class="settings-badge-icon">⏱️</span>
                <span>Timer On</span>
            </div>`);
        }
        
        // Sound status
        if (gameSettings.soundEnabled) {
            badges.push(`<div class="settings-badge">
                <span class="settings-badge-icon">🔊</span>
                <span>Sound On</span>
            </div>`);
        }
        
        container.innerHTML = badges.join('');
    }
    
    loadStats() {
        const statsStr = localStorage.getItem('uicguessr_stats');
        if (statsStr) {
            this.stats = JSON.parse(statsStr);
        } else {
            this.stats = {
                gamesPlayed: 0,
                bestScore: 0,
                totalScore: 0,
                perfectGames: 0
            };
        }
    }
    
    saveStats() {
        localStorage.setItem('uicguessr_stats', JSON.stringify(this.stats));
    }

    // Screen Management
    showScreen(screenId) {
        // Stop ticking mechanisms when leaving the question flow
        if (screenId !== 'question') {
            this.stopTimer();
            this.clearHintTimeout();
        }
		// Stop navigation tracking when leaving navigation screen
		if (screenId !== 'navigation') {
			this.stopLocationWatch();
		}
        // Hide all screens
        const screens = document.querySelectorAll('.screen');
        screens.forEach(screen => screen.classList.remove('active'));
        
        // Show requested screen
        const targetScreen = document.getElementById(`${screenId}-screen`);
        if (targetScreen) {
            targetScreen.classList.add('active');
            
            // Scroll to top
            window.scrollTo(0, 0);
            
            // Handle screen-specific initialization
            if (screenId === 'resources') {
                this.populateAllResources();
                // Wire filters
                const search = document.getElementById('resource-search-input');
                const clearBtn = document.getElementById('resource-clear-filters');
                if (search) {
                    search.oninput = () => this.populateAllResources();
                }
                if (clearBtn) {
                    clearBtn.onclick = () => {
                        document.querySelectorAll('.resource-filter-checkbox').forEach(cb => cb.checked = true);
                        if (search) search.value = '';
                        this.populateAllResources();
                    };
                }
                document.querySelectorAll('.resource-filter-checkbox').forEach(cb => {
                    cb.onchange = () => this.populateAllResources();
                });
            } else if (screenId === 'campus-map-overview') {
                this.showCampusMapOverviewContent();
            } else if (screenId === 'navigation') {
                this.initNavigationScreen();
                this.renderNavigationIfReady();
            } else if (screenId === 'high-scores') {
                this.populateHighScoresScreen();
            } else if (screenId === 'options') {
                // Reflect current settings to the options UI
                const difficultyInput = document.querySelector(`input[name="difficulty"][value="${this.difficulty}"]`);
                if (difficultyInput) difficultyInput.checked = true;
                
                const modeInput = document.querySelector(`input[name="mode"][value="${this.mode}"]`);
                if (modeInput) modeInput.checked = true;
                
                const soundInput = document.querySelector('input[name="settings"][value="sound"]');
                if (soundInput) soundInput.checked = !!gameSettings.soundEnabled;
                
                const hintsInput = document.querySelector('input[name="settings"][value="hints"]');
                if (hintsInput) hintsInput.checked = !!gameSettings.hintsEnabled;
                
                const timerInput = document.querySelector('input[name="settings"][value="timer"]');
                if (timerInput) timerInput.checked = !!this.timerEnabled;
                
                document.querySelectorAll('input[name="focus"]').forEach(cb => {
                    cb.checked = this.focusFilters.includes(cb.value);
                });
                
                // Round count
                const roundInput = document.querySelector(`input[name="rounds"][value="${this.totalRounds}"]`);
                if (roundInput) roundInput.checked = true;
            } else if (screenId === 'achievements') {
                this.populateAchievementsScreen();
            } else if (screenId === 'persona-select') {
                this.initPersonaScreen();
            } else if (screenId === 'major-deck-select') {
                this.initMajorDeckScreen();
            } else if (screenId === 'learning-insights') {
                this.initLearningInsightsScreen();
            }
        }
    }

    // Game Flow
    startGame() {
        this.currentRound = 0;
        this.score = 0;
        this.roundResults = [];
        this.gameStarted = true;
        this.activeQuestionIndex = 0;
        this.streak = 0;
        this.maxStreak = 0;
        this.perfectRounds = 0;
        
        // Use persona or major deck building pools if selected
        if (this.selectedPersona || this.selectedMajorDeck) {
            this.buildPersonaQuestionPool();
        } else {
            this.buildActiveQuestionPool();
        }
        
        this.loadNextQuestion();
    }

    buildActiveQuestionPool() {
        // Try to use extended question pool if available
        let questions = [];
        
        if (typeof extendedQuestionPool !== 'undefined' && extendedQuestionPool.length > 0) {
            // Filter by difficulty
            const difficultyQuestions = extendedQuestionPool.filter(q => 
                q.difficulty === this.difficulty || this.difficulty === 'easy'
            );
            
            // Generate full question objects
            difficultyQuestions.forEach(q => {
                if (!buildings[q.building] || !buildings[q.building].photo) return;
                
                // Get random distractors
                const allBuildings = Object.keys(buildings).filter(k => 
                    k !== q.building && buildings[k].photo
                );
                const distractors = this.shuffleArray(allBuildings).slice(0, 3);
                
                if (distractors.length >= 3) {
                    questions.push({
                        building: q.building,
                        correctAnswer: q.building,
                        options: this.shuffleArray([q.building, ...distractors]),
                        difficulty: q.difficulty,
                        hint: q.hint
                    });
                }
            });
        }
        
        // Fallback to original questionSets
        if (questions.length < 5) {
            questions = questionSets[this.difficulty] || questionSets.easy || [];
        }
        
        // Filter by focus categories if possible
        const filtered = questions.filter(q => {
            const b = buildings[q.building];
            if (!b || !Array.isArray(b.categories)) return true;
            return b.categories.some(cat => this.focusFilters.includes(cat));
        });
        
        // Fallback to original if filter removes everything
        const pool = filtered.length > 0 ? filtered.slice() : questions.slice();
        this.activeQuestionPool = this.shuffleArray(pool);
    }

    loadNextQuestion() {
        this.currentRound++;
        
        // Use this.totalRounds instead of gameSettings.totalRounds
        const maxRounds = this.totalRounds || gameSettings.totalRounds;
        
        if (!this.endless && this.currentRound > maxRounds) {
            this.showGameComplete();
            return;
        }

        // Reset attempts and hints
        this.attemptsRemaining = this.attemptsPerQuestion;
        this.selectedAnswer = null;
        this.lastGuess = null;
        this.hintAvailable = true;
        this.currentHints = [];
        this.clearHintTimeout();
        
        // Pull from active question pool
        if (!this.activeQuestionPool || this.activeQuestionPool.length === 0) {
            this.buildActiveQuestionPool();
        }
        const questionIndex = this.activeQuestionIndex % this.activeQuestionPool.length;
        this.currentQuestion = this.activeQuestionPool[questionIndex];
        this.activeQuestionIndex++;
        
        // Generate contextual hints
        this.generateHints();
        
        // Load question screen
        this.displayQuestion();
        this.showScreen('question');
        
        // Start timer
        if (this.timerEnabled) {
            this.startTimer();
        }
        
        // Play new round sound
        if (soundManager) soundManager.playNewRound();
    }

    // Timer Management
    startTimer() {
        this.stopTimer(); // Clear any existing timer
        this.timeRemaining = this.timePerQuestion;
        this.updateTimerDisplay();
        
        this.timer = setInterval(() => {
            this.timeRemaining--;
            this.updateTimerDisplay();
            
            // Play tick sounds
            if (this.timeRemaining <= 10 && this.timeRemaining > 0) {
                if (soundManager) soundManager.playWarning();
            } else if (this.timeRemaining === 30) {
                if (soundManager) soundManager.playTick();
            }
            
            // Time's up!
            if (this.timeRemaining <= 0) {
                this.stopTimer();
                this.timeExpired();
            }
        }, 1000);
    }

    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    updateTimerDisplay() {
        const timerElement = document.getElementById('timer-display');
        if (!this.timerEnabled) {
            if (timerElement) {
                timerElement.style.visibility = 'hidden';
            }
            return;
        }
        if (timerElement) {
            timerElement.style.visibility = 'visible';
        }
        const minutes = Math.floor(this.timeRemaining / 60);
        const seconds = this.timeRemaining % 60;
        const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        if (timerElement) {
            timerElement.textContent = `⏱ ${timeString}`;
            
            // Change color when time is running out
            if (this.timeRemaining <= 10) {
                timerElement.style.color = '#D32F2F';
                timerElement.style.fontWeight = 'bold';
            } else if (this.timeRemaining <= 30) {
                timerElement.style.color = '#FF9800';
            } else {
                timerElement.style.color = '#FFFFFF';
                timerElement.style.fontWeight = '600';
            }
        }
    }

    clearHintTimeout() {
        if (this.hintTimeoutId) {
            clearTimeout(this.hintTimeoutId);
            this.hintTimeoutId = null;
        }
    }

    timeExpired() {
        if (soundManager) soundManager.playError();
        
        // Treat as incorrect answer
        this.attemptsRemaining = 0;
        
        // Store result
        this.roundResults.push({
            round: this.currentRound,
            building: this.currentQuestion.building,
            correct: false,
            points: 0,
            attempts: 2,
            timeExpired: true
        });
        
        // Reset streak
        this.streak = 0;
        
        // Show time's up message
        document.getElementById('incorrect-title').textContent = "Time's Up!";
        document.getElementById('incorrect-subtitle').textContent = "Let's see the correct answer";
        document.getElementById('try-again-btn').style.display = 'none';
        document.getElementById('show-answer-btn').style.display = 'block';
        
        this.updateProgressOnFeedback('incorrect');
        this.showScreen('incorrect');
    }

    // Hint System
    generateHints() {
        const building = buildings[this.currentQuestion.building];
        this.currentHints = [
            `🏛️ <strong>Architecture:</strong> ${building.features[1] || 'Look at the building style'}`,
            `📍 <strong>Location Clue:</strong> ${building.landmarks[0] || 'Consider nearby buildings'}`,
            `🔤 <strong>Abbreviation:</strong> The building code is "${building.abbreviation}"`,
            `💡 <strong>Main Feature:</strong> ${building.features[0] || building.tips}`
        ];
    }

    showProgressiveHint() {
        if (!this.hintAvailable || this.hintsUsed >= this.currentHints.length) {
            alert('No more hints available for this question!');
            return;
        }
        
        const hintText = this.currentHints[this.hintsUsed];
        this.hintsUsed++;
        
        // Display hint
        const hintContainer = document.getElementById('hint-container');
        if (hintContainer) {
            const hintDiv = document.createElement('div');
            hintDiv.className = 'hint-message';
            hintDiv.innerHTML = `💡 Hint ${this.hintsUsed}: ${hintText}`;
            hintContainer.appendChild(hintDiv);
            
            // Animate in
            setTimeout(() => hintDiv.classList.add('show'), 10);
        }
        
        // Play hint sound
        if (soundManager) soundManager.playHint();
        
        // Update hint button
        const hintBtn = document.getElementById('hint-btn');
        if (hintBtn && this.hintsUsed >= this.currentHints.length) {
            hintBtn.disabled = true;
            hintBtn.textContent = 'No More Hints';
        }
    }

    displayQuestion() {
        // Update question number and score
        document.getElementById('question-number').textContent = this.currentRound;
        document.getElementById('current-score').textContent = this.score;
        const totalRoundsEl = document.getElementById('total-rounds');
        const maxRounds = this.totalRounds || gameSettings.totalRounds;
        if (totalRoundsEl) {
            totalRoundsEl.textContent = this.endless ? '∞' : String(maxRounds);
        }
        
        // Clear hint container
        const hintContainer = document.getElementById('hint-container');
        if (hintContainer) {
            hintContainer.innerHTML = '';
        }
        
        // Reset hint button
        const hintBtn = document.getElementById('hint-btn');
        if (hintBtn) {
            hintBtn.disabled = false;
            hintBtn.textContent = '💡 Get Hint';
        }
        
        // Reset hints used
        this.hintsUsed = 0;
        this.currentBlurLevel = 3;
        
        // Update photo
        const building = buildings[this.currentQuestion.building];
        const photoEl = document.getElementById('question-photo');
        if (photoEl) {
            photoEl.src = building.photo;
            photoEl.alt = `Photo of ${building.name}`;
            photoEl.classList.remove('blur-level-0','blur-level-1','blur-level-2','blur-level-3');
            photoEl.classList.add('blur-level-3');
        }
        this.setPhotoCredit('question-photo-credit', building);
        
        // Update answer options
        const optionsContainer = document.getElementById('answer-options');
        optionsContainer.innerHTML = '';
        
        // Shuffle options for variety
        const shuffledOptions = this.shuffleArray(this.currentQuestion.options.slice());
        shuffledOptions.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'answer-option';
            optionDiv.onclick = () => this.selectAnswer(option);
            
            const buildingInfo = buildings[option];
            optionDiv.innerHTML = `
                <input type="radio" name="answer" value="${option}" id="option-${index}">
                <label for="option-${index}">${buildingInfo.name}</label>
            `;
            
            optionsContainer.appendChild(optionDiv);
        });
        
        // Update attempts and points
        this.updateQuestionInfo();
        
        // Update progress
        this.updateProgress();
        
        // Disable submit button initially
        document.getElementById('submit-answer-btn').disabled = true;

        // Auto-hint if enabled and no selection after delay
        this.clearHintTimeout();
        if (gameSettings.hintsEnabled) {
            this.hintTimeoutId = setTimeout(() => {
                // Only show if still on question screen and nothing selected
                const questionScreen = document.getElementById('question-screen');
                if (questionScreen && questionScreen.classList.contains('active') && !this.selectedAnswer) {
                    this.showProgressiveHint();
                }
            }, 15000);
        }
    }

    submitAnswer() {
        if (!this.selectedAnswer) return;
        
        const isCorrect = this.selectedAnswer === this.currentQuestion.correctAnswer;
        this.lastGuess = this.selectedAnswer;
        
        // Stop timer
        this.stopTimer();
        this.clearHintTimeout();
        
        // Animate feedback
        const options = document.querySelectorAll('.answer-option');
        options.forEach(option => {
            const input = option.querySelector('input');
            if (input.value === this.selectedAnswer) {
                if (isCorrect) {
                    option.classList.add('correct');
                    if (soundManager) soundManager.playSuccess();
                    setTimeout(() => this.showCorrectFeedback(), 500);
                } else {
                    option.classList.add('incorrect');
                    if (soundManager) soundManager.playError();
                    this.attemptsRemaining--;
                    setTimeout(() => this.showIncorrectFeedback(), 500);
                }
            }
        });
    }

    selectAnswer(answer) {
        this.selectedAnswer = answer;
        
        // Play click sound
        if (soundManager) soundManager.playClick();
        this.clearHintTimeout();
        
        // Update visual selection
        const options = document.querySelectorAll('.answer-option');
        options.forEach(option => {
            option.classList.remove('selected');
            if (option.querySelector('input').value === answer) {
                option.classList.add('selected');
                option.querySelector('input').checked = true;
            }
        });
        
        // Enable submit button
        document.getElementById('submit-answer-btn').disabled = false;
    }

    showCorrectFeedback() {
        let points = this.attemptsRemaining === 2 ? gameSettings.pointsFirstTry : gameSettings.pointsSecondTry;
        
        // Calculate bonuses
        let bonusPoints = 0;
        let bonusReasons = [];
        
        // Time bonus (if answered quickly)
        if (this.timerEnabled && this.timeRemaining > 45) {
            const timeBonus = Math.floor((this.timeRemaining - 45) * 2);
            bonusPoints += timeBonus;
            bonusReasons.push(`⚡ Speed Bonus: +${timeBonus} (${this.timeRemaining}s remaining)`);
            this.unlockAchievement('sprinter');
        }
        
        // Streak bonus
        if (this.attemptsRemaining === 2) {
            this.streak++;
            if (this.streak > this.maxStreak) this.maxStreak = this.streak;
            
            if (this.streak >= 3) {
                const streakBonus = this.streak * 10;
                bonusPoints += streakBonus;
                bonusReasons.push(`🔥 ${this.streak}x Streak Bonus: +${streakBonus}`);
                this.unlockAchievement('streak_3');
            }
            
            this.perfectRounds++;
        } else {
            this.streak = 0; // Reset streak on second attempt
        }
        
        // Perfect round (first try + no hints used)
        if (this.attemptsRemaining === 2 && this.hintsUsed === 0) {
            bonusPoints += 25;
            bonusReasons.push(`💎 Perfect Round (No Hints): +25`);
            this.unlockAchievement('no_hints_round');
        }
        
        const totalPoints = points + bonusPoints;
        this.score += totalPoints;
        
        // Play points sound
        if (soundManager) soundManager.playPoints(points);
        
        // Store round result
        this.roundResults.push({
            round: this.currentRound,
            building: this.currentQuestion.building,
            correct: true,
            points: points,
            bonusPoints: bonusPoints,
            totalPoints: totalPoints,
            attempts: 3 - this.attemptsRemaining,
            timeRemaining: this.timeRemaining,
            hintsUsed: this.hintsUsed,
            streak: this.streak
        });
        // First correct achievement
        if (this.roundResults.filter(r => r.correct).length === 1) {
            this.unlockAchievement('first_correct');
        }
        
        // Record learning data
        this.recordBuildingAttempt(this.currentQuestion.building, true, 3 - this.attemptsRemaining);
        
        // Update correct screen
        const building = buildings[this.currentQuestion.building];
        document.getElementById('correct-points').textContent = points;
        document.getElementById('correct-building-name').textContent = building.name;
        document.getElementById('correct-building-description').textContent = building.description;
        
        // Show bonus if any
        const bonusContainer = document.getElementById('bonus-display');
        if (bonusContainer && bonusPoints > 0) {
            bonusContainer.innerHTML = bonusReasons.map(reason => 
                `<div class="bonus-item">${reason}</div>`
            ).join('');
            bonusContainer.innerHTML += `<div class="bonus-total">Total Earned: ${totalPoints} points</div>`;
            bonusContainer.style.display = 'block';
        } else if (bonusContainer) {
            bonusContainer.style.display = 'none';
        }
        
        // Populate enhanced resources with floor/location details
        const resourcesContainer = document.getElementById('correct-resources');
        if (resourcesContainer) {
            this.populateEnhancedResources('correct-resources', this.currentQuestion.building);
            
            // Fallback to basic resources if no enhanced data
            if (resourcesContainer.children.length === 0 && building.resources) {
                building.resources.forEach(resource => {
                    const card = document.createElement('div');
                    card.className = 'resource-card';
                    const linkHtml = resource.url 
                        ? `<a href="${resource.url}" target="_blank" rel="noopener noreferrer" class="resource-link" aria-label="Open ${resource.name} official page">Learn more →</a>`
                        : '';
                    card.innerHTML = `
                        <h5>${resource.name}</h5>
                        <p>${resource.description}</p>
                        ${linkHtml}
                    `;
                    resourcesContainer.appendChild(card);
                });
            }
        }
        
        // Update progress
        this.updateProgressOnFeedback('correct');
        
        // Show screen
        this.showScreen('correct');
    }

    showIncorrectFeedback() {
        if (this.attemptsRemaining > 0) {
            // Still has attempts remaining
            document.getElementById('incorrect-title').textContent = "Not quite right...";
            document.getElementById('incorrect-subtitle').textContent = `You have ${this.attemptsRemaining} attempt remaining`;
            document.getElementById('try-again-btn').style.display = 'block';
            document.getElementById('show-answer-btn').style.display = 'none';
        } else {
            // No attempts remaining
            document.getElementById('incorrect-title').textContent = "Out of attempts";
            document.getElementById('incorrect-subtitle').textContent = "Let's learn the correct answer";
            document.getElementById('try-again-btn').style.display = 'none';
            document.getElementById('show-answer-btn').style.display = 'block';
            
            // Store round result
            this.roundResults.push({
                round: this.currentRound,
                building: this.currentQuestion.building,
                correct: false,
                points: 0,
                attempts: 2
            });
            
            // Record learning data (incorrect)
            this.recordBuildingAttempt(this.currentQuestion.building, false, 2);
            
            // Reset streak
            this.streak = 0;
        }
        
        // Update progress
        this.updateProgressOnFeedback('incorrect');
        
        // Show screen
        this.showScreen('incorrect');
    }

    tryAgain() {
        // Reload question with reduced attempts
        this.displayQuestion();
        this.showScreen('question');
        if (this.timerEnabled) {
            this.startTimer();
        }
    }

    showAnswerReveal() {
        const building = buildings[this.currentQuestion.correctAnswer];
        
        document.getElementById('reveal-building-name').textContent = building.name;
        document.getElementById('reveal-photo').src = building.photo;
        document.getElementById('reveal-explanation').textContent = building.description;
        this.setPhotoCredit('reveal-photo-credit', building);
        
        // Populate features
        const featuresList = document.getElementById('reveal-features');
        featuresList.innerHTML = '';
        building.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresList.appendChild(li);
        });
        
        // Compare guessed vs correct if user had a last guess different from correct
        const compareSection = document.getElementById('reveal-compare');
        if (this.lastGuess && this.lastGuess !== this.currentQuestion.correctAnswer && compareSection) {
            const guessed = buildings[this.lastGuess];
            const correct = building;
            const guessCard = document.getElementById('compare-guess-card');
            const correctCard = document.getElementById('compare-correct-card');
            const distanceCard = document.getElementById('reveal-distance');
            if (guessCard && correctCard && distanceCard) {
                guessCard.innerHTML = `<strong>Your Guess</strong><br>${guessed.name}<br><span style="color:#757575;">${guessed.address}</span>`;
                correctCard.innerHTML = `<strong>Correct</strong><br>${correct.name}<br><span style="color:#757575;">${correct.address}</span>`;
                const { meters, minutes, bearing } = this.getDistanceAndBearing(guessed.coordinates, correct.coordinates);
                distanceCard.textContent = `Distance: ${(meters/1000).toFixed(2)} km • ~${minutes} min walk • Head ${bearing}`;
                compareSection.style.display = 'block';
            }
        } else if (compareSection) {
            compareSection.style.display = 'none';
        }
        
        this.showScreen('answer-reveal');
    }

    showMap() {
        const building = buildings[this.currentQuestion.correctAnswer];
        
        // Update map info
        document.getElementById('map-location-name').textContent = building.name;
        document.getElementById('map-address').textContent = building.address;
        const mapBuildingLabel = document.getElementById('map-building-label');
        if (mapBuildingLabel) {
            mapBuildingLabel.textContent = building.abbreviation;
        }
        
        // External links: Google Maps + Official page (if any)
        const gmapsBtn = document.getElementById('open-google-maps');
        if (gmapsBtn && building.coordinates && typeof building.coordinates.lat === 'number' && typeof building.coordinates.lng === 'number') {
            const lat = building.coordinates.lat;
            const lng = building.coordinates.lng;
            gmapsBtn.href = `https://www.google.com/maps?q=${lat},${lng}`;
            gmapsBtn.style.display = 'inline-block';
        } else if (gmapsBtn) {
            gmapsBtn.style.display = 'none';
        }
        const officialBtn = document.getElementById('open-official-page');
        if (officialBtn) {
            if (building.officialUrl) {
                officialBtn.href = building.officialUrl;
                officialBtn.style.display = 'inline-block';
            } else {
                officialBtn.style.display = 'none';
            }
        }
		// Show navigate button
		const navBtn = document.getElementById('navigate-from-here');
		if (navBtn) {
			navBtn.style.display = 'inline-block';
		}
        this.unlockAchievement('map_lover');
        
        // Render enhanced interactive map
        if (typeof campusMap !== 'undefined') {
            campusMap.renderMap('campus-map', this.currentQuestion.correctAnswer);
        }
        
        // Populate landmarks
        const landmarksContainer = document.getElementById('map-landmarks');
        landmarksContainer.innerHTML = '';
        building.landmarks.forEach(landmark => {
            const div = document.createElement('div');
            div.className = 'landmark-item';
            div.textContent = landmark;
            landmarksContainer.appendChild(div);
        });
        
        // Play sound
        if (soundManager) soundManager.playClick();
        
        this.showScreen('map');
    }

    continueToNextRound() {
        const maxRounds = this.totalRounds || gameSettings.totalRounds;
        if (this.currentRound < maxRounds) {
            this.loadNextQuestion();
        } else {
            this.showGameComplete();
        }
    }

    showGameComplete() {
        // Stop any running timer
        this.stopTimer();
        
        const maxRounds = this.totalRounds || gameSettings.totalRounds;
        
        // Update global stats
        this.stats.gamesPlayed++;
        this.stats.totalScore += this.score;
        if (this.score > this.stats.bestScore) {
            this.stats.bestScore = this.score;
        }
        if (this.score === maxRounds * gameSettings.pointsFirstTry) {
            this.stats.perfectGames++;
            this.unlockAchievement('perfect_game');
        }
        this.saveStats();
        
        // Record session for learning analytics
        this.recordSessionResult();
        
        // Play game complete sound
        if (soundManager) soundManager.playGameComplete();
        
        // Calculate stats
        const firstTryCorrect = this.roundResults.filter(r => r.correct && r.attempts === 1).length;
        const secondTryCorrect = this.roundResults.filter(r => r.correct && r.attempts === 2).length;
        const missed = this.roundResults.filter(r => !r.correct).length;
        const totalBonus = this.roundResults.reduce((sum, r) => sum + (r.bonusPoints || 0), 0);
        if (this.mode === 'hardcore' && firstTryCorrect >= 4) {
            this.unlockAchievement('hardcore_clear');
        }
        
        // Update final score
        document.getElementById('final-score').textContent = this.score;
        
        // Update max score display
        const maxScoreEl = document.querySelector('.score-max');
        if (maxScoreEl) {
            maxScoreEl.textContent = `/ ${maxRounds * gameSettings.pointsFirstTry}`;
        }
        
        // Populate score table with bonuses
        const tableBody = document.getElementById('score-table-body');
        tableBody.innerHTML = '';
        this.roundResults.forEach((result, index) => {
            const building = buildings[result.building];
            const row = document.createElement('tr');
            const bonusDisplay = result.bonusPoints ? ` (+${result.bonusPoints} bonus)` : '';
            row.innerHTML = `
                <td>Round ${index + 1}</td>
                <td>${building.name}</td>
                <td style="color: ${result.totalPoints >= 100 ? '#4CAF50' : result.totalPoints >= 50 ? '#FF9800' : '#D32F2F'}; font-weight: bold;">
                    ${result.totalPoints || result.points}${bonusDisplay}
                </td>
            `;
            tableBody.appendChild(row);
        });
        
        // Update stats
        document.getElementById('stat-first-try').textContent = firstTryCorrect;
        document.getElementById('stat-second-try').textContent = secondTryCorrect;
        document.getElementById('stat-missed').textContent = missed;
        
        // Add new stats if elements exist
        const maxStreakElement = document.getElementById('stat-max-streak');
        if (maxStreakElement) {
            maxStreakElement.textContent = this.maxStreak;
        }
        
        const totalBonusElement = document.getElementById('stat-total-bonus');
        if (totalBonusElement) {
            totalBonusElement.textContent = totalBonus;
        }
        
        const perfectRoundsElement = document.getElementById('stat-perfect-rounds');
        if (perfectRoundsElement) {
            perfectRoundsElement.textContent = this.perfectRounds;
        }
        
        // Performance message with streak
        const percentage = (this.score / (maxRounds * gameSettings.pointsFirstTry)) * 100;
        let message = '';
        if (percentage >= 200) {
            message = '👑 LEGENDARY! Perfect score with amazing bonuses!';
        } else if (percentage >= 150) {
            message = '🌟 Outstanding! You\'re a UIC campus expert with impressive bonuses!';
        } else if (percentage === 100) {
            message = '🎯 Perfect Score! You know UIC campus like the back of your hand!';
        } else if (percentage >= 80) {
            message = '🎉 Excellent! You have a great understanding of UIC campus!';
        } else if (percentage >= 60) {
            message = '👍 Good job! Keep exploring to learn even more!';
        } else if (percentage >= 40) {
            message = '📚 Not bad! Play again to improve your campus knowledge!';
        } else {
            message = '🎮 Keep practicing! You\'ll master the campus in no time!';
        }
        
        if (this.maxStreak >= 3) {
            message += ` 🔥 Max streak: ${this.maxStreak}!`;
        }
        
        document.getElementById('score-message').textContent = message;
		
		// Update high scores
		if (!this.stats) this.loadStats();
		if (!Array.isArray(this.stats.highScores)) this.stats.highScores = [];
		this.stats.highScores.push({
			score: this.score,
			difficulty: this.difficulty,
			mode: this.mode,
			timestamp: Date.now()
		});
		this.stats.highScores.sort((a, b) => b.score - a.score);
		this.stats.highScores = this.stats.highScores.slice(0, 10);
		this.saveStats();

        this.showScreen('score');
    }

    playAgain() {
        this.startGame();
    }

	// Navigation
	showNavigation() {
		this.navDestKey = null;
		this.showScreen('navigation');
	}
	navigateToBuilding(buildingKey) {
		this.navDestKey = buildingKey;
		this.showScreen('navigation');
	}
	navigateToCurrent() {
		if (this.currentQuestion && this.currentQuestion.correctAnswer) {
			this.navigateToBuilding(this.currentQuestion.correctAnswer);
		} else {
			this.showNavigation();
		}
	}
	initNavigationScreen() {
		// Populate destination select
		const select = document.getElementById('nav-destination-select');
		if (select) {
			const options = Object.keys(buildings)
				.map(key => ({ key, name: buildings[key]?.name || key }))
				.sort((a, b) => a.name.localeCompare(b.name));
			select.innerHTML = options.map(opt => `<option value="${opt.key}">${opt.name}</option>`).join('');
			if (this.navDestKey) {
				select.value = this.navDestKey;
			}
			select.onchange = () => {
				this.navDestKey = select.value;
				this.renderNavigationIfReady();
			};
		}
		// Wire location buttons
		const useBtn = document.getElementById('nav-use-location');
		const stopBtn = document.getElementById('nav-stop-tracking');
		if (useBtn) {
			useBtn.onclick = () => this.useCurrentLocation();
		}
		if (stopBtn) {
			stopBtn.onclick = () => this.stopLocationWatch();
		}
	}
	useCurrentLocation() {
		if (!navigator.geolocation) {
			alert('Geolocation is not supported by your browser.');
			return;
		}
		// One-shot
		navigator.geolocation.getCurrentPosition(
			pos => {
				this.navFromCoords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
				this.renderNavigationIfReady();
			},
			err => {
				console.warn('Geolocation error', err);
				alert('Unable to access your location. Please allow permission and try again.');
			},
			{ enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
		);
		// Watch for updates
		this.startLocationWatch();
	}
	startLocationWatch() {
		if (!navigator.geolocation || this.navWatchId) return;
		this.navWatchId = navigator.geolocation.watchPosition(
			pos => {
				this.navFromCoords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
				this.renderNavigationIfReady();
			},
			err => {
				console.warn('watchPosition error', err);
			},
			{ enableHighAccuracy: true, maximumAge: 5000, timeout: 15000 }
		);
		const stopBtn = document.getElementById('nav-stop-tracking');
		if (stopBtn) stopBtn.style.display = 'inline-block';
	}
	stopLocationWatch() {
		if (this.navWatchId && navigator.geolocation) {
			navigator.geolocation.clearWatch(this.navWatchId);
			this.navWatchId = null;
		}
		const stopBtn = document.getElementById('nav-stop-tracking');
		if (stopBtn) stopBtn.style.display = 'none';
	}
	renderNavigationIfReady() {
		const select = document.getElementById('nav-destination-select');
		if (!this.navDestKey && select && select.value) {
			this.navDestKey = select.value;
		}
		if (!this.navDestKey) return;
		const dest = buildings[this.navDestKey];
		if (!dest || !dest.coordinates) return;
		// Render map overlay with route
		if (typeof campusMap !== 'undefined') {
			campusMap.renderNavigation('navigation-map', this.navFromCoords, this.navDestKey, true);
		}
		// Directions and Google Maps link
		const directionsEl = document.getElementById('nav-directions');
		const gmapsBtn = document.getElementById('nav-open-gmaps');
		if (this.navFromCoords) {
			const { meters, minutes, bearing } = this.getDistanceAndBearing(this.navFromCoords, dest.coordinates);
			if (directionsEl) {
				directionsEl.innerHTML = `
					<p><strong>To:</strong> ${dest.name}</p>
					<p><strong>Distance:</strong> ${(meters/1000).toFixed(2)} km</p>
					<p><strong>Estimated walk:</strong> ~${minutes} min</p>
					<p><strong>Direction:</strong> Head ${bearing}</p>
				`;
			}
			if (gmapsBtn) {
				const o = `${this.navFromCoords.lat},${this.navFromCoords.lng}`;
				const d = `${dest.coordinates.lat},${dest.coordinates.lng}`;
				gmapsBtn.href = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(o)}&destination=${encodeURIComponent(d)}&travelmode=walking`;
				gmapsBtn.style.display = 'inline-block';
			}
		} else {
			if (directionsEl) {
				directionsEl.innerHTML = `<p>Click "Use My Location" to get walking directions to ${dest.name}.</p>`;
			}
			if (gmapsBtn) gmapsBtn.style.display = 'none';
		}
	}

	// High Scores
	showHighScores() {
		this.showScreen('high-scores');
	}
	populateHighScoresScreen() {
		if (!this.stats) this.loadStats();
		if (!Array.isArray(this.stats.highScores)) {
			this.stats.highScores = [];
		}
		const tbody = document.getElementById('high-scores-table-body');
		if (!tbody) return;
		tbody.innerHTML = '';
		const rows = this.stats.highScores
			.slice(0, 10)
			.map((entry, idx) => {
				const date = new Date(entry.timestamp || Date.now());
				const dateStr = date.toLocaleString();
				return `
					<tr>
						<td>${idx + 1}</td>
						<td>${entry.score}</td>
						<td>${entry.difficulty || '-'}</td>
						<td>${entry.mode || '-'}</td>
						<td>${dateStr}</td>
					</tr>
				`;
			}).join('');
		tbody.innerHTML = rows || `<tr><td colspan="5" style="text-align:center;color:#757575;">No scores yet. Play a game!</td></tr>`;
	}
	clearHighScores() {
		if (!confirm('Clear all local high scores?')) return;
		if (!this.stats) this.loadStats();
		this.stats.highScores = [];
		this.saveStats();
		this.populateHighScoresScreen();
	}
    // Hint Modal
    showHint() {
        const building = buildings[this.currentQuestion.building];
        document.getElementById('hint-photo').src = building.photo;
        this.setPhotoCredit('hint-photo-credit', building);
        // Sync blur level on the enlarged image with current hint state
        const hintEl = document.getElementById('hint-photo');
        if (hintEl) {
            hintEl.classList.remove('blur-level-0','blur-level-1','blur-level-2','blur-level-3');
            hintEl.classList.add(`blur-level-${this.currentBlurLevel}`);
        }
        this.showScreen('hint');
    }

    closeHint() {
        this.showScreen('question');
    }

    // Street View Functions
    openStreetView(buildingKey = null) {
        const key = buildingKey || (this.currentQuestion ? this.currentQuestion.correctAnswer : null);
        if (!key || !buildings[key]) {
            console.warn('No building selected for Street View');
            return;
        }
        
        const building = buildings[key];
        const { lat, lng } = building.coordinates;
        
        // Update modal content
        document.getElementById('street-view-building-name').textContent = building.name;
        document.getElementById('street-view-address').textContent = building.address || 'UIC Campus';
        
        // Create Google Maps Street View embed URL
        // Using the embed URL format that works without API key for basic street view
        const streetViewUrl = `https://www.google.com/maps/embed?pb=!4v${Date.now()}!6m8!1m7!1s!2m2!1d${lat}!2d${lng}!3f0!4f0!5f0.7820865974627469`;
        
        // Alternative: Use direct Street View URL with coordinates
        const directStreetViewUrl = `https://www.google.com/maps/@${lat},${lng},3a,75y,90t/data=!3m6!1e1!3m4!1s!2e0!7i16384!8i8192`;
        
        // For external link
        const externalUrl = `https://www.google.com/maps?layer=c&cbll=${lat},${lng}`;
        document.getElementById('street-view-external').href = externalUrl;
        
        // Set iframe source - using a more reliable embed approach
        const iframe = document.getElementById('street-view-iframe');
        // Use Google Maps embed with place query for better reliability
        const embedUrl = `https://www.google.com/maps/embed/v1/streetview?key=&location=${lat},${lng}&heading=0&pitch=0&fov=90`;
        
        // Since we don't have an API key, use the place embed which is more reliable
        const placeEmbedUrl = `https://maps.google.com/maps?q=${lat},${lng}&layer=c&cbll=${lat},${lng}&cbp=12,0,0,0,0&output=svembed`;
        iframe.src = placeEmbedUrl;
        
        // Show the modal
        document.getElementById('street-view-modal').classList.add('active');
    }
    
    closeStreetView() {
        const modal = document.getElementById('street-view-modal');
        modal.classList.remove('active');
        
        // Clear iframe to stop loading
        const iframe = document.getElementById('street-view-iframe');
        iframe.src = '';
    }
    
    showStreetViewExplorer() {
        this.showScreen('street-view-explorer');
        this.populateStreetViewExplorer();
    }
    
    populateStreetViewExplorer() {
        const grid = document.getElementById('street-view-building-grid');
        if (!grid) return;
        
        grid.innerHTML = '';
        
        // Get all buildings sorted by name
        const buildingKeys = Object.keys(buildings).sort((a, b) => 
            buildings[a].name.localeCompare(buildings[b].name)
        );
        
        buildingKeys.forEach(key => {
            const building = buildings[key];
            const card = document.createElement('div');
            card.className = 'street-view-building-card';
            card.onclick = () => this.openStreetViewForBuilding(key);
            
            // Get category icon
            const categoryIcons = {
                'academic': '📚',
                'services': '🎯',
                'recreation': '💪',
                'dining': '🍔',
                'residence': '🏠',
                'events': '🎉'
            };
            const mainCategory = building.categories ? building.categories[0] : 'academic';
            const icon = categoryIcons[mainCategory] || '🏛️';
            
            card.innerHTML = `
                <div class="sv-card-image" style="background-image: url('${building.photo}');">
                    <div class="sv-card-overlay">
                        <span class="sv-card-icon">🌐</span>
                        <span class="sv-card-action">View in 3D</span>
                    </div>
                </div>
                <div class="sv-card-content">
                    <span class="sv-card-category">${icon} ${mainCategory}</span>
                    <h4 class="sv-card-title">${building.abbreviation}</h4>
                    <p class="sv-card-name">${building.fullName || building.name}</p>
                </div>
            `;
            
            grid.appendChild(card);
        });
    }
    
    openStreetViewForBuilding(buildingKey) {
        if (!buildings[buildingKey]) return;
        
        const building = buildings[buildingKey];
        const { lat, lng } = building.coordinates;
        
        // Open directly in Google Maps Street View (external link)
        const streetViewUrl = `https://www.google.com/maps?layer=c&cbll=${lat},${lng}`;
        window.open(streetViewUrl, '_blank');
    }
    
    // Also add quick street view link from map screen
    getStreetViewUrl(buildingKey) {
        if (!buildings[buildingKey]) return null;
        const { lat, lng } = buildings[buildingKey].coordinates;
        return `https://www.google.com/maps?layer=c&cbll=${lat},${lng}`;
    }

    // Progress Updates
    updateProgress() {
        const completedRounds = this.currentRound - 1;
        const maxRounds = this.totalRounds || gameSettings.totalRounds;
        const percentage = this.endless ? 0 : (completedRounds / maxRounds) * 100;
        
        const fill = document.getElementById('progress-fill');
        const text = document.getElementById('progress-text');
        if (this.endless) {
            if (fill) fill.style.width = `0%`;
            if (text) text.textContent = `${completedRounds} rounds completed`;
        } else {
            if (fill) fill.style.width = `${percentage}%`;
            if (text) text.textContent = `${completedRounds} of ${maxRounds} Complete`;
        }
    }

    updateProgressOnFeedback(screenType) {
        const completedRounds = this.currentRound;
        const maxRounds = this.totalRounds || gameSettings.totalRounds;
        const percentage = (completedRounds / maxRounds) * 100;
        
        const fillId = screenType === 'correct' ? 'progress-fill-correct' : 'progress-fill-incorrect';
        const textId = screenType === 'correct' ? 'progress-text-correct' : 'progress-text-incorrect';
        
        document.getElementById(fillId).style.width = `${percentage}%`;
        document.getElementById(textId).textContent = `${completedRounds} of ${gameSettings.totalRounds}`;
    }

    updateQuestionInfo() {
        document.getElementById('attempts-remaining').textContent = `${this.attemptsRemaining}/${this.attemptsPerQuestion}`;
        
        const points = this.attemptsRemaining === 2 ? gameSettings.pointsFirstTry : gameSettings.pointsSecondTry;
        document.getElementById('points-possible').textContent = points;
    }

    // Options/Settings
    saveOptions() {
        // Get difficulty
        const difficultyInputs = document.querySelectorAll('input[name="difficulty"]');
        difficultyInputs.forEach(input => {
            if (input.checked) {
                this.difficulty = input.value;
            }
        });
        
        // Get mode
        const modeInputs = document.querySelectorAll('input[name="mode"]');
        modeInputs.forEach(input => {
            if (input.checked) {
                this.mode = input.value;
            }
        });
        this.applyModeSettings();
        
        // Get sound setting
        const soundInput = document.querySelector('input[name="settings"][value="sound"]');
        gameSettings.soundEnabled = soundInput.checked;
        if (typeof soundManager !== 'undefined') {
            soundManager.setEnabled(gameSettings.soundEnabled);
        }
        
        // Get hints setting
        const hintsInput = document.querySelector('input[name="settings"][value="hints"]');
        gameSettings.hintsEnabled = hintsInput.checked;
        
        // Get timer setting (if present)
        const timerInput = document.querySelector('input[name="settings"][value="timer"]');
        if (timerInput) {
            this.timerEnabled = timerInput.checked;
            this.updateTimerDisplay();
        }
        
        // Get focus filters
        const focusInputs = document.querySelectorAll('input[name="focus"]');
        const selectedFocus = Array.from(focusInputs)
            .filter(i => i.checked)
            .map(i => i.value);
        // Ensure at least one category
        this.focusFilters = selectedFocus.length > 0 ? selectedFocus : ['academic', 'recreation', 'services', 'dining'];
        
        // Get round count
        const roundInputs = document.querySelectorAll('input[name="rounds"]');
        roundInputs.forEach(input => {
            if (input.checked) {
                this.totalRounds = parseInt(input.value, 10);
            }
        });
        
        // Save to localStorage
        localStorage.setItem('uicguessr_difficulty', this.difficulty);
        localStorage.setItem('uicguessr_sound', gameSettings.soundEnabled);
        localStorage.setItem('uicguessr_hints', gameSettings.hintsEnabled);
        localStorage.setItem('uicguessr_timer', this.timerEnabled);
        localStorage.setItem('uicguessr_focus', JSON.stringify(this.focusFilters));
        localStorage.setItem('uicguessr_mode', this.mode);
        localStorage.setItem('uicguessr_round_count', this.totalRounds);
        
        // Update settings display on welcome screen
        this.updateSettingsDisplay();
        
        if (soundManager) soundManager.playSuccess();
        alert('✅ Settings saved successfully!');
        this.showScreen('welcome');
    }

    resetOptions() {
        this.difficulty = 'easy';
        gameSettings.soundEnabled = true;
        gameSettings.hintsEnabled = true;
        this.timerEnabled = true;
        this.focusFilters = ['academic', 'recreation', 'services', 'dining'];
        this.mode = 'classic';
        this.totalRounds = 5;
        this.selectedPersona = null;
        this.selectedMajorDeck = null;
        this.applyModeSettings();
        
        // Update UI
        document.querySelector('input[name="difficulty"][value="easy"]').checked = true;
        document.querySelector('input[name="settings"][value="sound"]').checked = true;
        document.querySelector('input[name="settings"][value="hints"]').checked = true;
        const timerInput = document.querySelector('input[name="settings"][value="timer"]');
        if (timerInput) timerInput.checked = true;
        document.querySelectorAll('input[name="focus"]').forEach(cb => cb.checked = true);
        const modeInput = document.querySelector('input[name="mode"][value="classic"]');
        if (modeInput) modeInput.checked = true;
        const roundInput = document.querySelector('input[name="rounds"][value="5"]');
        if (roundInput) roundInput.checked = true;
        if (typeof soundManager !== 'undefined') {
            soundManager.setEnabled(true);
        }
        
        // Clear localStorage
        localStorage.removeItem('uicguessr_difficulty');
        localStorage.removeItem('uicguessr_sound');
        localStorage.removeItem('uicguessr_hints');
        localStorage.removeItem('uicguessr_timer');
        localStorage.removeItem('uicguessr_focus');
        localStorage.removeItem('uicguessr_mode');
        
        alert('Settings reset to defaults!');
    }

    loadSettings() {
        // Load from localStorage
        const savedDifficulty = localStorage.getItem('uicguessr_difficulty');
        if (savedDifficulty) {
            this.difficulty = savedDifficulty;
        }
        
        const savedSound = localStorage.getItem('uicguessr_sound');
        if (savedSound !== null) {
            gameSettings.soundEnabled = savedSound === 'true';
        }
        
        const savedHints = localStorage.getItem('uicguessr_hints');
        if (savedHints !== null) {
            gameSettings.hintsEnabled = savedHints === 'true';
        }
        
        const savedTimer = localStorage.getItem('uicguessr_timer');
        if (savedTimer !== null) {
            this.timerEnabled = savedTimer === 'true';
        }
        
        const savedFocus = localStorage.getItem('uicguessr_focus');
        if (savedFocus) {
            try {
                const parsed = JSON.parse(savedFocus);
                if (Array.isArray(parsed) && parsed.length) {
                    this.focusFilters = parsed;
                }
            } catch (e) {}
        }
        const savedMode = localStorage.getItem('uicguessr_mode');
        if (savedMode) {
            this.mode = savedMode;
        }
        this.applyModeSettings();
        
        // Load persona & major deck
        const savedPersona = localStorage.getItem('uicguessr_persona');
        if (savedPersona && typeof personaDefinitions !== 'undefined' && personaDefinitions[savedPersona]) {
            this.selectedPersona = savedPersona;
        }
        
        const savedDeck = localStorage.getItem('uicguessr_major_deck');
        if (savedDeck && typeof majorDecks !== 'undefined' && majorDecks[savedDeck]) {
            this.selectedMajorDeck = savedDeck;
        }
        
        // Load round count
        const savedRounds = localStorage.getItem('uicguessr_round_count');
        if (savedRounds) {
            const count = parseInt(savedRounds, 10);
            if ([5, 10, 15].includes(count)) {
                this.totalRounds = count;
            }
        }
        
        // Reflect to runtime systems
        if (typeof soundManager !== 'undefined') {
            soundManager.setEnabled(gameSettings.soundEnabled);
        }
        this.updateTimerDisplay();
    }
    
    applyModeSettings() {
        // Defaults
        this.endless = false;
        this.attemptsPerQuestion = gameSettings.attemptsPerQuestion;
        // Do not permanently override global points or total rounds
        if (this.mode === 'zen') {
            this.timerEnabled = false;
            gameSettings.hintsEnabled = true;
            this.attemptsPerQuestion = 2;
            this.timePerQuestion = 60;
        } else if (this.mode === 'sprint') {
            this.timerEnabled = true;
            this.timePerQuestion = 30;
            gameSettings.hintsEnabled = true;
            this.attemptsPerQuestion = 1;
        } else if (this.mode === 'hardcore') {
            this.timerEnabled = true;
            this.timePerQuestion = 45;
            gameSettings.hintsEnabled = false;
            this.attemptsPerQuestion = 1;
        } else if (this.mode === 'endless') {
            this.endless = true;
            // Keep current timer/hints, but endless progression and UI changes handle display
            this.attemptsPerQuestion = 2;
            this.timePerQuestion = 60;
        } else {
            // classic
            this.timerEnabled = this.timerEnabled;
            this.attemptsPerQuestion = gameSettings.attemptsPerQuestion;
            this.timePerQuestion = 60;
        }
    }

    // Campus Map Overview
    showCampusMapOverview() {
        this.showScreen('campus-map-overview');
    }
    
    showCampusMapOverviewContent() {
        // Render the full campus map
        if (typeof campusMap !== 'undefined') {
            campusMap.renderMap('overview-campus-map', null, true); // Pass true for interactive mode
        }
        
        // Populate building legend
        const legendGrid = document.getElementById('building-legend-grid');
        if (legendGrid) {
            legendGrid.innerHTML = '';
            
            Object.keys(buildings).forEach(key => {
                const building = buildings[key];
                const style = typeof campusMap.getBuildingStyle === 'function'
                    ? campusMap.getBuildingStyle(key)
                    : null;
                
                if (!style) return;
                
                const legendItem = document.createElement('div');
                legendItem.className = 'legend-item';
                legendItem.onclick = () => this.showBuildingDetail(key);
                
                legendItem.innerHTML = `
                    <div class="legend-color" style="background: ${style.color};"></div>
                    <div class="legend-info">
                        <div class="legend-name">${building.name}</div>
                        <div class="legend-abbr">${style.label || building.abbreviation}</div>
                    </div>
                `;
                
                legendGrid.appendChild(legendItem);
            });
        }
    }
    
    showBuildingDetail(buildingKey) {
        const building = buildings[buildingKey];
        if (!building) return;
        
        if (typeof campusMap !== 'undefined' && document.getElementById('overview-campus-map')) {
            campusMap.renderMap('overview-campus-map', buildingKey, true);
        }
        
        // Show an alert with building info (could be enhanced with a modal later)
        const info = `
${building.name}

📍 ${building.address}

${building.description}

Resources Available:
${building.resources.map(r => `• ${r.name}: ${r.description}`).join('\n')}
        `;
        
        alert(info);
        if (soundManager) soundManager.playClick();
    }
    
    // All Resources Screen
    populateAllResources() {
        const container = document.getElementById('all-resources-grid');
        container.innerHTML = '';
        
        // Filters
        const search = (document.getElementById('resource-search-input')?.value || '').toLowerCase().trim();
        const enabledCategories = Array.from(document.querySelectorAll('.resource-filter-checkbox'))
            .filter(cb => cb.checked)
            .map(cb => cb.value);
        const categorySet = new Set(enabledCategories.length ? enabledCategories : Array.from(new Set(allResources.map(r => r.category))));
        
        // Filtered list
        const filtered = allResources.filter(r => {
            if (!categorySet.has(r.category)) return false;
            if (!search) return true;
            const hay = [
                r.name,
                r.description,
                r.location,
                (r.services || []).join(' ')
            ].join(' ').toLowerCase();
            return hay.includes(search);
        });
        
        // Group filtered resources by category
        const categories = {};
        filtered.forEach(resource => {
            if (!categories[resource.category]) {
                categories[resource.category] = [];
            }
            categories[resource.category].push(resource);
        });
        
        // Category icons
        const categoryIcons = {
            'Academic Support': '📚',
            'Health & Wellness': '🏥',
            'Student Services': '🎓',
            'Dining & Social': '🍔',
            'Technology': '💻',
            'Safety & Transportation': '🚨',
            'Cultural & Community': '🎨'
        };
        
        // Create sections for each category
        Object.keys(categories).forEach(category => {
            // Category header
            const categorySection = document.createElement('div');
            categorySection.className = 'resource-category-section';
            
            const categoryHeader = document.createElement('div');
            categoryHeader.className = 'resource-category-header';
            categoryHeader.innerHTML = `
                <h3>${categoryIcons[category] || '📌'} ${category}</h3>
                <span class="resource-count">${categories[category].length} resources</span>
            `;
            categorySection.appendChild(categoryHeader);
            
            // Resources grid for this category
            const resourcesGrid = document.createElement('div');
            resourcesGrid.className = 'resources-category-grid';
            
            categories[category].forEach(resource => {
                const item = document.createElement('div');
                item.className = 'resource-detail-card';
                
                // Build services list
                const servicesList = resource.services ? 
                    `<div class="resource-services">
                        ${resource.services.slice(0, 4).map(s => `<span class="service-tag">${s}</span>`).join('')}
                        ${resource.services.length > 4 ? `<span class="service-tag more">+${resource.services.length - 4} more</span>` : ''}
                    </div>` : '';
                
                item.innerHTML = `
                    <div class="resource-icon">${resource.icon || '📍'}</div>
                    <h4 class="resource-name">${resource.name}</h4>
                    <p class="resource-description">${resource.description}</p>
                    ${servicesList}
                    <div class="resource-details">
                        <div class="resource-detail-item">
                            <span class="detail-icon">📍</span>
                            <span class="detail-text">${resource.location}</span>
                        </div>
                        ${resource.hours ? `
                        <div class="resource-detail-item">
                            <span class="detail-icon">🕐</span>
                            <span class="detail-text">${resource.hours}</span>
                        </div>
                        ` : ''}
                        ${resource.contact ? `
                        <div class="resource-detail-item">
                            <span class="detail-icon">📞</span>
                            <span class="detail-text">${resource.contact}</span>
                        </div>
                        ` : ''}
                        ${resource.website ? (() => {
                            const normalized = resource.website.startsWith('http') ? resource.website : `https://${resource.website}`;
                            const safeLabel = resource.website.replace(/^https?:\/\//, '');
                            return `
                                <div class="resource-detail-item">
                                    <span class="detail-icon">🌐</span>
                                    <a class="detail-text" href="${normalized}" target="_blank" rel="noopener noreferrer" aria-label="Open ${resource.name} website">${safeLabel}</a>
                                </div>
                            `;
                        })() : ''}
                    </div>
                `;
                
                resourcesGrid.appendChild(item);
            });
            
            categorySection.appendChild(resourcesGrid);
            container.appendChild(categorySection);
        });
    }

    // Utils
    setPhotoCredit(elementId, building) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        if (building.photoCredit) {
            const licenseText = building.photoLicense ? ` (${building.photoLicense})` : '';
            if (building.photoCreditUrl) {
                element.innerHTML = `Photo: <a href="${building.photoCreditUrl}" target="_blank" rel="noopener">${building.photoCredit}</a>${licenseText}`;
            } else {
                element.textContent = `Photo: ${building.photoCredit}${licenseText}`;
            }
            element.style.display = 'block';
        } else {
            element.innerHTML = '';
            element.style.display = 'none';
        }
    }
    
    getDistanceAndBearing(from, to) {
        // Haversine distance
        const toRad = (v) => v * Math.PI / 180;
        const R = 6371000; // meters
        const dLat = toRad(to.lat - from.lat);
        const dLng = toRad(to.lng - from.lng);
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(toRad(from.lat)) * Math.cos(toRad(to.lat)) *
                  Math.sin(dLng/2) * Math.sin(dLng/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const meters = R * c;
        const minutes = Math.max(1, Math.round(meters / 80));
        const bearing = this.computeCardinalBearing(from, to);
        return { meters, minutes, bearing };
    }
    
    computeCardinalBearing(from, to) {
        const dx = to.lng - from.lng;
        const dy = to.lat - from.lat;
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        if (angle >= -22.5 && angle < 22.5) return 'east';
        if (angle >= 22.5 && angle < 67.5) return 'northeast';
        if (angle >= 67.5 && angle < 112.5) return 'north';
        if (angle >= 112.5 && angle < 157.5) return 'northwest';
        if (angle >= -67.5 && angle < -22.5) return 'southeast';
        if (angle >= -112.5 && angle < -67.5) return 'south';
        if (angle >= -157.5 && angle < -112.5) return 'southwest';
        return 'west';
    }
    
    // Achievements
    loadAchievements() {
        try {
            const saved = localStorage.getItem('uicguessr_achievements');
            this.achievements = saved ? JSON.parse(saved) : {};
        } catch (e) {
            this.achievements = {};
        }
    }
    saveAchievements() {
        localStorage.setItem('uicguessr_achievements', JSON.stringify(this.achievements));
    }
    unlockAchievement(key) {
        const valid = this.getAchievementCatalog()[key];
        if (!valid) return;
        if (!this.achievements[key]) {
            this.achievements[key] = true;
            this.saveAchievements();
        }
    }
    getAchievementCatalog() {
        return {
            first_correct: { title: 'First Steps', desc: 'Get your first correct answer' },
            no_hints_round: { title: 'No Hint Hero', desc: 'Get a perfect round with no hints' },
            streak_3: { title: 'On Fire', desc: 'Achieve a 3+ first-try streak' },
            sprinter: { title: 'Speed Runner', desc: 'Answer with >45s remaining' },
            map_lover: { title: 'Map Lover', desc: 'Open the map view' },
            perfect_game: { title: 'Flawless', desc: 'Finish with perfect base score' },
            hardcore_clear: { title: 'Hardcore Clear', desc: 'Win Hardcore with 4+ first-tries' }
        };
    }
    populateAchievementsScreen() {
        const grid = document.getElementById('achievements-grid');
        if (!grid) return;
        grid.innerHTML = '';
        const catalog = this.getAchievementCatalog();
        Object.keys(catalog).forEach(key => {
            const meta = catalog[key];
            const unlocked = !!this.achievements[key];
            const card = document.createElement('div');
            card.className = 'achievement-badge resource-detail-card ' + (unlocked ? 'unlocked' : '');
            card.innerHTML = `
                <h4>${unlocked ? '✅ ' : '🔒 '}${meta.title}</h4>
                <p>${meta.desc}</p>
            `;
            grid.appendChild(card);
        });
    }
    
    showProgressiveHint() {
        if (!this.hintAvailable || this.hintsUsed >= this.currentHints.length) {
            alert('No more hints available for this question!');
            return;
        }
        
        const hintText = this.currentHints[this.hintsUsed];
        this.hintsUsed++;
        
        // Display hint
        const hintContainer = document.getElementById('hint-container');
        if (hintContainer) {
            const hintDiv = document.createElement('div');
            hintDiv.className = 'hint-message';
            hintDiv.innerHTML = `💡 Hint ${this.hintsUsed}: ${hintText}`;
            hintContainer.appendChild(hintDiv);
            
            // Animate in
            setTimeout(() => hintDiv.classList.add('show'), 10);
        }
        
        // Reduce blur on images progressively (main + enlarged)
        if (this.currentBlurLevel > 0) {
            this.currentBlurLevel = Math.max(0, this.currentBlurLevel - 1);
            ['question-photo','hint-photo'].forEach(id => {
                const img = document.getElementById(id);
                if (img) {
                    img.classList.remove('blur-level-0','blur-level-1','blur-level-2','blur-level-3');
                    img.classList.add(`blur-level-${this.currentBlurLevel}`);
                }
            });
        }
        
        // Play hint sound
        if (soundManager) soundManager.playHint();
        
        // Update hint button
        const hintBtn = document.getElementById('hint-btn');
        if (hintBtn && this.hintsUsed >= this.currentHints.length) {
            hintBtn.disabled = true;
            hintBtn.textContent = 'No More Hints';
        }
    }
    
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    // ========== PERSONA & MAJOR DECK SYSTEM ==========
    
    selectPersona(personaKey) {
        if (typeof personaDefinitions === 'undefined') return;
        const persona = personaDefinitions[personaKey];
        if (!persona) return;
        
        this.selectedPersona = personaKey;
        this.totalRounds = persona.recommendedRounds || 10;
        localStorage.setItem('uicguessr_persona', personaKey);
        
        if (soundManager) soundManager.playClick();
    }
    
    selectMajorDeck(deckKey) {
        if (typeof majorDecks === 'undefined') return;
        const deck = majorDecks[deckKey];
        if (!deck) return;
        
        this.selectedMajorDeck = deckKey;
        localStorage.setItem('uicguessr_major_deck', deckKey);
        
        if (soundManager) soundManager.playClick();
    }
    
    setRoundCount(count) {
        const validCounts = [5, 10, 15];
        if (validCounts.includes(count)) {
            this.totalRounds = count;
            localStorage.setItem('uicguessr_round_count', count);
        }
    }
    
    getPersonaPriorityBuildings() {
        if (!this.selectedPersona || typeof personaDefinitions === 'undefined') return null;
        const persona = personaDefinitions[this.selectedPersona];
        return persona ? persona.priorityBuildings : null;
    }
    
    getMajorDeckBuildings() {
        if (!this.selectedMajorDeck || typeof majorDecks === 'undefined') return null;
        const deck = majorDecks[this.selectedMajorDeck];
        return deck ? deck.buildings : null;
    }
    
    buildPersonaQuestionPool() {
        // Get priority buildings from persona or major deck
        let priorityBuildings = this.getPersonaPriorityBuildings() || this.getMajorDeckBuildings();
        
        if (!priorityBuildings) {
            // Fall back to regular question pool
            return this.buildActiveQuestionPool();
        }
        
        // Filter to only buildings with valid photos
        const validBuildings = priorityBuildings.filter(key => {
            const b = buildings[key];
            return b && b.photo && b.photo.length > 0;
        });
        
        if (validBuildings.length < 4) {
            return this.buildActiveQuestionPool();
        }
        
        // Generate questions dynamically
        const questions = [];
        validBuildings.forEach(buildingKey => {
            // Get 3 other buildings for distractors
            const otherBuildings = validBuildings.filter(k => k !== buildingKey);
            const distractors = this.shuffleArray(otherBuildings.slice()).slice(0, 3);
            
            if (distractors.length >= 3) {
                questions.push({
                    building: buildingKey,
                    correctAnswer: buildingKey,
                    options: this.shuffleArray([buildingKey, ...distractors]),
                    difficulty: this.difficulty,
                    hint: buildings[buildingKey].tips || buildings[buildingKey].description
                });
            }
        });
        
        this.activeQuestionPool = this.shuffleArray(questions);
    }
    
    showPersonaSelection() {
        this.showScreen('persona-select');
    }
    
    initPersonaScreen() {
        const grid = document.getElementById('persona-grid');
        if (!grid || typeof personaDefinitions === 'undefined') return;
        
        grid.innerHTML = '';
        
        Object.keys(personaDefinitions).forEach(key => {
            const persona = personaDefinitions[key];
            const isSelected = this.selectedPersona === key;
            
            const card = document.createElement('div');
            card.className = `persona-card ${isSelected ? 'selected' : ''}`;
            card.style.borderColor = persona.color;
            card.onclick = () => {
                this.selectPersona(key);
                this.initPersonaScreen(); // Refresh
            };
            
            card.innerHTML = `
                <div class="persona-icon" style="background: ${persona.color};">${persona.icon}</div>
                <h3 class="persona-name">${persona.name}</h3>
                <p class="persona-description">${persona.description}</p>
                <div class="persona-stats">
                    <span>📍 ${persona.priorityBuildings.length} buildings</span>
                    <span>🎯 ${persona.recommendedRounds} rounds</span>
                </div>
                <div class="persona-tips">
                    <strong>Focus:</strong> ${persona.focusAreas.slice(0, 2).join(', ')}
                </div>
                ${isSelected ? '<div class="selected-badge">✓ Selected</div>' : ''}
            `;
            
            grid.appendChild(card);
        });
    }
    
    initMajorDeckScreen() {
        const grid = document.getElementById('major-deck-grid');
        if (!grid || typeof majorDecks === 'undefined') return;
        
        grid.innerHTML = '';
        
        Object.keys(majorDecks).forEach(key => {
            const deck = majorDecks[key];
            const isSelected = this.selectedMajorDeck === key;
            
            const card = document.createElement('div');
            card.className = `major-deck-card ${isSelected ? 'selected' : ''}`;
            card.style.borderColor = deck.color;
            card.onclick = () => {
                this.selectMajorDeck(key);
                this.initMajorDeckScreen(); // Refresh
            };
            
            card.innerHTML = `
                <div class="deck-icon" style="background: ${deck.color};">${deck.icon}</div>
                <h3 class="deck-name">${deck.name}</h3>
                <p class="deck-description">${deck.description}</p>
                <div class="deck-stats">
                    <span>🏛️ ${deck.buildings.length} buildings</span>
                </div>
                ${isSelected ? '<div class="selected-badge">✓ Selected</div>' : ''}
            `;
            
            grid.appendChild(card);
        });
    }
    
    // ========== LEARNING ANALYTICS ==========
    
    loadLearningData() {
        try {
            const saved = localStorage.getItem('uicguessr_learning');
            if (saved) {
                this.learningData = JSON.parse(saved);
            }
        } catch (e) {
            console.warn('Could not load learning data');
        }
    }
    
    saveLearningData() {
        localStorage.setItem('uicguessr_learning', JSON.stringify(this.learningData));
    }
    
    recordBuildingAttempt(buildingKey, wasCorrect, attempts) {
        if (!this.learningData.buildingAttempts[buildingKey]) {
            this.learningData.buildingAttempts[buildingKey] = {
                attempts: 0,
                correct: 0,
                lastSeen: null,
                history: []
            };
        }
        
        const data = this.learningData.buildingAttempts[buildingKey];
        data.attempts++;
        if (wasCorrect) data.correct++;
        data.lastSeen = new Date().toISOString();
        data.history.push({
            date: new Date().toISOString(),
            correct: wasCorrect,
            attemptsUsed: attempts
        });
        
        // Keep only last 20 attempts per building
        if (data.history.length > 20) {
            data.history = data.history.slice(-20);
        }
        
        this.updateWeakAndMasteredBuildings();
        this.saveLearningData();
    }
    
    updateWeakAndMasteredBuildings() {
        const weak = [];
        const mastered = [];
        
        Object.keys(this.learningData.buildingAttempts).forEach(key => {
            const data = this.learningData.buildingAttempts[key];
            if (data.attempts >= 3) {
                const accuracy = data.correct / data.attempts;
                if (accuracy < 0.5) {
                    weak.push({ key, accuracy, attempts: data.attempts });
                } else if (accuracy >= 0.8 && data.attempts >= 5) {
                    mastered.push({ key, accuracy, attempts: data.attempts });
                }
            }
        });
        
        // Sort by accuracy (weak: lowest first, mastered: highest first)
        weak.sort((a, b) => a.accuracy - b.accuracy);
        mastered.sort((a, b) => b.accuracy - a.accuracy);
        
        this.learningData.weakBuildings = weak.map(w => w.key);
        this.learningData.masteredBuildings = mastered.map(m => m.key);
    }
    
    recordSessionResult() {
        const session = {
            date: new Date().toISOString(),
            score: this.score,
            rounds: this.currentRound,
            difficulty: this.difficulty,
            persona: this.selectedPersona,
            majorDeck: this.selectedMajorDeck,
            results: this.roundResults.map(r => ({
                building: r.building,
                correct: r.correct,
                attempts: r.attempts
            }))
        };
        
        this.learningData.sessionHistory.push(session);
        
        // Keep only last 50 sessions
        if (this.learningData.sessionHistory.length > 50) {
            this.learningData.sessionHistory = this.learningData.sessionHistory.slice(-50);
        }
        
        this.saveLearningData();
    }
    
    showLearningInsights() {
        this.showScreen('learning-insights');
    }
    
    initLearningInsightsScreen() {
        // Populate weak buildings
        const weakGrid = document.getElementById('weak-buildings-grid');
        if (weakGrid) {
            weakGrid.innerHTML = '';
            const weakBuildings = this.learningData.weakBuildings.slice(0, 6);
            
            if (weakBuildings.length === 0) {
                weakGrid.innerHTML = '<p class="empty-message">Play more to discover which buildings need practice!</p>';
            } else {
                weakBuildings.forEach(key => {
                    const building = buildings[key];
                    const data = this.learningData.buildingAttempts[key];
                    if (!building) return;
                    
                    const accuracy = Math.round((data.correct / data.attempts) * 100);
                    const card = document.createElement('div');
                    card.className = 'insight-card weak';
                    card.innerHTML = `
                        <div class="insight-building">${building.abbreviation}</div>
                        <div class="insight-name">${building.name}</div>
                        <div class="insight-stat">${accuracy}% accuracy (${data.attempts} tries)</div>
                        <button class="btn btn-small" onclick="game.practiceBuilding('${key}')">Practice</button>
                    `;
                    weakGrid.appendChild(card);
                });
            }
        }
        
        // Populate mastered buildings
        const masteredGrid = document.getElementById('mastered-buildings-grid');
        if (masteredGrid) {
            masteredGrid.innerHTML = '';
            const masteredBuildings = this.learningData.masteredBuildings.slice(0, 6);
            
            if (masteredBuildings.length === 0) {
                masteredGrid.innerHTML = '<p class="empty-message">Keep playing to master buildings!</p>';
            } else {
                masteredBuildings.forEach(key => {
                    const building = buildings[key];
                    const data = this.learningData.buildingAttempts[key];
                    if (!building) return;
                    
                    const accuracy = Math.round((data.correct / data.attempts) * 100);
                    const card = document.createElement('div');
                    card.className = 'insight-card mastered';
                    card.innerHTML = `
                        <div class="insight-building">${building.abbreviation}</div>
                        <div class="insight-name">${building.name}</div>
                        <div class="insight-stat">✓ ${accuracy}% accuracy</div>
                    `;
                    masteredGrid.appendChild(card);
                });
            }
        }
        
        // Session stats
        const statsContainer = document.getElementById('learning-stats');
        if (statsContainer) {
            const totalSessions = this.learningData.sessionHistory.length;
            const totalBuildings = Object.keys(this.learningData.buildingAttempts).length;
            const avgScore = totalSessions > 0 
                ? Math.round(this.learningData.sessionHistory.reduce((sum, s) => sum + s.score, 0) / totalSessions)
                : 0;
            
            statsContainer.innerHTML = `
                <div class="stat-item">
                    <span class="stat-value">${totalSessions}</span>
                    <span class="stat-label">Sessions Played</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">${totalBuildings}</span>
                    <span class="stat-label">Buildings Seen</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">${avgScore}</span>
                    <span class="stat-label">Avg Score</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">${this.learningData.masteredBuildings.length}</span>
                    <span class="stat-label">Mastered</span>
                </div>
            `;
        }
    }
    
    practiceBuilding(buildingKey) {
        // Start a focused practice session on weak buildings
        const weakBuildings = this.learningData.weakBuildings.slice(0, 8);
        if (weakBuildings.length < 4) {
            alert('Not enough weak buildings to practice. Keep playing!');
            return;
        }
        
        // Generate practice questions focused on weak buildings
        const questions = [];
        weakBuildings.forEach(key => {
            const otherBuildings = weakBuildings.filter(k => k !== key);
            const distractors = this.shuffleArray(otherBuildings.slice()).slice(0, 3);
            
            if (distractors.length >= 3 && buildings[key]) {
                questions.push({
                    building: key,
                    correctAnswer: key,
                    options: this.shuffleArray([key, ...distractors]),
                    difficulty: 'practice',
                    hint: buildings[key].tips || 'Focus on the building features.'
                });
            }
        });
        
        if (questions.length < 3) {
            alert('Not enough buildings to create practice session.');
            return;
        }
        
        this.activeQuestionPool = this.shuffleArray(questions);
        this.totalRounds = Math.min(questions.length, 5);
        this.mode = 'practice';
        this.startGame();
    }
    
    // ========== ENHANCED RESOURCE DISPLAY ==========
    
    getEnhancedResources(buildingKey) {
        if (typeof resourceLocations === 'undefined') return null;
        return resourceLocations[buildingKey] || null;
    }
    
    populateEnhancedResources(containerId, buildingKey) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const enhanced = this.getEnhancedResources(buildingKey);
        const building = buildings[buildingKey];
        
        if (!building) return;
        
        container.innerHTML = '';
        
        // Use enhanced resources if available, otherwise fall back to basic
        const resources = enhanced || building.resources || [];
        
        resources.forEach(resource => {
            const card = document.createElement('div');
            card.className = 'resource-card enhanced';
            
            let locationInfo = '';
            if (resource.floor) {
                locationInfo = `<div class="resource-location">
                    📍 ${resource.floor}${resource.section ? ` - ${resource.section}` : ''}
                    ${resource.room ? ` (${resource.room})` : ''}
                </div>`;
            }
            
            let hoursInfo = '';
            if (resource.hours) {
                hoursInfo = `<div class="resource-hours">🕐 ${resource.hours}</div>`;
            }
            
            card.innerHTML = `
                <h5>${resource.name}</h5>
                <p>${resource.description || ''}</p>
                ${locationInfo}
                ${hoursInfo}
            `;
            
            container.appendChild(card);
        });
    }
    
    clearLearningData() {
        if (confirm('This will reset all your learning progress. Are you sure?')) {
            this.learningData = {
                buildingAttempts: {},
                sessionHistory: [],
                weakBuildings: [],
                masteredBuildings: []
            };
            this.saveLearningData();
            alert('Learning data cleared.');
            this.initLearningInsightsScreen();
        }
    }
}

// Initialize game when page loads
let game;
document.addEventListener('DOMContentLoaded', () => {
    game = new UICGuessrGame();
});

