const { DateTime } = require("luxon");

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MemberSchema = new Schema(
    {
        first_name: {type: String, required: true, maxLength: 100},
        family_name: {type: String, required: true, maxLength: 100},
        year_of_birth: {type: Date},
        payment: {type: Number, required: false},
        team: {type: Schema.Types.ObjectId, ref: 'Team', required: true},
        place_of_residence: {type: String, required: false, maxLength: 100},
        role: {type: Schema.Types.ObjectId, ref: 'Role', required: true},
        pesel: {type: String}
    }
);

// // Virtual for author's full name
// MemberSchema
//     .virtual('name')
//     .get(function () {
// // To avoid errors in cases where an author does not have either a family name or first name
// // We want to make sure we handle the exception by returning an empty string for that case
//         var fullname = '';
//         if (this.first_name && this.family_name) {
//             fullname = this.family_name + ', ' + this.first_name
//         }
//         if (!this.first_name || !this.family_name) {
//             fullname = '';
//         }
//         return fullname;
//     });
//
// // Virtual for author's lifespan
// AuthorSchema.virtual('lifespan').get(function() {
//     var lifetime_string = '';
//     if (this.date_of_birth) {
//         lifetime_string = this.date_of_birth.getYear().toString();
//     }
//     lifetime_string += ' - ';
//     if (this.date_of_death) {
//         lifetime_string += this.date_of_death.getYear()
//     }
//     return lifetime_string;
// });

MemberSchema
    .virtual('year_of_birth_formatted')
    .get(function () {
        return DateTime.fromJSDate(this.year_of_birth).year.toLocaleString(DateTime.DATE_MED);
    });

// Virtual for author's URL
MemberSchema
    .virtual('url')
    .get(function () {
        return '/member/' + this._id;
    });

//Export model
module.exports = mongoose.model('Member', MemberSchema);
