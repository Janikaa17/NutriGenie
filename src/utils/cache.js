class RecipeCache {
    constructor() {
        this.cache = new Map();
        this.maxSize = 200;
        this.ttl = 24 * 60 * 60 * 1000; 
        this.hitCount = 0;
        this.missCount = 0;
        
        // Only try localStorage in browser environment
        if (typeof window !== 'undefined') {
            this.loadFromStorage();
        }
    }

    // Generate secure cache key using hash
    generateKey(recipeData) {
        const { input, goal, dietaryPreference, seasonality, region } = recipeData;
        
        const normalizedInput = input.toLowerCase().trim().replace(/\s+/g, ' ');
        const keyString = `${normalizedInput}_${goal || 'general'}_${dietaryPreference || 'veg'}_${seasonality || 'noseason'}_${region || 'noregion'}`;
        
        return this.hashString(keyString);
    }

    
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
            console.log('Cache MISS');
            return null;
        }
        
        // Check if cache has expired
        if (Date.now() - cached.timestamp > this.ttl) {
            this.cache.delete(key);
            this.missCount++;
            console.log('Cache EXPIRED');
            return null;
        }
        
        this.hitCount++;
        console.log('Cache HIT');
        console.log('Cache stats - Hits:', this.hitCount, 'Misses:', this.missCount);
        return cached.data;
    }

    // Store result in cache
    set(recipeData, result) {
        const key = this.generateKey(recipeData);
        
        // Remove oldest entries if cache is full
        if (this.cache.size >= this.maxSize) {
            const oldestKey = this.cache.keys().next().value;
            this.cache.delete(oldestKey);
            console.log('Removed oldest cache entry');
        }
        
        this.cache.set(key, {
            data: result,
            timestamp: Date.now()
        });
        
        console.log('Cached recipe result');
        
        // Only save to localStorage in browser environment
        if (typeof window !== 'undefined') {
            this.saveToStorage();
        }
    }

    // Clear cache
    clear() {
        this.cache.clear();
        this.hitCount = 0;
        this.missCount = 0;
        console.log('Cache cleared');
        
        // Only clear localStorage in browser environment
        if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.removeItem('recipeCache');
        }
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

    // Save cache to localStorage (browser only) 
    saveToStorage() {
        if (typeof window !== 'undefined' && window.localStorage) {
            try {
                const cacheData = {
                    cache: Array.from(this.cache.entries()),
                    hitCount: this.hitCount,
                    missCount: this.missCount,
                    timestamp: Date.now()
                };
                
                const serialized = JSON.stringify(cacheData);
                window.localStorage.setItem('recipeCache', serialized);
                console.log('Cache saved to localStorage');
            } catch (error) {
                console.warn('Failed to save cache to localStorage:', error);
            }
        }
    }

    loadFromStorage() {
        if (typeof window !== 'undefined' && window.localStorage) {
            try {
                const cached = window.localStorage.getItem('recipeCache');
                if (cached) {
                    const cacheData = JSON.parse(cached);
                    
                    // Only load if cache is less than 24 hours old
                    if (Date.now() - cacheData.timestamp < this.ttl) {
                        this.cache = new Map(cacheData.cache);
                        this.hitCount = cacheData.hitCount || 0;
                        this.missCount = cacheData.missCount || 0;
                        console.log('Cache loaded from localStorage:', this.cache.size, 'entries');
                        
                        // Clear old cache entries that don't include new fields
                        this.clearOldCacheEntries();
                    } else {
                        console.log('LocalStorage cache expired, starting fresh');
                        window.localStorage.removeItem('recipeCache');
                    }
                }
            } catch (error) {
                console.warn('Failed to load cache from localStorage:', error);
                window.localStorage.removeItem('recipeCache');
            }
        }
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
            console.log(`Cleared ${clearedCount} old cache entries that don't include seasonal/regional data`);
            this.saveToStorage();
        }
    }

    // Debug method to log cache contents (without sensitive data)
    debug() {
        console.log('=== CACHE DEBUG ===');
        console.log('Cache size:', this.cache.size);
        console.log('Hit rate:', this.getStats().hitRate);
        console.log('Environment:', typeof window !== 'undefined' ? 'Browser' : 'Node.js');
        console.log('Cache entries count:', this.cache.size);
        console.log('Cache includes: input, goal, dietaryPreference, seasonality, region');
        console.log('==================');
    }
}

// Create singleton instance
const recipeCache = new RecipeCache();

// Debug cache on load (browser only)
if (typeof window !== 'undefined') {
    window.recipeCache = recipeCache; // Make available for debugging
    console.log('Recipe cache initialized (Browser)');
} else {
    console.log('Recipe cache initialized (Node.js)');
}

export default recipeCache; 