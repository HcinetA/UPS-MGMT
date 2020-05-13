const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

//@route post api/users
//@desc Register user
// @ acces Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('NI', 'please include a valid Ni')
      .isLength({ min: 7 })
      .contains('SE'),
    check(
      'password',
      'please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
    check('classe', 'classe is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, NI, classe, password } = req.body;

    try {
      let user = await User.findOne({ NI });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'user already exists' }] });
      }

      const avatar = gravatar.url(NI, {
        s: '200',
        r: 'pg',
        d: 'm',
      });

      user = new User({
        name,
        NI,
        avatar,
        classe,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
    }
  }
);

module.exports = router;
