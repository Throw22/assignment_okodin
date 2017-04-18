var url = require('url');
const express = require('express');
let router = express.Router();
var models = require('./../models');
var User = models.User;
var Profile = models.Profile;
var sequelize = models.sequelize;

var onIndex = (req, res) => {
  res.render('index', { title: 'OKOdin' });
};

var getLogin = (req, res) => {
  res.render('login', { title: 'OKOdin' });
};

var onLogin = (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let profile;

  sequelize.transaction(t => {
    return User.find({
      where: {
        $and: [{ username: username }, { email: email }]
      }
    }).then(user => {
      if (user) {
        // update lastLogin and redirect
        req.session.currentUser = {
          username: username,
          email: email,
          id: user.id
        };
        user.update({ lastLogin: new Date() }).then(res.redirect('/'));
      } else {
        console.log('CREATING USER');
        return Profile.findOrCreate({
          defaults: {},
          where: { userId: req.body.userId },
          transaction: t
        })
        .spread(profile => {
          // create user, set current, and redirect
          return User.create({
            username: username,
            email: email,
            profileId: profile.id,
            lastLogin: new Date(),
            transaction: t
          });
        })
        .then(user => {
          req.session.currentUser = {
            username: username,
            email: email,
            id: user.id
          };
          res.redirect(`/user/${user.id}`);
        });
      }
    });
  });
};

var onLogout = (req, res) => {
  req.session.destroy();
  req.method = 'GET';
  res.redirect('/login');
};

router.get('/', onIndex);
router.get('/login', getLogin);
router.post('/sessions', onLogin);
router.delete('/sessions', onLogout);

module.exports = router;
