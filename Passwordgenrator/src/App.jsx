import { useState, useCallback, useEffect, useRef } from 'react'
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
    for (let i = 1; i <= length; i++) {
      let char  = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
     }
    setPassword(pass)
  }, [ length, numberAllowed , chartAllowed , setPassword] ) 


  const passwordRef = useRef(null);
  
// UseCall chache main rakhta hai 
// useEffect call hota hai jab component render hota hai
// useRef kisi bhi element ko reference dene ke liye use hota hai 

  useEffect(()=> {
    passwordGenrator()
  },[length, numberAllowed , chartAllowed, passwordGenrator]);

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,16);
    window.navigator.clipboard.writeText(password)
  }
,[password])

  return (
    <>
   <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-3 py-8 my-20 text-white border-2 bg-transparent'>
    <h1 className='text-white text-2xl font-bold text-center my-2'>Password Genrator</h1>
    <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input 
      type="text"
      value={password}
      className='w-full px-3 py-1 outline-none text-gray-800 font-medium bg-white'
      placeholder='Password'
      readOnly 
      ref={passwordRef}
      />
      <button
      onClick={copyPasswordToClipboard}
      className='outline-none bg-blue-500 text-white px-3 py-3 shrink-0'>Copy</button>
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input type="range"
         min={6}
         max={30}
         value={length} 
         className='cursor-pointer accent-blue-400'
         onChange={(e)=>setLength(e.target.value)}
         />
         <label htmlFor="">length: {length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox"
        defaultChecked={numberAllowed}
        id='numberInput'
         className='cursor-pointer accent-blue-400'
         onChange={()=> {setNumberAllowed((prev) => !prev)}}
         />
          <label htmlFor="numberInput">Numbers</label>
    </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox"
        defaultChecked={chartAllowed }
        id='numberInput'
         className='cursor-pointer accent-blue-400'
         onChange={()=> {setchartAllowed((prev) => !prev)}}
         />
          <label htmlFor="numberInput">Characters</label>
    </div>
  </div>
  </div>
    </>
  )
};

export default App
