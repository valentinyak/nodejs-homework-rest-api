const Joi = require("joi");

const schemaCreateUser = Joi.object({
  email: Joi.string()
    .min(5)
    .max(30)
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  subscription: Joi.string().optional(),
  password: Joi.string().required(),
});

const schemaUpdateUser = Joi.object({
  email: Joi.string()
    .min(5)
    .max(30)
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .optional(),
  subscription: Joi.string().optional().valid("free", "pro", "premium"),
  password: Joi.string().optional(),
});

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj);

  if (error) {
    const [{ message }] = error.details;

    return next({
      status: 400,
      message: `Filed: ${message.replace(/"/g, "")}`,
    });
  }
  next();
};

module.exports.createUser = (req, res, next) => {
  return validate(schemaCreateUser, req.body, next);
};

module.exports.updateUser = (req, res, next) => {
  return validate(schemaUpdateUser, req.body, next);
};
