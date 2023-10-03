const constantFile = require("./constant");

exports.errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constantFile.constants.VALIDATION_ERROR:
      res.json({
        title: "validation failed",
        massage: err.massage,
        stackTrace: err.stack,
      });
      break;

    case constantFile.constants.NOT_FOUND:
      res.json({
        title: "not found",
        massage: err.massage,
        stackTrace: err.stack,
      });

    case constantFile.constants.UNAUTHORIZED:
      res.json({
        title: "unauthorized",
        massage: err.massage,
        stackTrace: err.stack,
      });
    case constantFile.constants.FORBIDDEN:
      res.json({
        title: "forbidden",
        massage: err.massage,
        stackTrace: err.stack,
      });
    case constantFile.constants.SERVER_ERROR:
      res.json({
        title: "server error",
        massage: err.massage,
        stackTrace: err.stack,
      });

    default:
      console.log("No error, All good...");
      break;
  }
};
