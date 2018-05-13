const _ = require('lodash')
const handwrittenDigit = require('./index')

const EXAMPLES = [
  'five',
  'three',
  'zero',
]

const run = async () => {
  _.each(EXAMPLES, async (example) => {
    console.log(`real: ${example}, extracted:`, await handwrittenDigit({ imageUrl: `./${example}.png` }))
  })
}

run()
