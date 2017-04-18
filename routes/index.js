var url = require('url');
const express = require('express');
let router = express.Router();
var models = require('./../models');
var User = models.User;
var Profile = models.Profile;
var sequelize = models.sequelize;

router.get('/', (req, res) => {
  res.render('index', { title: 'OKOdin' });
});

router.get('/login', (req, res) => {
  res.render('login', { title: 'OKOdin' });
});

router.post('/sessions', (req, res) => {
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
        // set current user and redirect
        req.session.currentUser = {
          username: username,
          email: email,
          id: user.id
        };
        user.update({ lastLogin: new Date() }).then(res.redirect('/'));
      } else {
        return Profile.findOrCreate({
          defaults: {},
          where: { userId: req.body.userId },
          transaction: t
        })
          .spread(profile => {
            // create user, set current, and redirect
            return User.insert({
              username: username,
              email: email,
              profileId: profile.id,
              lastLogin: new Date(),
              transaction: t
            });
          })
          .then(user => {
            res.redirect(`/user/${user.id}`);
          });
      }
    });
  });

  // here, we capture the user input, and:
  // 1) check if the user exists
  // 2) If the user does NOT exist:
  //  2a) redirect them to create a profile (they are filling out a blank profile)
  // 2) If the user DOES exist:
  //  2b) redirect them to /
});

module.exports = router;
//
// var express = require('express');
// var router = express.Router();
// var models = require('./../models');

// module.exports = app => {
//   // Auth

// //   // New
//   var onNew = (req, res) => {
//     if (req.session.currentUser) {
//       res.redirect('/users');
//     } else {
//       res.render('sessions/new');
//     }
//   };
//   router.get('/', onNew);
//   router.get('/login', onNew);

//   // Create
//   router.post('/sessions', (req, res) => {
//     User.findOne({
//       username: req.body.username,
//       email: req.body.email
//     })
//       .then(user => {
//         if (user) {
//           req.session.currentUser = {
//             username: user.username,
//             email: user.email,
//             id: user.id,
//             _id: user._id
//           };
//           res.redirect('/users');
//         } else {
//           res.redirect('/login');
//         }
//       })
//       .catch(e => res.status(500).send(e.stack));
//   });

//   // Destroy
//   var onDestroy = (req, res) => {
//     req.session.currentUser = null;
//     res.redirect('/login');
//   };
//   router.get('/logout', onDestroy);
//   router.delete('/logout', onDestroy);

//   return router;
// };
