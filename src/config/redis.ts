import { createClient } from "redis";

export const redisClient = createClient({ url: process.env.REDIS_URL});
                
export const connectRedis = async () => {
    try{
        await redisClient.connect();
        console.log("Redis Client Connected");
    }
    catch(error) {
        console.log("Redis Client Connection Failure", error);
    }
};