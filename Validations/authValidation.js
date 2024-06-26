const signupSchema = {
  type: "object",
  required: ["username", "email", "password"],
  properties: {
    username: {
      type: "string",
      minLength: 1,
      maxLength: 50,
    },
    email: {
      type: "string",
      format: email,
    },
    password: {
      type: "string",
      pattern: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
      errorMessage:
        "Password should be 8 characters, must contain one uppercase English letter, must contain minimum one lowercase English letter, must contain at least one special character (#?!@$%^&*-), must contain at least one digit",
    },
  },
  additionalProperties: false,
};

const signinSchema = {
  type: "object",
  required: ["password"],
  properties: {
    username: {
      type: "string",
      minLength: 1,
      maxLength: 50,
    },
    email: {
      type: "string",
      minLength: 5,
      maxLength: 50,
    },
    password: {
      type: "string",
      minLength: 1,
    },
  },
  minProperties: 2,
  additionalProperties: false,
};

module.exports = {
  signinSchema,
  signupSchema,
};
