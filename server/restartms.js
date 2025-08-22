import { setTimeout } from "timers/promises";

async function checkServiceWithRetry(url, maxRetries = 6, retryDelay = 10000) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`URL: ${url}...`)
            const response = await fetch(`${url}/health`, {
                timeout: 50000 // 10 second timeout
            });
            
            if (response.status === 200) {
                console.log(`${url} is healthy`);
                return true;
            }
            
            throw new Error(`Unhealthy status code: ${response.status}`);
        } catch (error) {
            if (attempt === maxRetries) {
                console.error(`Failed after ${maxRetries} attempts:`, error);
                return false;
            }
            
            console.log(`Attempt ${attempt} failed, retrying in ${retryDelay}ms...`);
            await setTimeout(retryDelay * attempt); // Exponential backoff
        }
    }
}

async function main() {
    const microservices = [
        'https://neighborly-ai-api.onrender.com',
        'https://neighborly-auth-api.onrender.com',
        'https://neighborly-business-api.onrender.com',
        'https://neighborly-comment-api.onrender.com',
        'https://neighborly-event-api.onrender.com',
        'https://neighborly-resident-api.onrender.com'
    ];

    console.log('Checking microservice health...');
    
    const healthChecks = await Promise.all(
        microservices.map(ms => checkServiceWithRetry(ms))
    );

    const allHealthy = healthChecks.every(healthy => healthy);
    
    if (!allHealthy) {
        console.log('Not all microservices are healthy. Exiting...');
        process.exit(1);
    }

    console.log('Ready to start gateway...');
    
}

main().catch(console.error);
