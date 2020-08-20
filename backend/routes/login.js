const router = require('express').Router();
let Account = require('../models/account.model');

const bcrypt = require('bcrypt');

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
            if (err) console.log('Error ' + err);
            else if (result === true) res.json('Account authenticated');
            else res.json('Account unauthorized access');
          }
        )
      }
    })
    .catch(err => res.status(400).json('Error ' + err));
});

module.exports = router;

