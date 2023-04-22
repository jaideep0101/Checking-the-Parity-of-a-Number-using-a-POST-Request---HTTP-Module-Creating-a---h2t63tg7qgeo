const http = require("http");

const server = http.createServer((req, res) => {
  if (req.method === "POST") {
    let json = null;
    let chunkArray = [];
    req.on("data", (chunk) => {
      chunkArray.push(Buffer.from(chunk));
      json = JSON.parse(chunk);
    });
    req.on("end", () => {
      const number = json.num1;
      const result = number % 2 === 0 ? "even" : "odd";
      if (result === "even") {
        res.statusCode = 200;
      } else {
        res.statusCode = 404;
      }
      res.setHeader("Content-Type", "text/plain");
      res.end(`The number ${number} is ${result}`);
    });
  }
});

module.exports = server;
