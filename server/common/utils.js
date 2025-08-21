const RESET = "\x1b[0m";
const BLUE = "\x1b[34m";
const BRIGHT = "\x1b[1m";

export const formatServiceLog = (serviceName, uri) =>
  `🚀 ${serviceName} service ready at ${BLUE}${BRIGHT}${uri}${RESET}`;


export const healthCheck = (req, res) => {
    try {
        const status = {
            service: 'running',
            timestamp: new Date().toISOString(),
            memoryUsage: process.memoryUsage()
        };
        
        res.json(status);
    } catch (error) {
        console.error('Health check failed:', error);
        res.status(503).json({ 
            service: 'unhealthy',
            error: error.message,
            timestamp: new Date().toISOString() 
        });
    }
};