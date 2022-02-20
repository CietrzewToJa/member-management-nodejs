var Member = require('../models/member');
var Team = require('../models/team');
var Role = require('../models/role');

var async = require('async');
const {body, validationResult} = require("express-validator");
const Console = require("console");

exports.index = function (req, res) {

    async.parallel({
        book_count: function (callback) {
            Member.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
        author_count: function (callback) {
            Team.countDocuments({}, callback);
        },
        genre_count: function (callback) {
            Role.countDocuments({}, callback);
        }
    }, function (err, results) {
        res.render('index', {title: 'Local Library Home', error: err, data: results});
    });
};

// Display list of all Authors.
exports.member_list = function (req, res) {

    Member.find({}, 'first_name family_name year_of_birth payment team place_of_residence role')
        .populate('role')
        .populate('team')
        .exec(function (err, list_members) {
            if (err) {
                return next(err);
            }

            res.render('member_list', {title: 'Member List', member_list: list_members});
        });
};

exports.member_detail = function (req, res) {

    Member.findOne({'id': req.params.id})
        .populate('role')
        .populate('team')
        .exec(function (err, member) {
            if (err) {
                return next(err);
            }

            member.save(function (err) {
                if (err) {
                    return next(err);
                }

                res.render('member_detail', {title: member.first_name + ' ' + member.family_name, member: member});
            });
        });


}

exports.member_create_get = function (req, res) {

    async.parallel({
        teams: function (callback) {
            Team.find(callback);
        },
        roles: function (callback) {
            Role.find(callback);
        },
    }, function (err, results) {
        if (err) {
            return next(err);
        }
        res.render('member_form', {title: 'Create Member', teams: results.teams, roles: results.roles});
    });
};

exports.member_create_post = [

    // Validate and sanitize the name field.
    body('first_name', 'Role name required').trim().isLength({min: 1}).escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a genre object with escaped and trimmed data.
        var member = new Member(
            {
                first_name: req.body.first_name,
                family_name: req.body.family_name,
                year_of_birth: req.body.year_of_birth,
                payment: req.body.payment,
                team: req.body.team,
                place_of_residence: req.body.place_of_residence,
                role: req.body.role,
                pesel: req.body.pesel
            }
        );

        if (!errors.isEmpty()) {
            res.render('member_form', {title: 'Create Member', member: member, errors: errors.array()});
            return;
        } else {

            Member.findOne({'pesel': req.body.pesel})
                .exec(function (err, found_member) {
                    if (err) {
                        return next(err);
                    }

                    if (found_member) {
                        res.redirect(found_member.url);
                    } else {
                        member.save(function (err) {
                            if (err) {
                                return next(err);
                            }
                            // Genre saved. Redirect to genre detail page.
                            res.redirect('/members');
                        });
                    }
                });
        }
    }
];

// Display Author delete form on GET.
exports.member_delete_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Author delete GET');
};

// Handle Author delete on POST.
exports.member_delete_post = function (req, res) {
    Member.findByIdAndRemove(req.body.id, function deleteMember(err) {
        if (err) {
            return next(err);
        }

        res.redirect('/members')
    })
};

// Display Author update form on GET.
exports.member_update_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Author update GET');
};

// Handle Author update on POST.
exports.member_update_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Author update POST');
};
