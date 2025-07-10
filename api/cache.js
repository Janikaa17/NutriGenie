// Backend cache utility for recipe transformations (Node.js only) with security
class BackendRecipeCache {
    constructor() {
        this.cache = new Map();
        this.maxSize = 200;
        this.ttl = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        this.hitCount = 0;
        this.missCount = 0;
    }

    // Generate secure cache key using hash
    generateKey(recipeData) {
        const { input, goal, dietaryPreference } = recipeData;
        // Normalize the input to handle whitespace and case differences
        const normalizedInput = input.toLowerCase().trim().replace(/\s+/g, ' ');
        const keyString = `${normalizedInput}_${goal || 'general'}_${dietaryPreference || 'veg'}`;
        
        // Create a simple hash for security (in production, use crypto module)
        return this.hashString(keyString);
    }

    // Simple hash function (for production, use Node.js crypto module)
    hashString(str) {
        let hash = 0;
        if (str.length === 0) return hash.toString();
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return 'cache_' + Math.abs(hash).toString(36);
    }

    // Get cached result
    get(recipeData) {
        const key = this.generateKey(recipeData);
        const cached = this.cache.get(key);
        
        if (!cached) {
            this.missCount++;
            console.log('Backend Cache MISS');
            return null;
        }
        
        // Check if cache has expired
        if (Date.now() - cached.timestamp > this.ttl) {
            this.cache.delete(key);
            this.missCount++;
            console.log('Backend Cache EXPIRED');
            return null;
        }
        
        this.hitCount++;
        console.log('Backend Cache HIT');
        console.log('Backend Cache stats - Hits:', this.hitCount, 'Misses:', this.missCount);
        return cached.data;
    }

    // Store result in cache
    set(recipeData, result) {
        const key = this.generateKey(recipeData);
        
        // Remove oldest entries if cache is full
        if (this.cache.size >= this.maxSize) {
            const oldestKey = this.cache.keys().next().value;
            this.cache.delete(oldestKey);
            console.log('Removed oldest backend cache entry');
        }
        
        this.cache.set(key, {
            data: result,
            timestamp: Date.now()
        });
        
        console.log('Backend cached recipe result');
    }

    // Clear cache
    clear() {
        this.cache.clear();
        this.hitCount = 0;
        this.missCount = 0;
        console.log('Backend cache cleared');
    }

    // Get cache stats (without exposing sensitive data)
    getStats() {
        return {
            size: this.cache.size,
            maxSize: this.maxSize,
            hitCount: this.hitCount,
            missCount: this.missCount,
            hitRate: this.hitCount + this.missCount > 0 ? 
                ((this.hitCount / (this.hitCount + this.missCount)) * 100).toFixed(2) + '%' : '0%'
        };
    }

    // Debug method to log cache contents (without sensitive data)
    debug() {
        console.log('=== BACKEND CACHE DEBUG ===');
        console.log('Cache size:', this.cache.size);
        console.log('Hit rate:', this.getStats().hitRate);
        console.log('Cache entries count:', this.cache.size);
        console.log('==========================');
    }
}

// Create singleton instance for backend
const backendRecipeCache = new BackendRecipeCache();

console.log('Backend recipe cache initialized');

export default backendRecipeCache; 