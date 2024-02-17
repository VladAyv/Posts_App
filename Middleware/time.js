const middleware = (req, res, next) => {
  req.time = new Date();
  next();
};

module.exports = middleware;
