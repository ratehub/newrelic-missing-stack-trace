const fetchWithRetry = require("./util/fetchWithRetry");

// http://localhost:12345 should time out as nothing should be running on this port.
const FAKE_URL_TO_FETCH = 'http://localhost:12345';


async function indexHandler(req, res) {
    console.info('Request coming in for index handler');
    try {
        await fetchWithRetry(FAKE_URL_TO_FETCH);
    } catch (error) {
        // Catching here means newrelic should never report the error!
        console.error("Fetch failed even with retries!", error);

        return res.status(200).send({
            message: "We've handled the native undici fetch failure gracefully. We shouldn't see any newrelic errors.", error: {
                message: error.message,
                stack: error.stack,
            }
        });
    }

    console.info('Index handler finished!');

    return res.status(200).send({message: "Thanks for your message!"});
}

module.exports = indexHandler;

