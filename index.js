////////////////////////////////////////////////////////////////////////////////////////
//////// Always check to see where the README.md file is written to on line 209! ///////
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
    message: '(required) What is your full name?',
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
    message: '(required) What is your GitHub username?',
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
    message: '(required) What is your email address?',
    validate: emailInput => {
        if (emailInput) {
          return true;
        } else {
          console.log('Please enter your email!');
          return false;
        }
    }
  },
  //projectTitle
  {
    type: 'input',
    name: 'projectTitle',
    message: '(required) Provide the title of the app to add it to the README.md file:',
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
    message: '(required) Provide a description of your app, i.e. the what, why, and how:',
    validate: descriptionInput => {
        if (descriptionInput) {
          return true;
        } else {
          console.log('Please enter a description for your project!');
          return false;
        }
    }
  },
  //confirmRunNormally
  {
    type: 'confirm',
    name: 'confirmRunNormally',
    message: '(required) From the terminal, does the app run with the typical "npm start" command?',
    default: true
  },
  //runCommand
  {
    type: 'input',
    name: 'runCommand',
    message: `Type how the user should run the app from the terminal:`,
    when: ({ confirmRunNormally }) => {
      if (!confirmRunNormally) {
        return true;
      } else {
        return false;
      }
    },
    validate: descriptionInput => {
      if (descriptionInput) {
        return true;
      } else {
        console.log('Please enter something for how the user should run the app.');
        return false;
      }
  }
  },
  //projectUsage
  {
    type: 'input',
    name: 'projectUsage',
    message: '(required) Provide usage instructions for your project. In the next prompt, you will be asked whether you wish to include a GIF into your README.md file\'s Usage section:',
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
    message: `Provide the relative path, as viewed from the location of index.js. For example, if index.js is in root, and your app-gif-file is also located in root, enter the following: app-gif-file.gif
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
    message: '(required) Provide guidelines for how others may contribute to this project:',
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
    message: '(required) Provide test descriptions for this app:',
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
  writeToFile(`B:/OneDrive - Edison Energy Inc/Courses/UM Bootcamp/0. Challenges/wk18-social-network-api/README2.md`, markdownContent);
})
.catch(err => {
    console.log('The error is: ', err);
});
