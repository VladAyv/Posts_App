/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("posts", (table) => {
    table.increments("post_id");
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("users.user_id")
      .onDelete("CASCADE");
    table.string("title").notNullable();
    table.string("subtitle").notNullable();
    table.string("content");
    table.integer("view_count").notNullable();
    table.date("creation_date");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("posts");
};
