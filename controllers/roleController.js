var Role = require('../models/role');
const {body, validationResult} = require("express-validator");
const Team = require("../models/team");

// Display list of all Genre.
exports.role_list = function(req, res, next) {

    Role.find({}, 'name')
        .exec(function (err, list_roles) {
            if (err) { return next(err); }
            //Successful, so render
            res.render('role_list', { title: 'Role List', role_list: list_roles });
        });
};

// Display detail page for a specific Genre.
exports.role_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre detail: ' + req.params.id);
};

// Display Author create form on GET.
exports.role_create_get = function(req, res) {
    res.render('role_form', { title: 'Create Role' });
};

// Handle Genre create on POST.
exports.role_create_post =  [

    // Validate and sanitize the name field.
    body('name', 'Role name required').trim().isLength({ min: 1 }).escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a genre object with escaped and trimmed data.
        var role = new Role(
            { name: req.body.name }
        );

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.render('role_form', { title: 'Create Role', role: role, errors: errors.array()});
            return;
        }
        else {
            // Data from form is valid.
            // Check if Genre with same name already exists.
            Role.findOne({ 'name': req.body.name })
                .exec( function(err, found_role) {
                    if (err) { return next(err); }

                    if (found_role) {
                        // Genre exists, redirect to its detail page.
                        res.redirect(found_role.url);
                    }
                    else {

                        role.save(function (err) {
                            if (err) { return next(err); }
                            // Genre saved. Redirect to genre detail page.
                            res.redirect(role.url);
                        });
                    }
                });
        }
    }
];
// Display Genre delete form on GET.
exports.role_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete GET');
};

// Handle Genre delete on POST.
exports.role_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre delete POST');
};

// Display Genre update form on GET.
exports.role_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update GET');
};

// Handle Genre update on POST.
exports.role_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Genre update POST');
};
