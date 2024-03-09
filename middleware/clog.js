// Custom middleware that logs out the type and path of each request to the server
const clog = (req, res, next) => {
  const fgCyan = '\x1b[36m';
  const fgWhite = '\x1b[0m';
  switch (req.method) {
    case 'GET': {
      console.info(`📗 ${fgCyan}${req.method} request to ${req.path}${fgWhite}`);
      break;
    }
    case 'POST': {
      console.info(`📘 ${fgCyan}${req.method} request to ${req.path}${fgWhite}`);
      break;
    }
    default:
      console.log(`📙${fgCyan}${req.method} request to ${req.path}${fgWhite}`);
  }

  next();
};

exports.clog = clog;