// UICguessr Game Logic

class UICGuessrGame {
    constructor() {
        this.currentRound = 0;
        this.score = 0;
        this.attemptsRemaining = 2;
        this.currentQuestion = null;
        this.selectedAnswer = null;
        this.roundResults = [];
        this.difficulty = 'easy';
        this.gameStarted = false;
        this.focusFilters = ['academic', 'recreation', 'services', 'dining'];
        
        // Timer properties
        this.timer = null;
        this.timeRemaining = 0;
        this.timerEnabled = true;
        this.timePerQuestion = 60; // seconds
        this.hintTimeoutId = null;
        
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
        
        this.loadSettings();
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
        
        // Focus areas count
        const focusCount = this.focusFilters.length;
        badges.push(`<div class="settings-badge">
            <span class="settings-badge-icon">🎯</span>
            <span>${focusCount} Focus Area${focusCount !== 1 ? 's' : ''}</span>
        </div>`);
        
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
            } else if (screenId === 'campus-map-overview') {
                this.showCampusMapOverviewContent();
            } else if (screenId === 'options') {
                // Reflect current settings to the options UI
                const difficultyInput = document.querySelector(`input[name="difficulty"][value="${this.difficulty}"]`);
                if (difficultyInput) difficultyInput.checked = true;
                
                const soundInput = document.querySelector('input[name="settings"][value="sound"]');
                if (soundInput) soundInput.checked = !!gameSettings.soundEnabled;
                
                const hintsInput = document.querySelector('input[name="settings"][value="hints"]');
                if (hintsInput) hintsInput.checked = !!gameSettings.hintsEnabled;
                
                const timerInput = document.querySelector('input[name="settings"][value="timer"]');
                if (timerInput) timerInput.checked = !!this.timerEnabled;
                
                document.querySelectorAll('input[name="focus"]').forEach(cb => {
                    cb.checked = this.focusFilters.includes(cb.value);
                });
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
        this.buildActiveQuestionPool();
        
        this.loadNextQuestion();
    }

    buildActiveQuestionPool() {
        const questions = questionSets[this.difficulty] || [];
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
        
        if (this.currentRound > gameSettings.totalRounds) {
            this.showGameComplete();
            return;
        }

        // Reset attempts and hints
        this.attemptsRemaining = gameSettings.attemptsPerQuestion;
        this.selectedAnswer = null;
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
        
        // Update photo
        const building = buildings[this.currentQuestion.building];
        document.getElementById('question-photo').src = building.photo;
        document.getElementById('question-photo').alt = `Photo of ${building.name}`;
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
        }
        
        // Streak bonus
        if (this.attemptsRemaining === 2) {
            this.streak++;
            if (this.streak > this.maxStreak) this.maxStreak = this.streak;
            
            if (this.streak >= 3) {
                const streakBonus = this.streak * 10;
                bonusPoints += streakBonus;
                bonusReasons.push(`🔥 ${this.streak}x Streak Bonus: +${streakBonus}`);
            }
            
            this.perfectRounds++;
        } else {
            this.streak = 0; // Reset streak on second attempt
        }
        
        // Perfect round (first try + no hints used)
        if (this.attemptsRemaining === 2 && this.hintsUsed === 0) {
            bonusPoints += 25;
            bonusReasons.push(`💎 Perfect Round (No Hints): +25`);
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
        
        // Populate resources
        const resourcesContainer = document.getElementById('correct-resources');
        resourcesContainer.innerHTML = '';
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
        if (this.currentRound < gameSettings.totalRounds) {
            this.loadNextQuestion();
        } else {
            this.showGameComplete();
        }
    }

