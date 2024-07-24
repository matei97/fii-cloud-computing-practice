const functions = require('@google-cloud/functions-framework');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

functions.cloudEvent('sendSupportEmail', async (cloudEvent) => {
    const message = cloudEvent.data.message;
    const data = JSON.parse(Buffer.from(message.data, 'base64').toString());
    const msg = {
        to: data.email,
        from: 'no-reply@example.com',
        subject: 'Problema receptionata',
        text: `Am inregistrat problema: ${data.issue}. Ne ocupam de aceasta. Multumim !`
    };

    await sgMail.send(msg);
    console.log('Support email sent.');
});
