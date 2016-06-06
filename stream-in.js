// docker run --name redis --rm redis:3.2.0
// docker run -it --link redis:redis --rm redis:3.2.0 redis-cli -h redis -p 6379
// docker run -it --link redis:redis --volume ~/Desktop/LiveRedis/:/app --rm node:6.2.0 node /app/stream-in.js

var redis = require("redis");
var readline = require('readline');
var bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);

var sub = redis.createClient();
var rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt('digite> ');
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
    process.exit(0);
});