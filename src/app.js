'use strict';

import express from 'express';
import mongoUtil from './mongoUtil';
import bodyParser from 'body-parser';

const port = 3000;
const app = express();

mongoUtil.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/clubs/get/:clubName', (request, response) => {
  const clubName = request.params.clubName;
  if (!clubName) {
    response.sendStatus(400);
  }

  const clubs = mongoUtil.clubs();
  const existingClub = clubs.find({ clubName: clubName });

  if (!existingClub) {
    response.sendStatus(404);
  }

  response.sendStatus(200);
  response.body = existingClub;
});

app.post('/clubs/post', (request, response) => {
  const club = request.body.club;
  const clubs = mongoUtil.clubs();
  clubs.insert(club).then(data => {
    if (data.insertedCount === 1) {
      response.sendStatus(201);
    } else {
      response.sendStatus(500);
    }
  });
});

app.put('/clubs/put', (request, response) => {
  const club = request.body.club;
  const clubs = mongoUtil.clubs();
  clubs.update({ _id: club._id }, club).then(data => {
    if (data.modifiedCount === 1) {
      response.sendStatus(200);
    } else {
      response.sendStatus(500);
    }
  });
});

app.listen(port, err => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected on port ' + port);
  }
});
