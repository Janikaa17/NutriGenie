import recipeCache from '../utils/cache.js';

export async function transformRecipe(recipeData) {
  const startTime = Date.now();
  
  try {
    // Check cache first
    const cachedResult = recipeCache.get(recipeData);
    if (cachedResult) {
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      console.log(`Cache HIT - Response time: ${responseTime}ms`);
      
      // Add cache status to result
      return {
        ...cachedResult,
        _cacheStatus: 'hit',
        _responseTime: responseTime
      };
    }

    console.log('Cache MISS - Making API call...');
    
    // If not in cache, make API call
    const response = await fetch("/api/recipe-transform", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipe: recipeData }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("API error response:", response.status, errorText);
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }
    
    const result = await response.json();
    
    // Store result in cache
    recipeCache.set(recipeData, result);
    
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    console.log(`API call completed - Response time: ${responseTime}ms`);
    
    // Add cache status to result
    return {
      ...result,
      _cacheStatus: 'miss',
      _responseTime: responseTime
    };
    
  } catch (error) {
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    console.error(`API call failed after ${responseTime}ms:`, error);
    throw error;
  }
}
