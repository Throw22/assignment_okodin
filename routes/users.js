var url = require('url');
const express = require('express');
let router = express.Router();
var models = require('./../models');
var User = models.User;
var Profile = models.Profile;
var sequelize = models.sequelize;

var onShow = (req, res) => {
  User.findById(req.params.id)
  .then((user) => {
    if(user) {
      res.render('users/show', {user})
    } else {
      res.render('/');
    }
  })
  .catch((e) => res.status(500).send(e.stack));
};

router.get('/user/:id', onShow);


module.exports = router;
