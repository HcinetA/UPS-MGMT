const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Prof = require('../../models/Prof');

//@route post api/profs
//@desc Register prof
// @ acces Public
router.post(
  '/',
  [
    check('name', 'Le nom est requis').not().isEmpty(),
    check('SN', 'Veuillez inclure un numéro secret valide')
      .isLength({ min: 7 })
      .contains('SN'),
    check(
      'password',
      'Veuillez entrer un mot de passe avec 6 caractères ou plus '
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, SN, password } = req.body;

    try {
      let prof = await Prof.findOne({ SN });
      if (prof) {
        return res.status(400).json({ errors: [{ msg: 'Prof existe déjà' }] });
      }

      const avatar = gravatar.url(SN, {
        s: '200',
        d: 'identicon',
        r: 'pg',
      });

      prof = new Prof({
        name,
        SN,
        avatar,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      prof.password = await bcrypt.hash(password, salt);

      await prof.save();

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
      res.status(500).send('server error');
    }
  }
);

module.exports = router;
