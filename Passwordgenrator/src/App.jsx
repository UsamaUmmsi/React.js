// import { useState, useCallback, useEffect, useRef } from 'react'
// import './App.css'

// function App() {

//   const [length, setLength] = useState(8)
//   const [numberAllowed, setNumberAllowed] = useState(false)
//   const [chartAllowed, setchartAllowed] = useState(false)
//   const [password, setPassword] = useState('')

//   // UseCall cache main rakhta hai memorise karta hai

//   const passwordGenrator = useCallback(()=>{
//     let pass = ""
//     let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
//     if(numberAllowed) str += "0123456789"
//     if(chartAllowed) str += "!@#$%^&*()_+~`|}{[]:;?><,./-="
//     for (let i = 1; i <= length; i++) {
//       let char  = Math.floor(Math.random() * str.length + 1)
//       pass += str.charAt(char)
//      }
//     setPassword(pass)
//   }, [ length, numberAllowed , chartAllowed , setPassword] ) 

// // useRef se hum kisi bhi element ko reference de sakte hai

//   const passwordRef = useRef(null);



//   // useEffect call hota hai jab component render hota hai

//   useEffect(()=> {
//     passwordGenrator()
//   },[length, numberAllowed , chartAllowed, passwordGenrator]);

 

//   const copyPasswordToClipboard = useCallback(()=>{
//     passwordRef.current?.select();
//     passwordRef.current?.setSelectionRange(0,16);
//     window.navigator.clipboard.writeText(password)
//   }
// ,[password])

//   return (
//     <>
//    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-3 py-8 my-20 text-blue-500 border-1 bg-gradient-to-tr '>
//     <h1 className='text-white text-2xl font-bold text-center my-2'>Password Genrator</h1>
//     <div className='flex shadow rounded-lg overflow-hidden mb-4'>
//       <input 
//       type="text"
//       value={password}
//       className='w-full px-3 py-1 outline-none text-gray-800 font-medium bg-white'
//       placeholder='Password'
//       readOnly 
//       ref={passwordRef}
//       />
//       <button
//       onClick={copyPasswordToClipboard}
//       className='outline-none bg-blue-500 text-white px-3 py-3 shrink-0'>Copy</button>
//     </div>
//     <div className='flex text-sm gap-x-2'>
//       <div className='flex items-center gap-x-1'>
//         <input type="range"
//          min={6}
//          max={30}
//          value={length} 
//          className='cursor-pointer accent-blue-400'
//          onChange={(e)=>setLength(e.target.value)}
//          />
//          <label htmlFor="">length: {length}</label>
//       </div>
//       <div className='flex items-center gap-x-1'>
//         <input type="checkbox"
//         defaultChecked={numberAllowed}
//         id='numberInput'
//          className='cursor-pointer accent-blue-400'
//          onChange={()=> {setNumberAllowed((prev) => !prev)}}
//          />
//           <label htmlFor="numberInput">Numbers</label>
//     </div>
//       <div className='flex items-center gap-x-1'>
//         <input type="checkbox"
//         defaultChecked={chartAllowed }
//         id='numberInput'
//          className='cursor-pointer accent-blue-400'
//          onChange={()=> {setchartAllowed((prev) => !prev)}}
//          />
//           <label htmlFor="numberInput">Characters</label>
//     </div>
//   </div>
//   </div>
//     </>
//   )
// };

// export default App


import { useState, useCallback, useEffect } from "react"
import "./App.css"

function App() {
  const [length, setLength] = useState(12)
  const [includeUpper, setIncludeUpper] = useState(true)
  const [includeLower, setIncludeLower] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(false)
  const [password, setPassword] = useState("")
  const [copied, setCopied] = useState(false)

  const generatePassword = useCallback(() => {
    let chars = ""
    if (includeUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (includeLower) chars += "abcdefghijklmnopqrstuvwxyz"
    if (includeNumbers) chars += "0123456789"
    if (includeSymbols) chars += "!@#$%^&*()_+~`|}{[]:;?><,./-="

    if (chars.length === 0) {
      setPassword("")
      return
    }

    let pass = ""
    for (let i = 0; i < length; i++) {
      const idx = Math.floor(Math.random() * chars.length)
      pass += chars.charAt(idx)
    }

    setPassword(pass)
    setCopied(false)
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols])

  useEffect(() => {
    generatePassword()
  }, [generatePassword])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error(err)
    }
  }

  // strength meter (simple logic)
  const getStrength = () => {
    let score = 0
    if (includeUpper) score++
    if (includeLower) score++
    if (includeNumbers) score++
    if (includeSymbols) score++
    if (length >= 12) score++
    if (length >= 16) score++

    if (score <= 2) return "Weak"
    if (score === 3 || score === 4) return "Medium"
    return "Strong"
  }

  return (
    <div className="w-full max-w-md mx-auto shadow-lg rounded-xl px-6 py-8 my-10 text-gray-300 bg-gray-800">
      <h1 className="text-white font-bold text-center text-2xl mb-6">
        Password Generator
      </h1>

      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="w-full px-3 py-2 outline-none text-gray-800 bg-white"
          placeholder="Password"
          readOnly
        />
        <button
          onClick={copyToClipboard}
          className="outline-none bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 shrink-0"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Length: {length}</label>
        <input
          type="range"
          min={6}
          max={30}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full cursor-pointer accent-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm mb-6">
        <label className="flex items-center gap-x-2">
          <input
            type="checkbox"
            checked={includeUpper}
            onChange={() => setIncludeUpper((p) => !p)}
            className="accent-blue-500"
          />
          Uppercase
        </label>
        <label className="flex items-center gap-x-2">
          <input
            type="checkbox"
            checked={includeLower}
            onChange={() => setIncludeLower((p) => !p)}
            className="accent-blue-500"
          />
          Lowercase
        </label>
        <label className="flex items-center gap-x-2">
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers((p) => !p)}
            className="accent-blue-500"
          />
          Numbers
        </label>
        <label className="flex items-center gap-x-2">
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={() => setIncludeSymbols((p) => !p)}
            className="accent-blue-500"
          />
          Symbols
        </label>
      </div>

      <div className="flex items-center justify-between">
        <p>
          Strength:{" "}
          <span
            className={
              getStrength() === "Weak"
                ? "text-red-400"
                : getStrength() === "Medium"
                ? "text-yellow-400"
                : "text-green-400"
            }
          >
            {getStrength()}
          </span>
        </p>
        <button
          onClick={generatePassword}
          className="bg-green-600 hover:bg-green-700 transition text-white px-4 py-2 rounded-lg"
        >
          Generate
        </button>
      </div>
    </div>
  )
}

export default App

