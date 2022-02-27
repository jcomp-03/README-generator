/*
AS A developer
I WANT a README generator
SO THAT I can quickly create a professional README for a new project

GIVEN a command-line application that accepts user input
WHEN I am prompted for information about my application repository
THEN a high-quality, professional README.md is generated with the title of my project and sections entitled Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions
WHEN I enter my project title
THEN this is displayed as the title of the README
WHEN I enter a description, installation instructions, usage information, contribution guidelines, and test instructions
THEN this information is added to the sections of the README entitled Description, Installation, Usage, Contributing, and Tests
WHEN I choose a license for my application from a list of options
THEN a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under
WHEN I enter my GitHub username
THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile
WHEN I enter my email address
THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions
WHEN I click on the links in the Table of Contents
THEN I am taken to the corresponding section of the README
 */

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
  message: 'Provide usage instructions for your project (required):',
  validate: usageInfo => {
      if (usageInfo) {
      return true;
      } else {
      console.log('Please provide usage instructions!');
      return false;
      }
  }
  },
  //confirmIncludeVideo
  {
    type: 'confirm',
    name: 'confirmIncludeVideo',
    message: 'Would you like to provide a relative path for inserting a video or GIF into the README.md file that will be created?',
    default: false
  },
  //videoPath
  {
    type: 'input',
    name: 'videoPath',
    message: 'Provide the relative path, as viewed from the location of the file index.js',
    when: ({ confirmIncludeVideo }) => {
      if (confirmIncludeVideo) {
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
    })
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
  console.log(markdownContent);
  writeToFile('./README.md', markdownContent);
})
.catch(err => {
    console.log('The error is: ', err);
});
