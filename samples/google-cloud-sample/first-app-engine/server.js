// Copyright 2016 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const process = require('process'); // Required to mock environment variables
const express = require('express');

const app = express();
app.set('view engine', 'pug');

// This middleware is available in Express v4.16.0 onwards
app.use(express.json());

// Display a form for uploading files.
app.get('/', async (req, res) => {

  await delay(2000);
  res.status(200).send('Hello World!');
});


const PORT = parseInt(process.env.PORT) || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END gae_storage_app]

module.exports = app;


function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

