const fetchWithRetryUsingNodeFetch = require("./util/fetchWithRetryUsingNodeFetch");

// http://localhost:54321 should time out as nothing should be running on this port.
const FAKE_URL_TO_FETCH = 'http://localhost:54321';


async function indexWithNodeFetchHandler(req, res) {
    console.info('Request coming in for node-fetch handler');
    try {
        await fetchWithRetryUsingNodeFetch(FAKE_URL_TO_FETCH);
    } catch (error) {
        // Catching here means newrelic should never report the error!
        console.error("Node Fetch failed even with retries!", error);

        return res.status(200).send({
            message: "We've handled the node-fetch failure gracefully. We shouldn't see any newrelic errors.", error: {
                message: error.message,
                stack: error.stack,
            }
        });
    }

    console.info('Node fetch handler finished!');

    return res.status(200).send({message: "Thanks for your message to node-fetch!"});
}

module.exports = indexWithNodeFetchHandler;

