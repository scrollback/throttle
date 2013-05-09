/*
	Throttle.
	
	How to use:
	
	var throttle = require('throttler')(1000);
	
	1000 is the allowed number of requests per 'bucket' per second, where a
	bucket is an ip address, user id, combination of IP address and API
	endpoint, whatever you want.
	
	function MyApiCall(req, res) {
		if(throttle(req.connection.remoteAddress)) return;
	}
	
	Throttle returns true if the request should be ignored, false otherwise.
	
*/


module.exports = function(limit) {
	var buckets = {};
	limit = Math.floor(limit<1?1: (limit>10000? 10000: limit));
	
	return function(id) {
		var bucket, ltime, ntime = new Date().getTime() & 0x7fffffff;
		if(!buckets[id]) {
			buckets[id] = { buf: new Buffer(limit*4), top: 0 };
			buckets[id].buf.fill(0);
		}
		
		bucket = buckets[id]; ltime = bucket.buf.readUInt32LE(bucket.top*4);
		console.log(ntime - ltime);
		if(ltime && ntime - ltime < 1000 ) return true;
		bucket.buf.writeUInt32LE(ntime, bucket.top*4);
		bucket.top = (bucket.top+1)%limit;
		return false;
	};
};
