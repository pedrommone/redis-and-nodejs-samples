// docker run --name redis --rm redis:3.2.0
// docker run -it --link redis:redis --rm redis:3.2.0 redis-cli -h redis -p 6379
// docker run -it --link redis:redis --volume ~/Desktop/LiveRedis/:/app --rm node:6.2.0 node /app/stream-out.js

var redis = require("redis");
var bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);

var sub = redis.createClient({
    "host": "redis",
});

sub.on('subscribe', function (channel, count) {
    sub.getAsync(`chave-${line}`)
        .then(data => {
            console.log(data);
        })
        .catch(err => console.log(err));
});
