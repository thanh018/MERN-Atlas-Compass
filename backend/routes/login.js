
const bcrypt = require('bcrypt');
const jsonwt = require('jsonwebtoken');
const router = require('express').Router();
let Account = require('../models/account.model');
let key = require('../configs/key')

router.route('/').post(async (req, res) => {
  const { body } = req;
  const { name, password } = body;

  await Account.findOne({ name })
    .then(account => {
      if (!account) res.json('Account not exist');
      else {
        bcrypt.compare(
          password,
          account.password,
          async (err, result) => {
            if (err) console.log(`Error ${err}`);
            else if (result === true) {
              const { id, name } = account;
              const payload = { id, name };
              const { secret } = key;

              jsonwt.sign(
                payload,
                secret,
                { expiresIn: 3600 },
                (err, token) => {
                  if (err) console.log(`Error ${err}`);
                  res.json({
                    success: true,
                    token: 'Bearer ' + token,
                  })
                }
              );
            }
            else res.json('Account unauthorized access');
          }
        )
      }
    })
    .catch(err => res.status(400).json(`Error ${err}`));
});

module.exports = router;

