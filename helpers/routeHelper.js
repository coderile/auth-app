//Import JOI
const JOI = require("joi");
//Module.export
module.exports = {
  authenticateBody: schema => {
    return (req, res, next) => {
      const result = JOI.validate(req.body, schema);
      if (result.error) {
        res.status(400).json(result.error);
      }
      if (!result.error) {
        req.value = {};
      }
      req.value["body"] = result.value;
      next();
    };
  },
  schema: {
    authSchema: JOI.object().keys({
      email: JOI.string()
        .required()
        .email(),
      password: JOI.string().required()
    })
  }
};
//validate the schema function
//Schema
