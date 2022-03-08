////////////////////////////////////////////////////////////////////////////////////////
//////// Always check to see where the README.md file is written to on line 192! ///////
//////// Change the path to the absolute location where you need the file placed ///////
////////////////////////////////////////////////////////////////////////////////////////

// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown.js');

// TODO: Create an array of questions for user input.
// This array will be fed to Inquirer's .prompt method
const questions = [
  //name
  {
    type: 'input',
    name: 'name',
    message: 'What is your full name (required)?',
    validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your full name!');
          return false;
        }
    }
  },
  //github
  {
    type: 'input',
    name: 'github',
    message: 'What is your GitHub username (required)?',
    validate: usernameInput => {
        if (usernameInput) {
          return true;
        } else {
          console.log('Please enter your GitHub username!');
          return false;
        }
    }
  },
  //email
  {
    type: 'input',
    name: 'email',
    message: 'What is your email address (required)?',
    validate: emailInput => {
        if (emailInput) {
          return true;
        } else {
          console.log('Please enter your email!');
          return false;
        }
    }
  },
  //projecTitle
  {
    type: 'input',
    name: 'projectTitle',
    message: 'What is the name of your project to add it to the README.md file (required)?',
    validate: projectTitleInput => {
        if (projectTitleInput) {
          return true;
        } else {
          console.log('Please enter your project\'s title!');
          return false;
        }
    }
  },
  //projectDescription
  {
    type: 'input',
    name: 'projectDescription',
    message: 'Provide a good description of your project, i.e. the what, why, and how (required):',
    validate: descriptionInput => {
        if (descriptionInput) {
          return true;
        } else {
          console.log('Please enter a description for your project!');
          return false;
        }
    }
  },
  //projectInstallation
  {
    type: 'input',
    name: 'projectInstallation',
    message: 'Provide installation instructions for your project (required):',
    validate: installSteps => {
        if (installSteps) {
          return true;
        } else {
          console.log('Please give instructions for installing!');
          return false;
        }
    }
  },
  //projectUsage
  {
    type: 'input',
    name: 'projectUsage',
    message: 'Provide usage instructions for your project (required).  In the next prompt, you will be asked whether you wish to include a GIF into your README.md file\'s Usage section:',
    validate: usageInfo => {
        if (usageInfo) {
          return true;
        } else {
          console.log('Please provide usage instructions!');
          return false;
        }
    }
  },
  //confirmIncludeGif
  {
    type: 'confirm',
    name: 'confirmIncludeGif',
    message: 'Would you like to provide a relative path for inserting a short GIF showcasing usage into the README.md file you\'re creating? Note: Max upload size for GIF is 10MB.',
    default: false
  },
  //gifPath
  {
    type: 'input',
    name: 'gifPath',
    message: `Provide the relative path, as viewed from the location of index.js. For example, if index.js in in root, and your app-gif-file is located in root as well, enter the following: app-gif-file.gif
Note: Do not use spaces in your file name.`,
    when: ({ confirmIncludeGif }) => {
      if (confirmIncludeGif) {
        return true;
      } else {
        return false;
      }
    }
  },
  //projectLicense
  {
    type: 'list',
    name: 'projectLicense',
    message: 'What license is this project made under? Select one (default is none):',
    choices: ['GNU GPLv3', 'GNU LGPLv3', 'GNU AGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'Boost Software License 1.0', 'The Unlicense', 'none'],
    default: 'none'
  },
  //projectContributions
  {
    type: 'input',
    name: 'projectContribute',
    message: 'Provide guidelines for how others may contribute to this project (required):',
    validate: contributeGuidelines => {
        if (contributeGuidelines) {
          return true;
        } else {
          console.log('Please provide usage instructions!');
          return false;
        }
    }
  },
  //projectTests
  {
    type: 'input',
    name: 'projectTests',
    message: 'Provide test descriptions for this project (required):',
    validate: contributeGuidelines => {
        if (contributeGuidelines) {
          return true;
        } else {
          console.log('Please provide test description!');
          return false;
        }
    }
  }
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
      if(err) throw err;
      console.log('Writing the README.md file is complete. Have a look at it!');
    });
}

// TODO: Create a function to initialize app
// The init function prompts the user a series of questions stored in the array 'questions'
function init() {
    return inquirer.prompt(questions);
}

// Function call to initialize app
init()
// The responses to the questions are stored in the answer object which is returned as a Promise.
// The inquirer.prompt method returns a Promise which we handle by way of the .then method
.then(userAnswers => {
    // console.log('Answers are: ', userAnswers);
    // use the generateMarkdown function to take the user responses and create the README.md sections etc
    return generateMarkdown(userAnswers);
})
.then(markdownContent => {
  writeToFile(`B:/OneDrive - Edison Energy Inc/Courses/UM Bootcamp/0. Challenges/wk10-team-profile-generator/README2.md`, markdownContent);
})
.catch(err => {
    console.log('The error is: ', err);
});
