const delay = require("./delay");


const MAX_ATTEMPTS = 5;
const DELAY_BETWEEN_ATTEMPTS = 5;


/**
 * Handle automatic retries. Normally with exponential
 * backoff, though removed for this reproduction.
 */
async function fetchWithRetry(url, attempts = 0) {
    attempts++;

    try {
        return await fetch(url);
    } catch (err) {
        if (attempts >= MAX_ATTEMPTS) {
            console.error("Error fetching, will NOT retry", err);
            throw err;
        }

        console.error("Error fetching, will retry", attempts, err);
        await delay(DELAY_BETWEEN_ATTEMPTS);
        return await fetchWithRetry(url, attempts);
    }
}

module.exports = fetchWithRetry;