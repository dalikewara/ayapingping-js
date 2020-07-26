'use strict';

/**
 * Example MySQL model.
 * 
 * Example usage (in controller):
 * mod.mysql.models.example.find()
 *
 * @param {object} sequelize - sequelize instance object
 * @param {object} Sequelize - Sequelize object
 */

module.exports = function (sequelize, Sequelize) {
  var name = 'example';
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
  return MainSchema;
};