import { aj } from "../config/arcjet.js";

export const arcjetMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, {requested: 1});
        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({
                    message: "Too many requests",
                    status: "error"
                });
            }
            if (decision.reason.isBot()) {
                return res.status(403).json({
                    message: "Bot detected",
                    status: "error"
                });
            }
            return res.status(403).json({
                message: "Request denied",
                status: "error"
            });
        }
        next();
    } catch (error) {
        console.log(`Arcjet middleware error: ${error}`);
        next(error);
    }
}


