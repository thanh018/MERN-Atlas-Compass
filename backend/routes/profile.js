const passport = require('passport');
const router = require('express').Router();

// add token (not 'Bearer') to Auth
router.route('/').get(
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { user } = req;
    const { id, username, fullname, email } = user;
    res.json({ id, username, fullname, email });
  }
);

module.exports = router;