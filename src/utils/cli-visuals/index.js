import chalkAnimation from 'chalk-animation'
import chalk from 'chalk'

// Local modules
import { sleep } from '../index.js'

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow('Hashtag Cancelled \n')

  await sleep()
  rainbowTitle.stop()

  console.log(`
    ${chalk.red('WELCOME TO HASHTAG CANCELLED')} 
    Before we get rid of all of the dark tweets from your past,
    we are going to need some ${chalk.underline('credentials')} 
    from your Twitter developer API.
  `)
}

export { welcome }
