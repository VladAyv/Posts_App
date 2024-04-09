const { Model } = require("objection");
const { User } = require("./userModel");

class Role extends Model {
  static get tableName() {
    return "roles";
  }

  static get idColumn() {
    return "role_id";
  }
  static get jsonSchema() {
    return {
      type: "object",

      properties: {
        role_id: { type: "integer" },
        role_name: { type: "string" },
        created_at: { type: "timestamp" },
        updated_at: { type: "timestamp" },
      },
    };
  }

  static get relationMapping() {
    return {
      users: {
        relation: Model.HasManyRelation,
        modelClass: User,
        join: {
          from: "roles.role_id",
          to: "users.role_id",
        },
      },
    };
  }
}

module.exports = Role;
