import { useState, useCallback } from 'react'
import './App.css'

function App() {

  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [chartAllowed, setchartAllowed] = useState(false)
  const [password, setPassword] = useState('')

  const passwordGenrator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "0123456789"
    if(chartAllowed) str += "!@#$%^&*()_+~`|}{[]:;?><,./-="
    for (let i = 1; i <= array.length; i++) {
      let char  = Math.floor(Math.random() * str.length + 1)
      pass  = str.charAt(char)
      
    }
    setPassword(pass)


  }, [ length, numberAllowed , chartAllowed , setPassword])


  return (
    <>
   <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-5 py-10 my-8 text-gray-300 bg-gray-700'>
    <h1 className='text-white font-bold text-center my-3'>Password Genrator</h1>
    <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input 
      type="text"
      value={password}
      className='w-full px-3 py-1 outline-none text-gray-400 bg-white'
      placeholder='Password'
      readOnly 
      />
      <button className='outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0'>Copy</button>
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input type="range"
         min={6}
         max={30}
         value={length} 
         className='cursor-pointer accent-blue-500'
         onChange={(e)=>setLength(e.target.value)}
         />
         <label htmlFor="">length : {length} </label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox"
        defaultChecked={numberAllowed}
        id='numberInput'
         className='cursor-pointer accent-blue-500'
         onChange={()=> {setNumberAllowed((prev) => !prev)}}
         />
      </div>
    </div>
   </div>

      
    </>
  )
};

export default App
