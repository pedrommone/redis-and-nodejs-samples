var redis = require("redis");
var sub = redis.createClient({"host": "redis"});

sub.on("subscribe", function (channel, count) {

    var readline = require('readline');
    var rl = readline.createInterface(process.stdin, process.stdout);
    rl.setPrompt('guess> ');
    rl.prompt();
    rl.on('line', function(line) {
        if (line === "right") rl.close();
        rl.prompt();
    }).on('close',function(){
        sub.quit();
        process.exit(0);
    });

});
