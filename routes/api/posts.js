const express = require('express');
const router = express.Router();

//@route Get api/posts
//@desc test route
// @ acces Public
router.get('/', (req, res) => res.send('posts route'));

module.exports = router;
