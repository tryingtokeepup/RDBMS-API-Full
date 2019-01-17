exports.up = function(knex, Promise) {
  return knex.schema.createTable("cohorts", function(tbl) {
    // primary key
    tbl.increments(); // defaults to a column named id
    // other fields
    tbl.string("name", 255);
    // timestamps
    tbl.timestamps(true, true);
    // foreign key example
    tbl
      .integer("category_id")
      .unsigned()
      .references("id")
      .inTable("categories");
    // constraints
    tbl.unique("name", "uq_cohorts_name");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("cohorts");
};
