const http = require('http');
const url = require('url');
const fs = require('fs');
const replaceTemplate = require('./modules/replaceTemplate');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const htmlOverView = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  'utf-8'
);
const htmlTemplateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const htmlProduct = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  'utf-8'
);

const server = http.createServer((request, response) => {
  const pathName = request.url;
  //parse is a method in url object which receive the url as a parameter and and we can get the query and pathname
  const {query, pathname} = url.parse(pathName, true);
  // console.log(query, pathname);
  if (pathname === '/' || pathname === '/overview') {
    const html = dataObj
      .map((el) => replaceTemplate(htmlTemplateCard, el))
      .join('');
    const output = htmlOverView.replace(/{PRODUCTCARDS}/g, html);
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    response.end(output);
  } else if (pathname === '/product') {
    const product = dataObj[query.id];
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    const output = replaceTemplate(htmlProduct, product);
    response.end(output);
  } else if (pathname === '/api') {
    response.end(data);
  } else {
    response.end('Page is not Found');
  }
});

server.listen(3000, () => {
  console.log('Server is Listening...');
});

// const http = require("http");
// const pathName = require("url");
// const fs = require("fs");

// const inputFile = fs.readFileSync("./dev-data/data.json", "utf-8");
// const dataObj = JSON.parse(inputFile);
// const templateOverView = fs.readFileSync(
//   `${__dirname}/templates/overview.html`,
//   "utf-8"
// );
// const templateCard = fs.readFileSync(
//   `${__dirname}/templates/template-card.html`,
//   "utf-8"
// );

// function replaceTemplate(template, product) {
//   let output = template;
//   output = output.replace(/{PRODUCTNAME}/g, product.productName);
//   output = output.replace(/{IMAGE}/g, product.image);
//   output = output.replace(/{PRICE}/g, product.price);
//   output = output.replace(/{FROM}/g, product.from);
//   output = output.replace(/{PRODUCTNUTRIENT}/g, product.nutrients);
//   output = output.replace(/{QUANTITY}/g, product.quantity);
//   output = output.replace(/{DESCRIPTIONS}/g, product.description);
//   output = output.replace(/{ID}/g, product.id);

//   return output;
// }

// const server = http.createServer((request, response) => {
//   const pathName = request.url;

//   if (pathName === "/" || pathName === "/overview") {
//     response.statusCode = 200;
//     response.setHeader("Content-Type", "text/html");

//     // console.log(templateOverView);
//     const cardHtml = dataObj
//       .map((el) => replaceTemplate(templateCard, el))
//       .join("");

//     const op = templateOverView.replace(/{PRODUCTCARDS}/g, cardHtml);
//     // console.log(op);
//     response.end(op);
//   } else if (pathName === "/product") {
//     response.end("Hello to the Products from the Server ");
//   } else if (pathName === "/api") {
//     response.end(inputFile);
//   } else {
//     response.statusCode = 404;
//     response.setHeader("Content-Type", "text/html");
//     response.end("<h1>Page Not Found...</h1>");
//   }
// });

// server.listen(3000, () => {
//   console.log("Server is listening for the incoming requests");
// });

//NON BLOCKING-ASYNC WAY OF IO

//IMPORTING FILE SYSTEM MODULE....
// const fs = require("fs");

// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   console.log(data1);
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.writeFile("./txt/op.txt", `${data1 + data2}`, () => {
//       console.log("Successfully Written");
//     });
//   });
// });

//BLOCKING-SYNC WAY OF IO

//READING FILE
//MUST SPECIFY THE UTF OTHERWISE IT WILL RETURN THE BUFFERENCODING
// const textInput = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textInput);

//WRITING FILE
// const writeText = `This is what We Knew About Avacados :${textInput} as of Now ${new Date()} `;
// fs.writeFileSync("./txt/output.txt", writeText);
// console.log("Written Successfully");

// [1, 2, 3, 4].map((data) => {
//   console.log("hii");
// });

// let hello = "Hello World";
// console.log(hello);
