'use strict';

/**
 * Example Mongo model.
 * 
 * Example usage (in controller):
 * mod.mongo.models.example.find()
 *
 * @param {object} mongoose - Mongoose object
 */

module.exports = function (mongoose) {
  var name = 'example';
  if (mongoose.models[name]) return mongoose.models[name];
  var Schema = mongoose.Schema;
  var MainSchema = new Schema(
    {
      name: String,
      value: String,
    },
    {}
  );
  return mongoose.model(name, MainSchema);
};
