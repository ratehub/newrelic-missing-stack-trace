'use strict';

if (process.env.NODE_ENV === 'production' && !process.env.NEW_RELIC_APP_NAME) {
    throw new Error('Must set NEW_RELIC_APP_NAME env var when deployed');
}

/**
 * New Relic agent configuration.
 *
 * See lib/config/default.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
exports.config = {
    agent_enabled: process.env.NEW_RELIC_ENABLED || true,

    // Array of application names.
    app_name: process.env.NEW_RELIC_APP_NAME,

    license_key: process.env.NEW_RELIC_LICENSE_KEY,

    distributed_tracing: {
        enabled: process.env.NEW_RELIC_DISTRIBUTED_TRACING_ENABLED === 'false' || true,
    },

    application_logging: {
        // We use newrelic-logging in the cluster, don't need agents to forward logs.
        forwarding: {
            enabled: false,
        },
        local_decorating: {
            enabled: true,
        },
    },
};
