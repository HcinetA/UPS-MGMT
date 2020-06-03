const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const pauth = require('../../middleware/pauth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Prof = require('../../models/Prof');

// @route    GET api/pauth
// @desc     Get prof by token
// @access   Private
router.get('/', pauth, async (req, res) => {
  try {
    const prof = await Prof.findById(req.prof.id).select('-password');
    res.json(prof);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/pauth
// @desc     Authenticate prof & get token
// @access   Public
router.post(
  '/',
  [
    check('SN', 'Veuillez inclure un numéro secret valide    ').exists(),
    check('password', 'Mot de passe requis').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { SN, password } = req.body;

    try {
      let prof = await Prof.findOne({ SN });

      if (!prof) {
        return res
          .status(400)
          .json({
            errors: [{ msg: 'Les informations identification invalides' }],
          });
      }

      const isMatch = await bcrypt.compare(password, prof.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({
            errors: [{ msg: 'Les informations identification invalides' }],
          });
      }

      const payload = {
        prof: {
          id: prof.id,
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
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
