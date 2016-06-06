// docker run -it --name redis --rm redis:3.2.0
// docker run -it --link redis:redis --rm redis:3.2.0 redis-cli -h redis -p 6379
// docker run -it --link redis:redis --volume ~/Desktop/LiveRedis/:/app --rm node:6.2.0 node /app/mark.js

var redis = require("redis"),
    bluebird = require('bluebird'),
    total = 100000;

bluebird.promisifyAll(redis.RedisClient.prototype);

client = redis.createClient({
    "host": "redis",
});

console.log(`Escrita e leitura de ${total} objetos`);

client.on("error", (err) => console.log(`Error ${err}`));

var startUnitSet = new Date().getTime();

for (i = 0; i < total; ++i) {
    client.setAsync(`chave-${i}`, `valor-${i}`)
      .then(data => data)
      .catch(err => console.log(err));
}

var endUnitSet = new Date().getTime();
var timeUnitSet = endUnitSet - startUnitSet;

console.log(`Tempo de execucao de escrita: ${timeUnitSet}ms`);

var startUnitGet = new Date().getTime();

for (j = 0; j < total; ++j) {
  client.getAsync(`chave-${j}`)
    .then(console.log)
    .catch(err => console.log(err));
}

var endUnitGet = new Date().getTime();
var timeUnitGet = endUnitGet - startUnitGet;

console.log(`Tempo de execucao de leitura: ${timeUnitGet}ms`);

client.quit();

process.exit();
