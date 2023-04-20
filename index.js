const kafka = require('kafka-node');

const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new kafka.Producer(client, [{ topic: 'test' }]);
const consumer = new kafka.Consumer(client, [{ topic: 'test' }]);

producer.on('ready', function () {
  console.log('Producer is ready');

  const message = { topic: 'test', messages: ['Hello, Kafka!'] };

  producer.send([message], function (err, data) {
    if (err) {
      console.log('Error:', err);
    } else {
      console.log('Message sent:', data);
    }
  });
});

consumer.on('message', function (message) {
  console.log('Received message:', message);
});

consumer.on('error', function (err) {
  console.log('Error:', err);
});
