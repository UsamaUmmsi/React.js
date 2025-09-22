import { useState, useCallback } from 'react'
import './App.css'

function App() {

  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [chartAllowed, setchartAllowed] = useState(false)
  const [password, setPassword] = useState('')

  const passwordGenrator = useCallback(() => {
    let pass = ""
    let str =
     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (chartAllowed) str += "!@#$%^&*()_+`-=[]{};|,.<>/?"
  }, [length, numberAllowed, chartAllowed, setPassword]) 


  return (
    <>
    <h1 className='text-6xl font-bold'>Passoword Genrator</h1>

      
    </>
  )
};

export default App
