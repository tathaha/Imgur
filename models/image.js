var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    path = require('path');


var ImageSchema = new Schema({

    filename: {type: String},
    timestamp: {type: Date, 'default': Date.now}
});

ImageSchema.virtual('uniqueId').get(function(){
    return this.filename.replace(path.extname(this.filename), '');
});

module.exports = mongoose.model('Image', ImageSchema);