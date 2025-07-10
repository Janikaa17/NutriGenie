import { useState, useEffect } from 'react';
import recipeCache from '../utils/cache.js';
import cacheAccessControl from '../utils/cacheAccessControl.js';

function CacheManager() {
    // Only show in development mode
    if (process.env.NODE_ENV !== 'development') {
        return null;
    }

    const [cacheStats, setCacheStats] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [password, setPassword] = useState('');
    const [accessError, setAccessError] = useState('');

    useEffect(() => {
        updateStats();
    }, []);

    const updateStats = () => {
        setCacheStats(recipeCache.getStats());
    };

    const clearCache = () => {
        setShowPasswordModal(true);
        setPassword('');
        setAccessError('');
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        const result = cacheAccessControl.canClearCache(password);
        
        if (result.allowed) {
            recipeCache.clear();
            updateStats();
            setShowPasswordModal(false);
            setPassword('');
            setAccessError('');
        } else {
            setAccessError(result.message);
        }
    };

    const cancelPasswordModal = () => {
        setShowPasswordModal(false);
        setPassword('');
        setAccessError('');
    };

    if (!isVisible) {
        return (
            <button
                onClick={() => setIsVisible(true)}
                className="fixed bottom-4 right-4 bg-gray-800 text-white p-2 rounded-full text-xs opacity-50 hover:opacity-100 transition-opacity"
                title="Cache Manager"
            >
                💾
            </button>
        );
    }

    return (
        <>
            <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-sm z-50">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-sm">Cache Manager</h3>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>
                
                {cacheStats && (
                    <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                            <span>Cache Size:</span>
                            <span className="font-mono">{cacheStats.size}/{cacheStats.maxSize}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Usage:</span>
                            <span className="font-mono">{Math.round((cacheStats.size / cacheStats.maxSize) * 100)}%</span>
                        </div>
                        
                        <div className="border-t pt-2 mt-2">
                            <button
                                onClick={clearCache}
                                className="w-full bg-red-500 text-white py-1 px-2 rounded text-xs hover:bg-red-600 transition-colors"
                            >
                                Clear Cache (Password Required)
                            </button>
                        </div>
                        
                        <div className="border-t pt-2 mt-2">
                            <button
                                onClick={updateStats}
                                className="w-full bg-blue-500 text-white py-1 px-2 rounded text-xs hover:bg-blue-600 transition-colors"
                            >
                                Refresh Stats
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Password Modal */}
            {showPasswordModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
                        <h3 className="font-bold text-lg mb-4">Clear Cache - Admin Access Required</h3>
                        
                        <form onSubmit={handlePasswordSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Admin Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                    placeholder="Enter admin password"
                                    required
                                />
                            </div>
                            
                            {accessError && (
                                <div className="text-red-600 text-sm bg-red-50 p-2 rounded">
                                    {accessError}
                                </div>
                            )}
                            
                            <div className="flex gap-2">
                                <button
                                    type="submit"
                                    className="flex-1 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
                                >
                                    Clear Cache
                                </button>
                                <button
                                    type="button"
                                    onClick={cancelPasswordModal}
                                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default CacheManager; 