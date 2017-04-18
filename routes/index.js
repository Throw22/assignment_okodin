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
  let profile, userId;

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
        return User.create({
          username: username,
          email: email,
          lastLogin: new Date(),
          transaction: t
        })
        .then((user) => {
          userId = user.id;
          return Profile.findOrCreate({
            defaults: {userId: userId},
            where: { userId: userId },
            transaction: t
          })
        })
        .spread(profile => {
          return User.update({ profileId: profile.id }, {
            where: { id: userId },
            transaction: t
          });
        })
        .then(()=> {
          req.session.currentUser = {
            username: username,
            email: email,
            id: userId
          };
          res.redirect(`/user/${userId}`);
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
