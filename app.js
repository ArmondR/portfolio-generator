
const fs = require("fs");

// references page template js file to use code in it
const generatePage = require("./src/page-template");

// capture user input
const profileDataArgs = process.argv.slice(2);
// stores input data in variables
const [name, github] = profileDataArgs;

//const pageHTML = generatePage(name, github);

// creates html file
fs.writeFile("index.html", generatePage(name, github), err => {
    if(err) throw new Error(err);

    console.log("Portfolio complete! Check out index.html to see the output!");
});

