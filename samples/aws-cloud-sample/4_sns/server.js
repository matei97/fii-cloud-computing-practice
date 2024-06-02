const AWS = require('aws-sdk');

// Configurați AWS SDK
AWS.config.loadFromPath('../config.json');

// Inițializează clientul pentru SNS
const sns = new AWS.SNS();

const createTopic = () => {
    sns.createTopic({ Name: 'fii-cloud-test-sdk' }, (err, data) => {
        if (err) {
            console.error('Eroare la crearea topicului:', err);
        } else {
            console.log('Topicul a fost creat cu succes:', data.TopicArn);
            // Salvează ARN-ul topicului pentru utilizare ulterioară
            const topicArn = data.TopicArn;
            console.log("Topic ARN: " + topicArn)
        }
    });
};

const subscribe = (topicARN) => {
    const params = {
        Protocol: 'email', // ex: 'email', 'sms'
        TopicArn: topicARN, // ARN-ul topicului creat anterior
        Endpoint: 'irimia.cosmin@gmail.com' // ex: 'email@example.com', 'phone_number'
    };

    sns.subscribe(params, (err, data) => {
        if (err) {
            console.error('Eroare la abonare:', err);
        } else {
            console.log('Abonamentul a fost creat cu succes:', data.SubscriptionArn);
            // Salvează ARN-ul abonamentului pentru utilizare ulterioară
            const subscriptionArn = data.SubscriptionArn;
            console.log("Subscription ARN: " + subscriptionArn)
        }
    });
}

const publish = (topicARN) => {
    const publishParams = {
        Message: 'Mesajul tău',
        TopicArn: topicARN // ARN-ul topicului creat anterior
    };

    sns.publish(publishParams, (err, data) => {
        if (err) {
            console.error('Eroare la trimiterea mesajului:', err);
        } else {
            console.log('Mesajul a fost trimis cu succes:', data.MessageId);
            console.log("Message ID: " + data.MessageId)
        }
    });
}

// createTopic()
let topicARN = 'arn:aws:sns:us-east-2:074977434684:fii-cloud-test-sdk'
// subscribe(topicARN)
//publish(topicARN)