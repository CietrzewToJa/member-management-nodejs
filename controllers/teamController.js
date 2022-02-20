var Member = require('../models/member');
var Team = require('../models/team');
var Role = require('../models/role');

var Team = require('../models/team');
const Console = require("console");

var async = require('async');
const {body, validationResult} = require("express-validator");

exports.team_list = function (req, res) {

    Team.find({}, 'name shortcut team_leader')
        .exec(function (err, list_teams) {
            if (err) {
                return next(err);
            }

            Console.log(list_teams);

            res.render('team_list', {title: 'Team List', team_list: list_teams});
        });
}

exports.team_detail = function (req, res) {

    Team.findOne({'id': req.params.id})
        .populate('team_leader')
        .exec(function (err, team) {
            Console.log(team)

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
    Console.log('stared')

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
        Console.log('validated')

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

        for (var all_g_iter = 0; all_g_iter < results.genres.length; all_g_iter++) {
            for (var book_g_iter = 0; book_g_iter < results.book.genre.length; book_g_iter++) {
                if (results.genres[all_g_iter]._id.toString()===results.book.genre[book_g_iter]._id.toString()) {
                    results.genres[all_g_iter].checked='true';
                }
            }
        }
        res.render('book_form', { title: 'Update Book', authors: results.authors, genres: results.genres, book: results.book });
    });
};

// Handle Author update on POST.
exports.team_update_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Author update POST');
};
