import { z } from "zod";

// Rate Limit Configuration
interface RateLimitConfig {
    maxRequests: number;
    windowMs: number;
}

const RATE_LIMITS: Record<string, RateLimitConfig> = {
    'default': { maxRequests: 20, windowMs: 60000 }, // 20 req/min
    'auth': { maxRequests: 5, windowMs: 60000 },    // 5 login attempts/min
    'submit': { maxRequests: 3, windowMs: 60000 },   // 3 submissions/min (e.g. booking)
};

/**
 * simple client-side rate limiter using localStorage to track request timestamps.
 * @param action - Unique identifier for the action (e.g., 'book_appointment')
 * @param type - Rate limit type key (default, auth, submit)
 * @returns boolean - true if allowed, false if limited
 */
export const checkRateLimit = (action: string, type: keyof typeof RATE_LIMITS = 'default'): boolean => {
    const config = RATE_LIMITS[type];
    const storageKey = `ratelimit_${action}`;
    const now = Date.now();

    try {
        const rawData = localStorage.getItem(storageKey);
        let timestamps: number[] = rawData ? JSON.parse(rawData) : [];

        // Filter out old timestamps
        timestamps = timestamps.filter(t => now - t < config.windowMs);

        if (timestamps.length >= config.maxRequests) {
            return false;
        }

        timestamps.push(now);
        localStorage.setItem(storageKey, JSON.stringify(timestamps));
        return true;
    } catch (e) {
        console.error("Rate limit check failed", e);
        // Fail safe: allow request if local storage fails, but log it
        return true;
    }
};

/**
 * Clears rate limit data for an action
 */
export const clearRateLimit = (action: string) => {
    localStorage.removeItem(`ratelimit_${action}`);
};
