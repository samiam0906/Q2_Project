
exports.up = function(knex, Promise) {
  return knex.schema.createTable('preferences', table => {
    table.increments();
    table.time('alertTime');
    table.string('hotColor');
    table.string('coldColor');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('preferences');
};
