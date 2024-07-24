const functions = require('@google-cloud/functions-framework');
const { Datastore } = require('@google-cloud/datastore');

const datastore = new Datastore();

functions.cloudEvent('saveSupportRequest', async (cloudEvent) => {
    const message = cloudEvent.data.message;
    const data = JSON.parse(Buffer.from(message.data, 'base64').toString());

    const taskKey = datastore.key('SupportRequest');
    const entity = {
        key: taskKey,
        data: {
            name: data.name,
            email: data.email,
            issue: data.issue,
            timestamp: new Date()
        },
    };

    await datastore.save(entity);
    console.log(`Support request saved with key: ${taskKey.id}`);
});
