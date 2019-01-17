exports.up = function(knex, Promise) {
  return knex.schema.createTable("students", function(tbl) {
    // primary key
    tbl.increments(); // defaults to a column named id
    // other fields
    tbl.string("name", 255);
    // timestamps
    tbl.timestamps(true, true);
    // foreign key example
    tbl
      .integer("cohort_id")
      .unsigned()
      .references("id")
      .inTable("cohorts");
    // constraints
    tbl.unique("name", "uq_students_name");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("students");
};
