
const bcrypt = require('bcrypt');
const jsonwt = require('jsonwebtoken');
const router = require('express').Router();
let Account = require('../models/account.model');
let key = require('../configs/key')

router.route('/').post(async (req, res) => {
  const { body } = req;
  const { username, password } = body;

  await Account.findOne({ username })
    .then(account => {
      if (!account) res.json('Account not exist');
      else {
        bcrypt.compare(
          password,
          account.password,
          async (err, result) => {
            if (err) console.log(`Error ${err}`);
            else if (result === true) {
              const { id, username, fullname, email } = account;
              const payload = { id, username };
              const { secret } = key;

              jsonwt.sign(
                payload,
                secret,
                { expiresIn: 3600 },
                (err, token) => {
                  if (err) console.log(`Error ${err}`);
                  res.json({
                    success: true,
                    id,
                    username,
                    fullname,
                    email,
                    token: `Bearer ${token}`,
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

