// kafka.config.ts
import { Kafka, logLevel } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'nestjs-app',
  brokers: ['kafka:9092'], // Kafka broker address
  logLevel: logLevel.ERROR, // Adjust log level as needed
});


export const kafkaProducer = kafka.producer();
export const kafkaConsumer = kafka.consumer({ groupId: 'nestjs-group' });

export const connectKafka = async () => {
  await kafkaProducer.connect();
  await kafkaConsumer.connect();
};

export const disconnectKafka = async () => {
  await kafkaProducer.disconnect();
  await kafkaConsumer.disconnect();
};
