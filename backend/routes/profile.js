const passport = require('passport');
const router = require('express').Router();

router.route('/').get(
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { user } = req;
    const { id, name } = user;
    res.json({ id, name });
  }
);

module.exports = router;