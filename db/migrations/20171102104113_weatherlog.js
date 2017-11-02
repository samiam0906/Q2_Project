
exports.up = function(knex, Promise) {
  return knex.schema.createTable('weatherlog', table => {
    table.increments();
    table.decimal('lat', 10, 7);
    table.decimal('long', 10, 7);
    table.string('city');
    table.string('state');
    table.integer('temp');
    table.string('weather');
    table
    .integer('user_id')
    .references('id')
    .inTable('users')
    .onDelete('CASCADE')
    table.timestamps(true, true);

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('weatherlog');
};
