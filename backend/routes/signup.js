const router = require('express').Router();
let Account = require('../models/account.model');

const bcrypt = require('bcrypt');
const saltRouds = 10;

router.route('/').post(async (req, res) => {
  const { body } = req;
  const { username, password, fullname, email } = body;
  const newAccount = new Account({ username, password, fullname, email });

  await Account.findOne({ username })
    .then(account => {
      if (!account) {
        bcrypt.hash(password, saltRouds, async (err, hash) => {
          if (err) console.log(`Error ${err}`);
          else {
            newAccount.password = hash;
            await newAccount.save()
              .then(() => {
                const { id, username, fullname, email } = newAccount;
                res.json({ id, username, fullname, email })
              })
              .catch(err => res.status(400).json(`Error ${err}`));
          }
        });
      }
      else res.json('Account already exists');
    })
    .catch(err => res.status(400).json(`Error ${err}`));
});

module.exports = router;