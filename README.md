## Setup

Our environment for reproducing:

- `pnpm 8.15.6, probably will work with npm just fine`
- `node v20.10.0`


1. Run `pnpm install`
2. Copy `.env.example` to `.env` and fill out a newrelic api key and app name.
3. Then run `pnpm start`
4. Finally `curl http://localhost:3000` or visit that in your browser. Do this several times, you should get an http
    500.
5. Check newrelic APM and see an error similar to `connect ECONNREFUSED <IPV4>`. Clicking on this error will show a
   stack trace similar to:

```
Error: connect ECONNREFUSED 127.0.0.1:12345
    at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1595:16) 
    at TCPConnectWrap.callbackTrampoline (node:internal/async_hooks:130:17)
```

Notice that there's no reference to this codebase. The error is clearly because of our fetch, but we properly wrapped it
within a try/catch block!

Ideally this shouldn't get reported to newrelic at all as it's been handled. In the case that I'm wrong and this is
truly unhandled, I should see my code in the stack trace, so I can find where I made my mistake!

We've also included an example that uses node-fetch instead which does not show the same behaviour. You can test this
against the `/node-fetch` endpoint.

## Bonus Round

Why are http 500 errors handled differently for the two fetch cases?

1. Change `return res.status(200).send({` to send a http 500 in both of the catch blocks of the handlers.
2. Run `pnpm start`
3. `curl http://localhost:3000/`
4. Note that there ISNT any `HttpError 500` errors reported in newrelic.
4. `curl http://localhost:3000/node-fetch`
5. Note that there ARE `HttpError 500` errors reported in newrelic.