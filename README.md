throttle
========

A simple, high performance rate limiter for Node.js.


How to use:
-----------

Get a throttler function like this:

	var throttle = require('throttler')(1000);

1000 is the allowed number of requests per 'bucket' per second, where a
bucket is an ip address, user id, combination of IP address and API
endpoint, whatever you want.

And use it like this:

	function MyApiCall(req, res) {
		if(throttle(req.connection.remoteAddress)) return;
	}
	
Throttle returns true if the request should be ignored, false otherwise.