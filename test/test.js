var throttle = require('../index.js')(10);
var schedule = {6: 100, 36: 30, 96: 0}, delay=200, count=0;

function myApi(num) {
	if(throttle('test')) console.log("Call " + num + " rejected.");
	else console.log("Call " + num + " allowed.");
}

function call() {
	myApi(count);
	count+=1;
	if(schedule[count] === 0) return;
	else if(schedule[count]) delay = schedule[count];
	setTimeout(call, delay);
}

call();