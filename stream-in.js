var redis = require("redis");
var readline = require('readline');
var bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);

var sub = redis.createClient();
var rl = readline.createInterface(process.stdin, process.stdout);


// sub.on('subscribe', function (channel, count) {
//
//
    rl.setPrompt('guess> ');
    rl.prompt();

    rl.on('line', line => {
        if (line === "quit") rl.close();

        sub.getAsync(`chave-${line}`)
          .then(data => {
            console.log(data);
            rl.prompt();
          })
          .catch(err => console.log(err));

    }).on('close', () => {
        //sub.quit();
        process.exit(0);
    });
//
// });
