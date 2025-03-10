const express = require('express');
const router = express.Router();
const auth = require('../../middleware/pauth');
const { check, validationResult } = require('express-validator');
const Profile = require('../../models/Profile');
const Prof = require('../../models/Prof');
const Post = require('../../models/Post');

//@route Get api/profile/me
//@desc get current prof profile
// @ acces private

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ prof: req.prof.id }).populate(
      'prof',

      ['name', 'avatar']
    );

    if (!profile) {
      return res
        .status(400)
        .json({ msg: 'Pas de profil pour cet utilisateur' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

//@route Get api/profile
//@desc create or update prof profile
// @ acces private

router.post(
  '/',
  [
    auth,
    [
      check('status', 'Statut est requis').not().isEmpty(),
      check('classes', 'classes  est requis').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, tel, status, classes } = req.body;

    // build profile object
    const profileFields = {};
    profileFields.prof = req.prof.id;
    if (email) profileFields.email = email;
    if (tel) profileFields.tel = tel;
    if (status) profileFields.status = status;
    if (classes) {
      profileFields.classes = classes
        .split(',')
        .map((classes) => classes.trim());
    }

    try {
      let profile = await Profile.findOne({ prof: req.prof.id });

      if (profile) {
        //update
        profile = await Profile.findOneAndUpdate(
          { prof: req.prof.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      //create
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
    }
  }
);

//@route Get api/profile
//@desc get all prof profiles
// @ acces public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('prof', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});

//@route Get api/profile/prof/:prof_id
//@desc get profile by prof id
// @ acces public
router.get('/prof/:prof_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      prof: req.params.prof_id,
    }).populate('prof', ['name', 'avatar']);
    if (!profile) return res.status(400).json({ msg: 'Profil non trouvé' });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if ((err.kind = 'ObjectId')) {
      return res.status(400).json({ msg: 'Profil non trouvé' });
    }
    res.status(500).send('server error');
  }
});

//@route delete api/profile
//@desc delete profile prof& posts
// @ acces private
router.delete('/', auth, async (req, res) => {
  try {
    //remove prof posts

    await Post.deleteMany({ prof: req.prof.id });

    //remove profile
    await Profile.findOneAndRemove({ prof: req.prof.id });
    //remove prof
    await Prof.findOneAndRemove({ _id: req.prof.id });

    res.json({ msg: 'Prof supprimé ' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});
module.exports = router;
