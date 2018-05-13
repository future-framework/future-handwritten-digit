const KerasJS = require('keras-js')
const f = require('future-framework')
const _ = require('lodash')
const sharp = require('sharp')

module.exports = f(async ({ imageUrl }) => {
  const MODEL_FILEPATH = 'https://transcranial.github.io/keras-js-demos-data/mnist_cnn/mnist_cnn.bin'

  const model = new KerasJS.Model({
    filepath: MODEL_FILEPATH,
    gpu: false,
    transferLayerOutputs: true
  })

  await model.ready()

  const img = await sharp(imageUrl)
  await img.resize(28, 28)
  const imgBuffer = await img.toBuffer()
  const data = Float32Array.from(imgBuffer)
  const input = new Float32Array(784)

  for (let i = 0, len = data.length; i < len; i += 4) {
    input[i / 4] = data[i + 3] / 255
  }

  const {
    output,
  } = await model.predict({ input })

  return {
    value: _.indexOf(output, _.max(output)),
    percentage: _.max(output),
  }
},
{
  name: 'handwrittenDigit',
  input: {
    imageUrl: 'String!',
  },
  output: {
    value: 'Int',
    percentage: 'Float',
  },
})
