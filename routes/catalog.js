var express = require('express');
var router = express.Router();

// Require controller modules.
var member_controller = require('../controllers/memberController');
var role_controller = require('../controllers/roleController');
var team_controller = require('../controllers/teamController');

/// BOOK ROUTES ///

// GET catalog home page.
router.get('/', member_controller.index);

router.get('/members', member_controller.member_list);

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get('/member/create', member_controller.member_create_get);

// POST request for creating Book.
router.post('/member/create', member_controller.member_create_post);

// GET request to delete Book.
router.get('/member/:id/delete', member_controller.member_delete_get);

// POST request to delete Book.
router.post('/member/:id/delete', member_controller.member_delete_post);

// GET request to update Book.
router.get('/member/:id/update', member_controller.member_update_get);

// POST request to update Book.
router.post('/member/:id/update', member_controller.member_update_post);

// GET request for one Book.
router.get('/member/:id', member_controller.member_detail);

// GET request for list of all Book items.
router.get('/books', member_controller.member_list);

/// AUTHOR ROUTES ///

// GET request for creating Author. NOTE This must come before route for id (i.e. display author).
router.get('/team/create', team_controller.team_create_get);

// POST request for creating Author.
router.post('/team/create', team_controller.team_create_post);

// GET request to delete Author.
router.get('/team/:id/delete', team_controller.team_delete_get);

// POST request to delete Author.
router.post('/team/:id/delete', team_controller.team_delete_post);

// GET request to update Author.
router.get('/team/:id/update', team_controller.team_update_get);

// POST request to update Author.
router.post('/team/:id/update', team_controller.team_update_post);

// GET request for one Author.
router.get('/team/:id', team_controller.team_detail);

// GET request for list of all Authors.
router.get('/teams', team_controller.team_list);

/// GENRE ROUTES ///

// GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
router.get('/role/create', role_controller.role_create_get);

//POST request for creating Genre.
router.post('/role/create', role_controller.role_create_post);

// GET request to delete Genre.
router.get('/role/:id/delete', role_controller.role_delete_get);

// POST request to delete Genre.
router.post('/role/:id/delete', role_controller.role_delete_post);

// GET request to update Genre.
router.get('/role/:id/update', role_controller.role_update_get);

// POST request to update Genre.
router.post('/role/:id/update', role_controller.role_update_post);

// GET request for one Genre.
router.get('/role/:id', role_controller.role_detail);

// GET request for list of all Genre.
router.get('/roles', role_controller.role_list);

module.exports = router;
