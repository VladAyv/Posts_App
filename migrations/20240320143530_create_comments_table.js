/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("comments", (table) => {
    table.increments("id");
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("users.user_id")
      .onDelete("CASCADE");
    table
      .integer("post_id")
      .unsigned()
      .notNullable()
      .references("posts.post_id")
      .onDelete("CASCADE");
    table.string("comment").notNullable();
    table.date("creation_date");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("comments");
};
