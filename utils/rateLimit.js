import rateLimit from "express-rate-limit";

// Global Rate Limiter
export const globalRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  standardHeaders: true,
});

// Auth Rate Limiter
export const authRateLimit = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  standardHeaders: true,
});
