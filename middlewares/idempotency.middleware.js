import redisClient from "../utils/redis.js";
export const checkIdempotency = async (req, res, next) => {
  try {
    const { idempotencyKey } = req.headers["idempotencyKey"];

    if (!idempotencyKey)
      return res
        .status(400)
        .json({ success: false, message: "Idempotency Key is required" });

    //Check if there is a record.

    const exist = await redisClient.get(`idempotency/${idempotencyKey}`);

    if (exist)
      return res.status(200).json({
        success: true,
        message: `Payment of ${exist} has already being made.`,
      });

    req.key = idempotencyKey;

    next();
  } catch (error) {
    next(error);
  }
};
