var express = require('express');
var router = express.Router();

// Require controller modules.
var member_controller = require('../controllers/memberController');
var role_controller = require('../controllers/roleController');
var team_controller = require('../controllers/teamController');

var connectEnsureLogin = require('connect-ensure-login')
var passport = require('passport')

var Console = require("console");

router.get('/login', (req, res) => {
  res.render('login');
});

router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/',
  }),
  (req, res) => {
    console.log(req.user);
  }
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

/// MEMBER ROUTES ///

router.get('/', member_controller.index);

router.get('/members', connectEnsureLogin.ensureLoggedIn(), member_controller.member_list);

router.get('/member/create', connectEnsureLogin.ensureLoggedIn(), member_controller.member_create_get);

router.post('/member/create', connectEnsureLogin.ensureLoggedIn(), member_controller.member_create_post);

router.get('/member/:id/delete', connectEnsureLogin.ensureLoggedIn(), member_controller.member_delete_get);

router.post('/member/:id/delete', connectEnsureLogin.ensureLoggedIn(), member_controller.member_delete_post);

router.get('/member/:id/update', connectEnsureLogin.ensureLoggedIn(), member_controller.member_update_get);

router.post('/member/:id/update', connectEnsureLogin.ensureLoggedIn(), member_controller.member_update_post);

router.get('/member/:id', connectEnsureLogin.ensureLoggedIn(), member_controller.member_detail);

router.get('/books', connectEnsureLogin.ensureLoggedIn(), member_controller.member_list);

/// TEAM ROUTES ///
router.get('/team/create', connectEnsureLogin.ensureLoggedIn(), team_controller.team_create_get);

router.post('/team/create', connectEnsureLogin.ensureLoggedIn(), team_controller.team_create_post);

router.get('/team/:id/delete', connectEnsureLogin.ensureLoggedIn(), team_controller.team_delete_get);

router.post('/team/:id/delete', connectEnsureLogin.ensureLoggedIn(), team_controller.team_delete_post);

router.get('/team/:id/update', connectEnsureLogin.ensureLoggedIn(), team_controller.team_update_get);

router.post('/team/:id/update', connectEnsureLogin.ensureLoggedIn(), team_controller.team_update_post);

router.get('/team/:id', connectEnsureLogin.ensureLoggedIn(), team_controller.team_detail);

router.get('/teams', connectEnsureLogin.ensureLoggedIn(), team_controller.team_list);

/// ROLES ROUTES ///
router.get('/role/create', connectEnsureLogin.ensureLoggedIn(), role_controller.role_create_get);

router.post('/role/create', connectEnsureLogin.ensureLoggedIn(), role_controller.role_create_post);

router.get('/role/:id/delete', connectEnsureLogin.ensureLoggedIn(), role_controller.role_delete_get);

router.post('/role/:id/delete', connectEnsureLogin.ensureLoggedIn(), role_controller.role_delete_post);

router.get('/role/:id/update', connectEnsureLogin.ensureLoggedIn(), role_controller.role_update_get);

router.post('/role/:id/update', connectEnsureLogin.ensureLoggedIn(), role_controller.role_update_post);

router.get('/role/:id', connectEnsureLogin.ensureLoggedIn(), role_controller.role_detail);

router.get('/roles', connectEnsureLogin.ensureLoggedIn(), role_controller.role_list);

module.exports = router;
