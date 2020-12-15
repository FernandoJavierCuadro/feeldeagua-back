module.exports = {
  validate: (req, res, next) => {
    if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
      return res.json("invalid data on form");
    } else {
      if (req.body.name === undefined) {
        return res.json("invalid data on form");
      } else if (req.body.name.trim().length < 3) {
        return res.json("invalid data on form");
      } else if (req.body.name.trim().length > 10) {
        return res.json("invalid data on form");
      }

      if (req.body.password === undefined) {
        return res.json("invalid data on form");
      } else if (req.body.password.trim().length < 4) {
        return res.json("invalid data on form");
      } else if (req.body.password.trim().length > 10) {
        return res.json("invalid data on form");
      }

      next();
    }
  },
};
