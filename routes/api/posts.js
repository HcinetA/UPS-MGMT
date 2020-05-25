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
const checkObjectId = require('../../middleware/checkObjectId');

//@router Post api/posts
//@desc create a post
//@ access private

router.post(
  '/',
  [
    pauth,
    [
      check('text', 'Text is required').not().isEmpty(),
      check('classes', 'Class is required').not().isEmpty(),
    ],
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const prof = await Prof.findById(req.prof.id).select('-password');
      const newPost = new Post({
        text: req.body.text,
        classes: req.body.classes,
        document: req.body.document,
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

//@router get api/posts/c/:classe
//@desc get post by classe name
//@ access Private

router.get('/c/:classes', auth, async (req, res) => {
  try {
    const post = await Post.find({ classes: req.params.classes });
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

//@router put  api/posts/like/:id
//@desc like a post
//@ access private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: 'Post already liked' });
    }
    post.likes.unshift({ user: req.user.id });

    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});
// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put('/like/p/:id', [pauth, checkObjectId('id')], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (post.likesporf.some((like) => like.prof.toString() === req.prof.id)) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likesporf.unshift({ prof: req.prof.id });

    await post.save();

    return res.json(post.likesporf);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
//@router put  api/posts/unlike/:id
//@desc like a post
//@ access private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }
    // get remove index
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

//@router put  api/posts/unlike/p/:id
//@desc like a post
//@ access private
router.put('/unlike/p/:id', [pauth, checkObjectId('id')], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (
      post.likesporf.filter((like) => like.prof.toString() === req.prof.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }
    // get remove index
    const removeIndex = post.likesporf
      .map((like) => like.prof.toString())
      .indexOf(req.prof.id);
    post.likesporf.splice(removeIndex, 1);
    await post.save();
    res.json(post.likesporf);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

//@router Post api/posts/comment/:id
//@desc comment on a post
//@ access private

router.post(
  '/comment/:id',
  [auth, [check('text', 'Text is required').not().isEmpty()]],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };
      post.comments.unshift(newComment);
      await post.save();
      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
    }
  }
);
//@router Post api/posts/comment/p/:id
//@desc comment on a post
//@ access private

router.post(
  '/comment/p/:id',
  [pauth, [check('text', 'Text is required').not().isEmpty()]],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const prof = await Prof.findById(req.prof.id).select('-password');
      const post = await Post.findById(req.params.id);
      const newComment = {
        text: req.body.text,
        name: prof.name,
        avatar: prof.avatar,
        prof: req.prof.id,
      };
      post.commentsprof.unshift(newComment);
      await post.save();
      res.json(post.commentsprof);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
    }
  }
);

//@router delete api/posts/comment/:id/:comment_id
//@desc delete comment
//@ access private

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    //make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }
    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(404).json({ msg: 'yser not authorized' });
    }
    // get remove index
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);
    post.comments.splice(removeIndex, 1);
    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

//@router delete api/posts/comment/p/:id/:comment_id
//@desc delete comment
//@ access private

router.delete('/comment/p/:id/:comment_id', pauth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // pull out comment
    const comment = post.commentsprof.find(
      (comment) => comment.id === req.params.comment_id
    );

    //make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }
    // Check user
    if (comment.prof.toString() !== req.prof.id) {
      return res.status(404).json({ msg: 'yser not authorized' });
    }
    // get remove index
    const removeIndex = post.commentsprof
      .map((comment) => comment.prof.toString())
      .indexOf(req.prof.id);
    post.commentsprof.splice(removeIndex, 1);
    await post.save();
    res.json(post.commentsprof);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});
module.exports = router;
