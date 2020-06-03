const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Uprofile = require('../../models/Uprofile');
const User = require('../../models/User');

//@route Get api/uprofile/me
//@desc get current user profile
// @ acces private

router.get('/me', auth, async (req, res) => {
  try {
    const uprofile = await Uprofile.findOne({ user: req.user.id }).populate(
      'user',

      ['name', 'avatar', 'classe']
    );

    if (!uprofile) {
      return res
        .status(400)
        .json({ msg: 'Pas de profil pour cet utilisateur' });
    }

    res.json(uprofile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

//@route Get api/uprofile
//@desc create or update user profile
// @ acces private

router.post(
  '/',
  [
    auth,
    [
      check('email', 'E-mail est requis').not().isEmpty(),
      check('tel', 'tel est requis').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, tel } = req.body;

    // build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (email) profileFields.email = email;
    if (tel) profileFields.tel = tel;

    try {
      let uprofile = await Uprofile.findOne({ user: req.user.id });

      if (uprofile) {
        //update
        uprofile = await Uprofile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(uprofile);
      }

      //create
      uprofile = new Uprofile(profileFields);
      await uprofile.save();
      res.json(uprofile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
    }
  }
);

//@route Get api/uprofile
//@desc get all prof profiles
// @ acces public
router.get('/', async (req, res) => {
  try {
    const uprofiles = await Uprofile.find().populate('user', [
      'name',
      'avatar',
      'classe',
    ]);
    res.json(uprofiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

//@route Get api/uprofile/user/:user_id
//@desc get profile by prof id
// @ acces public
router.get('/user/:user_id', async (req, res) => {
  try {
    const uprofile = await Uprofile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar', 'classe']);
    if (!uprofile) return res.status(400).json({ msg: 'Profil non trouvé' });

    res.json(uprofile);
  } catch (err) {
    console.error(err.message);
    if ((err.kind = 'ObjectId')) {
      return res.status(400).json({ msg: 'Profil non trouvé' });
    }
    res.status(500).send('server error');
  }
});

//@route delete api/uprofile
//@desc delete profile prof& posts
// @ acces private
router.delete('/', auth, async (req, res) => {
  try {
    //@todo - remove users posts
    //remove profile
    await Uprofile.findOneAndRemove({ user: req.user.id });
    //remove prof
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'Utilisateur supprimé' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});
module.exports = router;
