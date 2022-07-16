// not in use (use incase the express-async-errors not working )

function asyncMiddleware(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = { asyncMiddleware };
