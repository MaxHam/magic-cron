import { useState } from 'react'
import './App.scss'
import { TextArea, CodeSnippet, CodeSnippetSkeleton, Layer, Button, Switch, ContentSwitcher } from '@carbon/react'
import { generate } from './api'

function App() {

  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState('generate')

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const handleModeChange = (e) => {
    setMode(e.name)
    setInput('')
    setOutput('')
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const output = await generate(input)
      setOutput(output)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setError(error)
      setLoading(false)
      }
    }

  return (
    <Layer className='magic-cron__container'>
      <div className='magic-cron__header'>
        <h2 className='magic-cron__header-title'>Magic Cron</h2>
        <span>A natural language interface for CRON expressions</span>
      </div>
      <div className='magic-cron__body'>
        <ContentSwitcher onChange={handleModeChange}>
          <Switch name="generate" text="Generate" />
          <Switch name="explain" text="Explain"/>
        </ContentSwitcher>
        <form  onSubmit={handleSubmit} className='magic-cron__body__input'>
          <TextArea  helperText={mode === 'generate' ? 'A description of a wanted periodic schedule': 'A CRON expression that needs explanation'} warn={!!error} warnText='Something went wrong. Try again' className='text-area' value={input}  onChange={handleChange} labelText='Input' placeholder={`${mode === 'generate' ? 'Every hour and every odd minute every second day' : ' 0 * * * *'}`}/>
          <Button className='magic-cron__body__input__button' type='submit'>{mode === 'generate' ? 'Generate' : 'Explain'}</Button>
        </form>
        <div className='magic-cron__body__output'>
          <div className='magic-cron__body__output__section'>
            <span className='cds--label'>Output</span>
            {
              loading ? <CodeSnippetSkeleton type="multi" /> : <CodeSnippet type="multi" feedback="Copied to clipboard"> { output } </CodeSnippet>
            }
          </div>
        </div>
      </div>
      <Layer className='magic-cron__footer'>
        <span>Created by <a href='https://github.com/MaxHam' rel='noreferrer' target='_blank'>Max Hammer</a></span>
        <span><a href='https://github.com/MaxHam/magic-cron' rel='noreferrer' target='_blank'>Source Code</a></span>
      </Layer>
    </Layer>
  )
}

export default App
