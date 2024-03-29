import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello World'
  })
})

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt

    const response = await openai.createCompletion({
      model: 'gpt-3.5-turbo-model',
      prompt: `${prompt}`,
      temperature: 0,
      max_tokens: 4000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0
    })

    res.status(200).send({
      bot: response.data.choices[0].text
    })
  } catch (err) {
    console.log(err)
    res.status(500).send({ err })
  }
})

const port = process.env.PORT || 5000

app.listen(port, () =>
  console.log(`Server is running on port http://localhost:${port}`)
)
