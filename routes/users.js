var url = require('url');
const express = require('express');
let router = express.Router();
var models = require('./../models');
var User = models.User;
var Profile = models.Profile;
var sequelize = models.sequelize;

var helpers = require('./../helpers');
var h = helpers.registered;

var onShow = (req, res) => {
  User.findById(req.params.id, {
    include: [{ all: true, include: [{ all: true, include: [{ all: true }] }] }]
  })
    .then(user => {
      if (user) {
        let ownsPage = false;
        if (req.session.currentUser.id == user.id) {
          ownsPage = true;
        }
        res.render('users/show', { user, ownsPage });
      } else {
        res.render('/');
      }
    })
    .catch(e => res.status(500).send(e.stack));
};

router.get('/user/:id', onShow);

router.get('/user:id/edit', onShow);

module.exports = router;
