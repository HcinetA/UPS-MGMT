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
    check('name', 'Nom est requis').not().isEmpty(),
    check('NI', 'Veuillez inclure un numéro inscription valide')
      .isLength({ min: 7 })
      .contains('SE'),
    check(
      'password',
      'Veuillez entrer un mot de passe avec 6 caractères ou plus'
    ).isLength({ min: 6 }),
    check('classe', 'Classe est requis').not().isEmpty(),
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
          .json({ errors: [{ msg: 'Utilisateur existe déjà' }] });
      }

      const avatar = gravatar.url(NI, {
        s: '200',
        d: 'identicon',
        r: 'pg',
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
