
exports.up = function(knex, Promise) {
  return knex.schema.createTable('locations', table => {
    table.increments();
    table.string('city').notNullable().defaultTo('');
    table.string('state').notNullable().defaultTo('');
    table.integer('temp');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('locations');
};