    showGameComplete() {
        // Stop any running timer
        this.stopTimer();
        
        // Update global stats
        this.stats.gamesPlayed++;
        this.stats.totalScore += this.score;
        if (this.score > this.stats.bestScore) {
            this.stats.bestScore = this.score;
        }
        if (this.score === gameSettings.totalRounds * gameSettings.pointsFirstTry) {
            this.stats.perfectGames++;
        }
        this.saveStats();
        
        // Play game complete sound
        if (soundManager) soundManager.playGameComplete();
        
        // Calculate stats
        const firstTryCorrect = this.roundResults.filter(r => r.correct && r.attempts === 1).length;
        const secondTryCorrect = this.roundResults.filter(r => r.correct && r.attempts === 2).length;
        const missed = this.roundResults.filter(r => !r.correct).length;
        const totalBonus = this.roundResults.reduce((sum, r) => sum + (r.bonusPoints || 0), 0);
        
        // Update final score
        document.getElementById('final-score').textContent = this.score;
        
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
        const percentage = (this.score / (gameSettings.totalRounds * gameSettings.pointsFirstTry)) * 100;
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
        
        this.showScreen('score');
    }

    playAgain() {
        this.startGame();
    }

    // Hint Modal
    showHint() {
        const building = buildings[this.currentQuestion.building];
        document.getElementById('hint-photo').src = building.photo;
        this.setPhotoCredit('hint-photo-credit', building);
        this.showScreen('hint');
    }

    closeHint() {
        this.showScreen('question');
    }

    // Progress Updates
    updateProgress() {
        const completedRounds = this.currentRound - 1;
        const percentage = (completedRounds / gameSettings.totalRounds) * 100;
        
        document.getElementById('progress-fill').style.width = `${percentage}%`;
        document.getElementById('progress-text').textContent = `${completedRounds} of ${gameSettings.totalRounds} Complete`;
    }

    updateProgressOnFeedback(screenType) {
        const completedRounds = this.currentRound;
        const percentage = (completedRounds / gameSettings.totalRounds) * 100;
        
        const fillId = screenType === 'correct' ? 'progress-fill-correct' : 'progress-fill-incorrect';
        const textId = screenType === 'correct' ? 'progress-text-correct' : 'progress-text-incorrect';
        
        document.getElementById(fillId).style.width = `${percentage}%`;
        document.getElementById(textId).textContent = `${completedRounds} of ${gameSettings.totalRounds}`;
    }

    updateQuestionInfo() {
        document.getElementById('attempts-remaining').textContent = `${this.attemptsRemaining}/${gameSettings.attemptsPerQuestion}`;
        
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
        
        // Save to localStorage
        localStorage.setItem('uicguessr_difficulty', this.difficulty);
        localStorage.setItem('uicguessr_sound', gameSettings.soundEnabled);
        localStorage.setItem('uicguessr_hints', gameSettings.hintsEnabled);
        localStorage.setItem('uicguessr_timer', this.timerEnabled);
        localStorage.setItem('uicguessr_focus', JSON.stringify(this.focusFilters));
        
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
        
        // Update UI
        document.querySelector('input[name="difficulty"][value="easy"]').checked = true;
        document.querySelector('input[name="settings"][value="sound"]').checked = true;
        document.querySelector('input[name="settings"][value="hints"]').checked = true;
        const timerInput = document.querySelector('input[name="settings"][value="timer"]');
        if (timerInput) timerInput.checked = true;
        document.querySelectorAll('input[name="focus"]').forEach(cb => cb.checked = true);
        if (typeof soundManager !== 'undefined') {
            soundManager.setEnabled(true);
        }
        
        // Clear localStorage
        localStorage.removeItem('uicguessr_difficulty');
        localStorage.removeItem('uicguessr_sound');
        localStorage.removeItem('uicguessr_hints');
        localStorage.removeItem('uicguessr_timer');
        localStorage.removeItem('uicguessr_focus');
        
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
        
        // Reflect to runtime systems
        if (typeof soundManager !== 'undefined') {
            soundManager.setEnabled(gameSettings.soundEnabled);
        }
        this.updateTimerDisplay();
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
        
        // Group resources by category
        const categories = {};
        allResources.forEach(resource => {
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
    
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}

// Initialize game when page loads
let game;
document.addEventListener('DOMContentLoaded', () => {
    game = new UICGuessrGame();
});

