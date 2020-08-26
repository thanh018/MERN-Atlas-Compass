const router = require('express').Router();
let Company = require('../models/company.model');

router.route('/').get((req, res) =>
 Company.find()
  .then(company => res.json(company))
  .catch(err => res.status(400).json(`Error ${err}`))
);

router.route('/add').post((req, res) => {
 const { body } = req;
 const { name, startedDate, endedDate, technical } = body;

 const newCompany = new Company({
  name,
  startedDate,
  endedDate,
  technical,
 });

 newCompany.save()
  .then(() => res.json(newCompany))
  .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
