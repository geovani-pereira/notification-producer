import {Kafka} from 'kafkajs';
import {randomUUID} from 'node:crypto'

async function bootstrap(){
    const kafka = new Kafka({
        clientId: 'notification-producer',
  brokers: ['crisp-arachnid-8615-us1-kafka.upstash.io:9092'],
  sasl: {
    mechanism: 'scram-sha-256',
    username: 'Y3Jpc3AtYXJhY2huaWQtODYxNST1yGmXObAaZMHvINQGiiEjFqiGbRJmNPGvrOc',
    password: '*kafka-password*'
  },
  ssl: true,
})
 
const producer = kafka.producer()
await producer.connect()

await producer.send({
    topic: 'notifications.send-notification',
    messages:[
        {
            value:JSON.stringify({
                content: 'Nova solicitação de amizade!',
                category: 'social',
                recipientId: randomUUID()
            })
        }
    ]
})

producer.disconnect()
}
bootstrap()