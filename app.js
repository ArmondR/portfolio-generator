
const { prompt } = require("inquirer");
const inquirer = require("inquirer");

// // imports object from "generate-site.js": generateSite.writeFile() & generateSite.copyFile()
// const generateSite = require("./utils/generate-site.js");

// simplified above code using destructuring
const {writeFile, copyFile} = require("./utils/generate-site.js");

 //references page template js file to use code in it
const generatePage = require("./src/page-template");




const promptUser = () => {
  return inquirer.prompt([

      {
          type: "input",
          name: "name",
          message: "What is your name? (Required)",
          validate: nameInput => {
              if(nameInput) {
                  return true;
              } else{
                  console.log("Please enter your name!");
                  return false;
              }
          }
      },
      {
        type: "input",
        name: "github",
        message: "Enter your GitHub Username (Required)",
        validate: nameInput => { 
            if(nameInput) {
                return true;
      }else {
          console.log("Please enter your GitHub username!");
      }
    }   
    },
      {
          type: "confirm",
          name: "confirmAbout",
          message: "Would you like to enter some information about yourself for an 'About' section?",
          default: true
      },
      {
          type: "input",
          name: "about",
          message: "Provide some information about yourself:",
          when: ({ confirmAbout }) => {
              if (confirmAbout) {
                  return true;
              }else {
                  return false;
              }             
          } 
      },
  ]);
};
    

const promptProject = portfolioData => {

    // If there is no 'projects' array property, create one
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }
    

    console.log(`
    ======================
    Add a New Project
    ======================
    `);
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of your project? (Required)",
            validate: nameInput => {
                if(nameInput) {
                    return true;
                }else {
                    console.log("Please enter project name!");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "description",
            message: "Provide a description of the project. (Required)",
            validate: projectDescription => {
                if(projectDescription) {
                    return true;
                }else{
                    console.log("Please add a description!")
                    return false;
                }
            }
        },
        {
            type: "checkbox",
            name: "languages",
            message: "What did you build this project with? (Check all that apply)",
            choices: ["JavaScript", "HTML", "CSS", "ES6", "jQuery", "Bootstrap", "Node"]
        },
        {
            type: "input",
            name: "Project GitHub link",
            message: "Enter the GitHub link to your project. (Required)",
            validate: githubLink => {
                if(githubLink) {
                    return true;
                }else{
                    console.log("Please add a GitHub link!");
                    return false;
                }
            }
        },
        {
            type: "confirm",
            name: "feature",
            message: "Would you like to feature this project?",
            default: false
        },
        {
            type: "confirm",
            name: "confirmAddProject",
            message: "Would you like to enter another project?",
            defult: false
        }
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
            return promptProject(portfolioData);
        } else {
            return portfolioData;
        }
    });
};

promptUser()
  .then(promptProject)
  .then(portfolioData => {
      return generatePage(portfolioData);
  })
  .then(pageHTML => {
      return writeFile(pageHTML);
  })
  .then(writeFileResponse => {
      console.log(writeFileResponse);
      return copyFile();
  })
  .then(copyFileResponse => {
      console.log(copyFileResponse);
  })
  .catch(err => {
      console.log(err);
  });

// promptUser()
// .then(promptProject)
// .then(portfolioData => {
//     const pageHTML = generatePage(portfolioData);



// // creates html file
// fs.writeFile("./dist/index.html", pageHTML, err => {
//     if(err) throw new Error(err);

//     console.log("Page created! Check out index.html in this directory to see it!");

//     fs.copyFile("./src/style.css", "./dist/style.css", err =>{
//         if(err) {
//             console.log(err);
//               return;
//         }
//         console.log("style sheet copied successfully!");
//     });
// });
// });

