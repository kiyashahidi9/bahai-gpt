import OpenAI from "openai"
import config from "../utils/config.js"

const openai = new OpenAI({
    apiKey: config.API_KEY
})

export default openai
