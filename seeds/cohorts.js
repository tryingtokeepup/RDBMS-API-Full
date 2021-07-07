exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("cohorts")
    .truncate() // the diff between truncate and delete is that delete will elliminate data, but keep ghost ids; truncate will properly dispose of all data

    .then(function() {
      // Inserts seed entries
      return knex("cohorts").insert([
        { name: "Web15" },
        { name: "iOS15" },
        { name: "DS15" }
      ]);
    });
};
