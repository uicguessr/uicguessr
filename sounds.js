// Sound Effects Manager for UICguessr

class SoundManager {
    constructor() {
        this.enabled = true;
        this.audioContext = null;
        this.sounds = {};
        
        // Initialize Web Audio API
        this.initAudio();
    }

    initAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    }

    // Play a tone with specific frequency and duration
    playTone(frequency, duration, type = 'sine') {
        if (!this.enabled || !this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = type;

        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }

    // Success sound - pleasant chime
    playSuccess() {
        if (!this.enabled || !this.audioContext) return;
        
        // Play a pleasant chord
        this.playTone(523.25, 0.2); // C5
        setTimeout(() => this.playTone(659.25, 0.2), 100); // E5
        setTimeout(() => this.playTone(783.99, 0.3), 200); // G5
    }

    // Error sound - gentle buzz
    playError() {
        if (!this.enabled || !this.audioContext) return;
        
        this.playTone(200, 0.15, 'sawtooth');
        setTimeout(() => this.playTone(180, 0.15, 'sawtooth'), 150);
    }

    // Click sound - subtle tap
    playClick() {
        if (!this.enabled || !this.audioContext) return;
        
        this.playTone(800, 0.05, 'square');
    }

    // Hover sound - very subtle
    playHover() {
        if (!this.enabled || !this.audioContext) return;
        
        this.playTone(1200, 0.03, 'sine');
    }

    // Timer tick - urgent sound
    playTick() {
        if (!this.enabled || !this.audioContext) return;
        
        this.playTone(440, 0.08, 'square');
    }

    // Timer warning - faster ticks
    playWarning() {
        if (!this.enabled || !this.audioContext) return;
        
        this.playTone(660, 0.1, 'square');
    }

    // Round complete - celebration
    playRoundComplete() {
        if (!this.enabled || !this.audioContext) return;
        
        const notes = [523.25, 587.33, 659.25, 783.99, 880.00];
        notes.forEach((note, index) => {
            setTimeout(() => this.playTone(note, 0.15), index * 80);
        });
    }

    // Game complete - big celebration
    playGameComplete() {
        if (!this.enabled || !this.audioContext) return;
        
        // Play ascending scale
        const notes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];
        notes.forEach((note, index) => {
            setTimeout(() => this.playTone(note, 0.2), index * 100);
        });
    }

    // Hint revealed
    playHint() {
        if (!this.enabled || !this.audioContext) return;
        
        this.playTone(587.33, 0.2); // D5
        setTimeout(() => this.playTone(783.99, 0.2), 150); // G5
    }

    // New round starting
    playNewRound() {
        if (!this.enabled || !this.audioContext) return;
        
        this.playTone(392.00, 0.15); // G4
        setTimeout(() => this.playTone(523.25, 0.2), 100); // C5
    }

    // Points earned animation
    playPoints(points) {
        if (!this.enabled || !this.audioContext) return;
        
        if (points === 100) {
            // Perfect score - bright sound
            this.playTone(880.00, 0.3);
        } else if (points === 50) {
            // Half points - medium sound
            this.playTone(659.25, 0.3);
        } else {
            // No points - low sound
            this.playTone(329.63, 0.3);
        }
    }

    // Enable/disable sounds
    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }

    // Set enabled state
    setEnabled(enabled) {
        this.enabled = enabled;
    }
}

// Create global sound manager instance
const soundManager = new SoundManager();

