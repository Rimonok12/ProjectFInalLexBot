const express = require('express');
const aws = require('aws-sdk');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const lexRuntime = new aws.LexRuntime({
  apiVersion: '2016-11-28',
  region: 'us-east-1',
});

app.post('/bot', (req, res) => {
  const params = {
    botAlias: '$LATEST',
    botName: 'BookATrip',
    inputText: req.body.message,
    userId: req.body.userId,
  };

  lexRuntime.postText(params, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err.message);
    } else {
      console.log(data);
      res.send(data.message);
    }
  });
});
