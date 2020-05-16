const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const pauth = require('../../middleware/pauth');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const Prof = require('../../models/Prof');
const Uprofile = require('../../models/Uprofile');
const User = require('../../models/User');

//@router Post api/posts
//@desc create a post
//@ access private

router.post(
  '/',
  [pauth, [check('text', 'Text is required').not().isEmpty()]],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const prof = await Prof.findById(req.prof.id).select('-password');
      const newPost = new Post({
        text: req.body.text,
        name: prof.name,
        avatar: prof.avatar,
        prof: req.prof.id,
      });
      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
    }
  }
);

//@router get api/posts
//@desc get all post for logged in user
//@ access Private

router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

//@router get api/posts
//@desc get all post for logged in prof
//@ access Private

router.get('/', pauth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

//@router get api/post/:id
//@desc get post by id
//@ access Private

router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if ((err.kind = 'objectId')) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('server error');
  }
});
//@router get api/post/:id
//@desc get post by id
//@ access Private

router.get('/:id', pauth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if ((err.kind = 'objectId')) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('server error');
  }
});

//@router delete api/posts/:id
//@desc Delete a post
//@ access Private

router.delete('/:id', pauth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    // check user
    if (post.prof.toString() !== req.prof.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    await post.remove();
    res.json({ msg: 'post removed' });
  } catch (err) {
    console.error(err.message);
    if ((err.kind = 'objectId')) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('server error');
  }
});
module.exports = router;
