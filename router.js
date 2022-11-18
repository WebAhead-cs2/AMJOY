const handlers = require('./handlers');
const publicHandler = require('./public');

function router(request, response) {
  const { url } = request;
  if (url === '/') {
    // handlers.home(request, response);
  } else if (url.includes('job')) {
    publicHandler(request, response);
  } else {
    handlers.missing(request, response);
  }
}

module.exports = router;
