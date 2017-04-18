var url = require('url');
const express = require('express');
let router = express.Router();
var models = require('./../models');
var User = models.User;
var Profile = models.Profile;
var Location = models.Location;
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
  let talents = req.body.profile.talents.filter(function(talent) {
    return talent.length > 0;
  });

  let favorites = req.body.profile.favorites.filter(function(favorite) {
    return favorite.length > 0;
  });

  let photo = 'viking_girl.jpg';
  if (req.body.profile.gender == 'male') {
    photo = 'viking_guy.jpg';
  }

  let maritalStatus = {
    1: 'Single',
    2: 'Married',
    3: 'Dating',
    4: "It's complicated",
    5: 'Married to the game'
  };

  let bodyType = {
    1: 'Built like a god',
    2: 'Built like a fish',
    3: 'Built like a ground squirrel',
    4: 'Built like a weird trapezoid',
    5: 'Barely built at all'
  };

  sequelize
    .transaction(t => {
      return Location.findOrCreate({
        defaults: { city: req.body.location.city },
        where: { city: req.body.location.city },
        transaction: t
      }).spread(location => {
        return Profile.update(
          {
            age: req.body.profile.age,
            gender: req.body.profile.gender,
            maritalStatus: maritalStatus[req.body.profile.maritalStatus],
            bodyType: bodyType[req.body.profile.bodyType],
            about: req.body.profile.about,
            height: req.body.profile.height,
            children: req.body.profile.children,
            pets: req.body.profile.pets,
            occupation: req.body.profile.occupation,
            talents: talents,
            favorites: favorites,
            whyMe: req.body.profile.whyMe,
            photo: photo,
            locationId: location.id
          },
          { where: { userId: req.body.userId } },
          { transaction: t }
        );
      });
    })
    .then(() => {
      res.redirect(`user/${req.body.userId}`);
    });
};

router.get('/user/:id', onShow);
router.get('/user/:id/edit', onEdit);
router.put('/users', onUpdate);

module.exports = router;
