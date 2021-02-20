'use strict';

/**
 * Example Postgres model.
 * 
 * If you're using appjs's built in plugin called 'postgres'
 * appjs.load('postgres'), you can use & access this model
 * by using system proto variable, like this:
 *
 * > var model = proto.plugins.postgres.models.modelName;
 *
 * Note: modelName is the filename. So, if the filename is 'example',
 * your model should be like this:
 *
 * > var model = proto.plugins.postgres.models.example;
 *
 * Example usage (in controller):
 *
 * > var model = proto.plugins.postgres.models.example;
 * >
 * > model.find();
 *
 * @param {object} sequelize - sequelize instance object
 * @param {object} Sequelize - Sequelize object
 */

module.exports = function (sequelize, Sequelize) {
  var name = 'example'; // Table name
  // Table schema
  var MainSchema = sequelize.define(name,
    {
      name: {
        type: Sequelize.STRING(45),
      },
      value: {
        type: Sequelize.STRING(45),
      }
    },
    {}
  );
  // This is an example usage of association function using Sequelize [OPTIONAL].
  // MainSchema.associate = function (models) {
  //   models.example.belongsTo(models.exampleTarget, {
  //     foreignKey: 'exampleId',
  //   });
  // };
  return MainSchema;
};