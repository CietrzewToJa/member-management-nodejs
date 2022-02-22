var Member = require('../models/member');
var Team = require('../models/team');
var Role = require('../models/role');
var User = require('../models/user')

var Team = require('../models/team');
const Console = require("console");

var session = require('express-session');  // session middleware

var async = require('async');
const {body, validationResult} = require("express-validator");

exports.team_list = function (req, res) {

//    var user = new User({ username: 'candy', active: false }, 'cane');

//    user.save();
    Console.log('saved')
//    Console.log(user)

    User.find({}, 'username').exec(function(err, users) {
        if (err) {
            return next(err);
        }

        Console.log(users);
    })

    Team.find({}, 'name shortcut team_leader')
        .populate('team_leader')
        .exec(function (err, list_teams) {
            if (err) {
                return next(err);
            }


            res.render('team_list', {title: 'Team List', team_list: list_teams});
        });
}

exports.team_detail = function (req, res) {

    Team.findById(req.params.id)
        .populate('team_leader')
        .exec(function (err, team) {

            if (err) {
                return next(err);
            }

            team.save(function (err) {
                if (err) {
                    return next(err);
                }

                res.render('team_detail', {title: team.name, team: team});
            });
        });
};

// Display Author create form on GET.
exports.team_create_get = function (req, res) {
    res.render('team_form', {title: 'Create Team'});
};

exports.team_create_post = function (req, res, next) {

    const errors = validationResult(req);

    var team = new Team(
        {
            name: req.body.name,
            shortcut: req.body.shortcut
        }
    );

    if (!errors.isEmpty()) {
        res.render('team_form', {title: 'Create Team', team: team, errors: errors.array()});
        return;
    } else {

        Team.findOne({'shortcut': req.body.shortcut})
            .exec(function (err, found_team) {
                if (err) {
                    return next(err);
                }

                if (found_team) {
                    res.redirect(found_team.url);
                } else {
                    team.save(function (err) {
                        if (err) {
                            return next(err);
                        }

                        res.redirect('/teams');
                    });
                }
            });
    }
};

// Display Author delete form on GET.
exports.team_delete_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Author delete GET');
};

// Handle Author delete on POST.
exports.team_delete_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Author delete POST');
};

exports.team_update_get = function (req, res) {

    async.parallel({
        team: function(callback) {
            Team.findById(req.params.id).populate('team_leader').exec(callback);
        },
        members: function(callback) {
            Member.find(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.team==null) { // No results.
            var err = new Error('Book not found');
            err.status = 404;
            return next(err);
        }

        res.render('team_form', { title: 'Update Team', team: results.team, members: results.members });
    });
};

exports.team_update_post = [

//    body('title', 'Title must not be empty.').trim().isLength({ min: 1 }).escape(),
//    body('author', 'Author must not be empty.').trim().isLength({ min: 1 }).escape(),
//    body('summary', 'Summary must not be empty.').trim().isLength({ min: 1 }).escape(),
//    body('isbn', 'ISBN must not be empty').trim().isLength({ min: 1 }).escape(),
//    body('genre.*').escape(),


    (req, res, next) => {

        const errors = validationResult(req);

        var team = new Team(
          { name: req.body.name,
            shortcut: req.body.shortcut,
            team_leader: req.body.team_leader,
            _id: req.params.id //This is required, or a new ID will be assigned!
           });

        if (!errors.isEmpty()) {

            async.parallel({
                team: function(callback) {
                    Team.findById(req.params.id).populate('team_leader').exec(callback);
                },
                members: function(callback) {
                    Member.find(callback);
                },
            }, function(err, results) {
                if (err) { return next(err); }

                res.render('team_form', { title: 'Update Team', team: results.team, members: results.members, errors: errors.array() });
            });
            return;
        }
        else {
            Team.findByIdAndUpdate(req.params.id, team, {}, function (err,theteam) {

                if (err) { return next(err); }
                   res.redirect(theteam.url);
                });
        }
    }
];

