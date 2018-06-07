
var async = require('async');

module.exports = function(viewModel, callback){
    async.parallel([
       
    
    ], function(err, results){
        viewModel.sidebar = {
         
        };
        callback(viewModel);
    })
}