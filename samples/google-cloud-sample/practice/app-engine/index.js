const express = require('express');
const { PubSub } = require('@google-cloud/pubsub');

const app = express();
const port = process.env.PORT || 8080;
const pubsub = new PubSub();

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <form action="/support" method="post">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required><br>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required><br>
            <label for="issue">Issue:</label>
            <textarea id="issue" name="issue" required></textarea><br>
            <button type="submit">Submit</button>
        </form>
    `);
});

app.post('/support', async (req, res) => {
    const { name, email, issue } = req.body;
    const message = { name, email, issue };

    const messageId = await pubsub.topic(process.env.TOPIC_NAME).publishJSON(message);
    console.log(`Message ${messageId} published.`);
    res.send('Support request submitted successfully.');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
