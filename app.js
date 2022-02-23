
const inquirer = require("inquirer");


// const fs = require("fs");

 // references page template js file to use code in it
// const generatePage = require("./src/page-template");

// const pageHTML = generatePage(name,github);

// // creates html file
// fs.writeFile("index.html", pageHTML, err => {
//     if(err) throw err;

//     console.log("Portfolio complete! Check out index.html to see the output!");
// });

inquirer
  .prompt([
      {
          type: "input",
          name: "name",
          message: "What is your name?"
      }
  ])
    .then(answers => console.log(answers));
