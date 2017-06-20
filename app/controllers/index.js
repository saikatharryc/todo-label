/**
 *
 * This file should contain the base path for each of the different
 * kinds of users that we have in our system and import the corresponding
 * routes for that particular user.
 *
 * For examples: /cashpositive/api/v1/<ENTITY>
 *
 * We define the ENTITY base route here and import all it's subroute and attach
 * to it.
 *
 */

const express = require('express');


const router = express.Router();


function somefunc(req, res,next) {
  res.send('hi');
}

router.get('/', somefunc);

module.exports = router;
