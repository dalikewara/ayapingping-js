'use strict';

/**
 * Example Mongo model.
 * 
 * If you're using appjs's built in plugin called 'mongo'
 * appjs.load('mongo'), you can use & access this model
 * by using system proto variable, like this:
 * 
 * > var model = proto.plugins.mongo.models.modelName;
 * 
 * Note: modelName is the filename. So, if the filename is 'example',
 * your model should be like this:
 * 
 * > var model = proto.plugins.mongo.models.example;
 * 
 * Example usage (in controller):
 * 
 * > var model = proto.plugins.mongo.models.example;
 * >
 * > model.find();
 *
 * @param {object} mongoose - Mongoose object
 */

module.exports = function (mongoose) {
  var name = 'example'; // Collection name
  if (mongoose.models[name]) return mongoose.models[name];
  var Schema = mongoose.Schema;
  // Collection schema
  var MainSchema = new Schema(
    {
      name: String,
      value: String,
    },
    {}
  );
  return mongoose.model(name, MainSchema);
};
