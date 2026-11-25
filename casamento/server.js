const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = Number(process.env.PORT || 4173);
const mimeTypes = {
  ".css": "text/css",
  ".html": "text/html",
  ".js": "text/javascript",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
};

http
  .createServer((request, response) => {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    const requestedPath = path.resolve(root, `.${pathname}`);

    if (requestedPath.startsWith(root) && fs.existsSync(requestedPath) && fs.statSync(requestedPath).isFile()) {
      response.writeHead(200, {
        "Content-Type": mimeTypes[path.extname(requestedPath)] || "application/octet-stream",
      });
      fs.createReadStream(requestedPath).pipe(response);
      return;
    }

    response.writeHead(200, { "Content-Type": "text/html" });
    fs.createReadStream(path.join(root, "index.html")).pipe(response);
  })
  .listen(port, "127.0.0.1", () => {
    console.log(`Servidor disponível em http://127.0.0.1:${port}`);
  });
