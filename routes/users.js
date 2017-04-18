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

var onEdit = (req, res) => {
  User.findById(req.params.id, {
    include: [{ all: true, include: [{ all: true, include: [{ all: true }] }] }]
  })
    .then(user => {
      if (user) {
        res.render('users/edit', { user });
      } else {
        res.render('/');
      }
    })
    .catch(e => res.status(500).send(e.stack));
};

var onUpdate = (req, res) => {
  console.log(req.body);
  sequelize.transaction(t => {
    return profile.update({
      {"profile": {
    "age": "44",
    "height": "68",
    "children": "2",
    "pets": "7 cats and 8 dogs",
    "occupation": "Supervisor",
    "talents": [
      "Ameliorated incremental implementation",
      "Business-focused national intranet",
      "I'll override the mobile SMS hard drive, that should protocol the SSL hard drive!",
      "",
      ""
    ],
    "favorites": [
      "Perspiciatis eaque libero asperiores.",
      "Nemo impedit voluptatum quia earum qui.",
      "Voluptas asperiores quia laudantium ex fuga consectetur.",
      "Eius modi soluta nihil aspernatur in.",
      "",
      ""
    ],
    "whyMe": "rich leverage niches"
  }

}, { where: (userId : req.body.userId) });
  });

  res.redirect('/');
};

router.get('/user/:id', onShow);
router.get('/user/:id/edit', onEdit);
router.put('/users', onUpdate);

module.exports = router;
