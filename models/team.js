var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TeamSchema = new Schema(
    {
        name: {type: String},
        shortcut: {type: String},
        team_leader: {type: Schema.Types.ObjectId, ref: 'Member' },
    }
);

// Virtual for book's URL
TeamSchema
    .virtual('url')
    .get(function () {
        return '/team/' + this._id;
    });

//Export model
module.exports = mongoose.model('Team', TeamSchema);
