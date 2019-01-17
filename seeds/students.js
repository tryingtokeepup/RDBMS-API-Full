exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("students")
    .truncate() // the diff between truncate and delete is that delete will elliminate data, but keep ghost ids; truncate will properly dispose of all data

    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        { name: "Jonathan Heinz", cohort_id: "1" },
        { name: "Trevor Fehrman", cohort_id: "1" },
        { name: "Stephen Bondor", cohort_id: "1" }
      ]);
    });
};
