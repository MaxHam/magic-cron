
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

//work around
delete configuration.baseOptions.headers['User-Agent'];

const openai = new OpenAIApi(configuration);


const generate = async(input) => {

    const prompt = `Parse this as CRON expression ${input}`

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0,
        max_tokens: 126,
      });

    console.log(`Generated output: ${response.data.choices[0].text}`)
    return response.data.choices[0].text
 }

const explain = async (input) => {
    const prompt = `Explain this CRON expression ${input}: \n`

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0,
        max_tokens: 126,
      });
    return response
 }
export { generate, explain }