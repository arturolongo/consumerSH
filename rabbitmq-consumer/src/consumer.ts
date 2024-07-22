import * as amqp from 'amqplib';

const queue = 'ConsumerArturo';
const options = {
    username: "guest",
    password: "guest",
  };

async function consume() {
  try {
    const connection = await amqp.connect('amqp://44.223.115.223', options);
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: true });

    console.log(`Waiting for messages in ${queue}. To exit press CTRL+C`);

    channel.consume(queue, (msg) => {
      if (msg !== null) {
        console.log(`Received: ${msg.content.toString()}`);
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error('Error consuming messages:', error);
  }
}

consume();
