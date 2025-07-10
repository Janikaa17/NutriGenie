// Simple Cache Access Control for clearing operations
class CacheAccessControl {
    constructor() {
        this.adminPassword = 'nutrigenie2024'; // Simple password for demo
        this.attempts = new Map(); // Track failed attempts
        this.maxAttempts = 3; // Max failed attempts before temporary lockout
        this.lockoutDuration = 5 * 60 * 1000; // 5 minutes lockout
    }

    // Check if user can clear cache
    canClearCache(password) {
        const userId = this.getUserId();
        
        // Check if user is locked out
        const userAttempts = this.attempts.get(userId) || { count: 0, lastAttempt: 0 };
        const now = Date.now();
        
        // Reset attempts if lockout period has passed
        if (now - userAttempts.lastAttempt > this.lockoutDuration) {
            userAttempts.count = 0;
        }
        
        // Check if user is locked out
        if (userAttempts.count >= this.maxAttempts) {
            const remainingTime = Math.ceil((this.lockoutDuration - (now - userAttempts.lastAttempt)) / 1000 / 60);
            return {
                allowed: false,
                reason: 'locked_out',
                remainingTime: remainingTime,
                message: `Too many failed attempts. Try again in ${remainingTime} minutes.`
            };
        }
        
        // Check password
        if (password === this.adminPassword) {
            // Reset attempts on successful login
            userAttempts.count = 0;
            this.attempts.set(userId, userAttempts);
            return { allowed: true };
        } else {
            // Increment failed attempts
            userAttempts.count += 1;
            userAttempts.lastAttempt = now;
            this.attempts.set(userId, userAttempts);
            
            const remainingAttempts = this.maxAttempts - userAttempts.count;
            return {
                allowed: false,
                reason: 'wrong_password',
                remainingAttempts: remainingAttempts,
                message: `Incorrect password. ${remainingAttempts} attempts remaining.`
            };
        }
    }

    // Get user ID (simple session-based)
    getUserId() {
        let userId = sessionStorage.getItem('nutrigenie_user_id');
        if (!userId) {
            userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('nutrigenie_user_id', userId);
        }
        return userId;
    }

    // Reset user attempts (for testing)
    resetUserAttempts() {
        const userId = this.getUserId();
        this.attempts.delete(userId);
    }

    // Get user status
    getUserStatus() {
        const userId = this.getUserId();
        const userAttempts = this.attempts.get(userId) || { count: 0, lastAttempt: 0 };
        const now = Date.now();
        
        return {
            userId,
            failedAttempts: userAttempts.count,
            isLockedOut: userAttempts.count >= this.maxAttempts && (now - userAttempts.lastAttempt) < this.lockoutDuration,
            remainingAttempts: Math.max(0, this.maxAttempts - userAttempts.count),
            lockoutRemaining: userAttempts.count >= this.maxAttempts ? 
                Math.ceil((this.lockoutDuration - (now - userAttempts.lastAttempt)) / 1000 / 60) : 0
        };
    }
}

// Create singleton instance
const cacheAccessControl = new CacheAccessControl();

export default cacheAccessControl; 