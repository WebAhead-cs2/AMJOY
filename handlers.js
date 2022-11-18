/* const fs = require('fs');
const path = require('path');

 const types = {
  html: 'text/html',
  css: 'text/css',
  js: 'application/javascript',
  ico: 'image/x-icon',
  jpg: 'image/jpeg',
  mp3: 'audio/mpeg',
  aac: 'audio/aac',
}; */
function layout(content) {
  return `
      <doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Error-handling workshop</title>
        </head>
        <body>
          ${content}
        </body>
      </html>
    `;
}
function missing(request, response) {
  response.writeHead(404, { 'content-type': 'text/html' });
  const html = layout('<h1>Not found</h1>');
  response.end(html);
}
/* function publicHandler(request, response) {
    const url = request.url;
    const array = url.split('.');
    const extension = array[1];
    const type = types[extension];
    const filePath = path.join(__dirname, '..', url);
    fs.readFile(filePath, (error, file) => {
      if (error) {
        response.writeHead(404, {'content-header': 'text/html'});
        response.end('<h1>Not Found</h1>');
      } else {
        response.writeHead(200, {'content-header': type});
        response.end(file);
      }
    });
  }
  module.exports = publicHandler; */
/* else if (url.includes('src/Public')) {
    publicHandler(request, response); */

/* function home(request, response) {
  const filePath = path.join(__dirname, '..', request.url);
  console.log(__dirname);
  console.log(request.url);
  fs.readFile(filePath, (err, file) => {
    if (err) {
      console.log('error is', err.message);
      response.writeHead(404, { 'content-header': 'text/html' });
      response.end('<h1>Not Found!!!!!!!!!!</h1>');
    } else { // publicHandler
      const urlArray = request.url.split('.');
      const extention = urlArray[1];
      const type = types[extention];
      console.log(extention);
       if (type === undefined) {
        response.writeHead(200, { 'content-type': 'text/html' });
        //response.write(html);
        response.end(html);
      } else {
      response.writeHead(200, { 'content-type': type });
      // response.write(html);
      response.end(file);
      // }
    }
  });
} */
module.exports = { /* home, */ missing };
