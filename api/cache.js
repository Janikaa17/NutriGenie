
class BackendRecipeCache {
    constructor() {
        this.cache = new Map();
        this.maxSize = 200;
        this.ttl = 24 * 60 * 60 * 1000; 
        this.hitCount = 0;
        this.missCount = 0;
    }

    generateKey(recipeData) {
        const { input, goal, dietaryPreference, seasonality, region } = recipeData;
        const normalizedInput = input.toLowerCase().trim().replace(/\s+/g, ' ');
        const keyString = `${normalizedInput}_${goal || 'general'}_${dietaryPreference || 'veg'}_${seasonality || 'noseason'}_${region || 'noregion'}`;
        
        //simple hash for security
        return this.hashString(keyString);
    }

    //simple hash function
    hashString(str) {
        let hash = 0;
        if (str.length === 0) return hash.toString();
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; 
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

    // Get cache stats
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

    // Debug method to log cache contents
    debug() {
        console.log('=== BACKEND CACHE DEBUG ===');
        console.log('Cache size:', this.cache.size);
        console.log('Hit rate:', this.getStats().hitRate);
        console.log('Cache entries count:', this.cache.size);
        console.log('Cache includes: input, goal, dietaryPreference, seasonality, region');
        console.log('==========================');
    }

    // Clear old cache entries that don't include the new seasonal and regional fields
    clearOldCacheEntries() {
        let clearedCount = 0;
        for (const [key, value] of this.cache.entries()) {
            // Check if the cached data includes the new fields
            if (!value.data.seasonality || !value.data.region) {
                this.cache.delete(key);
                clearedCount++;
            }
        }
        if (clearedCount > 0) {
            console.log(`Cleared ${clearedCount} old backend cache entries that don't include seasonal/regional data`);
        }
    }
}

const backendRecipeCache = new BackendRecipeCache();

// Clear old cache entries on initialization
backendRecipeCache.clearOldCacheEntries();

console.log('Backend recipe cache initialized');

export default backendRecipeCache; 