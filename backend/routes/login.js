
const bcrypt = require('bcrypt');
const jsonwt = require('jsonwebtoken');
const router = require('express').Router();
let Account = require('../models/account.model');
let key = require('../configs/key');
const { 
  ERROR,
  BEARER,
  EXPIRED_TIME,
  WRONG_PASSWORD,
  ACCOUNT_NOT_EXIST
} = require('../constants/common');

router.route('/').post(async (req, res) => {
  const { body } = req;
  const { username, password } = body;

  await Account.findOne({ username })
    .then(account => {
      if (!account) res.json(ACCOUNT_NOT_EXIST);
      else {
        bcrypt.compare(
          password,
          account.password,
          async (err, result) => {
            if (err) console.log(`${ERROR} ${err}`);
            else if (result === true) {
              const { id, username, fullname, email } = account;
              const payload = { id, username };
              const { secret } = key;

              jsonwt.sign(
                payload,
                secret,
                { expiresIn: EXPIRED_TIME },
                (err, token) => {
                  if (err) console.log(`${ERROR} ${err}`);
                  res.json({
                    success: true,
                    id,
                    username,
                    fullname,
                    email,
                    token: `${BEARER} ${token}`,
                  })
                }
              );
            }
            else res.json(WRONG_PASSWORD);
          }
        )
      }
    })
    .catch(err => res.status(400).json(`Error ${err}`));
});

module.exports = router;

