/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("user_id");
    table
      .integer("role_id")
      .unsigned()
      .notNullable()
      .references("roles.role_id")
      .onDelete("CASCADE");
    table.string("username").unique().notNullable();
    table.string("email").unique();
    table.string("password").notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
