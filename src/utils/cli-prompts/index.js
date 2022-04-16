import inquirer from 'inquirer'

function validateInput(input) {
  if (input) {
    return true
  } else {
    console.error('invalid input')
    return false
  }
}

async function askForTweetFilePath() {
  const answer = await inquirer.prompt({
    name: 'file_path',
    type: 'input',
    message: 'Enter the file path',
    validate: function (input) {
      return validateInput(input)
    },
  })
}

async function askForApiCredentials() {}

export { askForTweetFilePath }
