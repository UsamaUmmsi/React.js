// import {useState, useCallback, useEffect, useRef} from "react"
// import "./App.css"

// function App() {


//   const [length, setLength] = useState(8)
//   const [numberAllowed, setNumberAllowed] = useState(false)
//   const [chartAllowed, setChartAllowed] = useState(false)
//   const [password, setPassword] = useState("")



//   const genratePassword = useCallback(()=>{
//     let pass = ""
//     let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
//     if(numberAllowed){
//       str += "0123456789"
//     }
//     if(chartAllowed){
//       str += "!@#$%^&*()_+~`|}{[]:;?><,./-="
//     }
//     for (let i = 0; i < length; i++) {
//       const char = Math.floor(Math.random()* str.length + 1 )
//       pass += str.charAt(char)
//     }setPassword(pass)
//   }, [length, numberAllowed, chartAllowed,setPassword])
//   const passwordRef = useRef(null)

//   useEffect(()=> {
//     genratePassword(password)
//   },[length, numberAllowed, chartAllowed, genratePassword])

//   const copyPasswordToClipboard = useCallback(()=>{
//     passwordRef.current.select();
//     passwordRef.current.setSelectionRange(0,32);
//     window.navigator.clipboard.writeText(password)
//   },[password])  
// return(
//   <>
//   <div className="w-full max-w-md mx-auto shadow-md rounded-2xl px-10 py-25 bg-transparent border-2 text-white">
//     <h1 className="flex text-3xl items-center justify-center font-medium">Password Genrator</h1>
//     <div className="flex shadow rounded-lg overflow-hidden mt-5 mb-4">
//       <input type="text"
//       value={password}
//       placeholder="Password"
//       ref={passwordRef}
//       readOnly
//       className="w-full px-3 py-2 outline-none font-medium text-gray-800 bg-white"
//       />
//       <button 
//       onClick={copyPasswordToClipboard}
//       className="outline-none bg-orange-500 text-white px-3 py-3 shrink-0 hover:bg-orange-400">copy</button>
//     </div>
//     <div className="flex text-sm gap-x-2">
//       <div className="flex items-center gap-x-1">
//         <input type="range" 
//         min={8}
//         max={16}
//         value={length}
//         onChange={(e)=> setLength(e.target.value)}
//         className="w-full cursor-pointer accent-orange-500"
//         />
//         <label htmlFor="">Length</label>
//       </div>
//       <div className="flex items-center gap-x-1">
//         <input type="checkbox" 
//         id="numberinput"
//         checked={numberAllowed}
//         onChange={()=> setNumberAllowed((prev) => !prev)}
//         className="cursor-pointer accent-orange-400"
//         />
//         <label htmlFor="">Numbers</label>
//       </div>
//       <div className="flex items-center gap-x-1">
//         <input type="checkbox" 
//         id="numberinput"
//         checked={chartAllowed}
//         onChange={()=> setChartAllowed((prev) => !prev)}
//         className="cursor-pointer accent-orange-400"
//         />
//         <label htmlFor="">Characters</label>
//       </div>
//     </div>
//   </div>
// </>
// )
// };

// export default App



import {useState, useCallback, useEffect,} from "react"
import React from "react"

function App() {

  const [length, setLength] = useState(8)
  const [includeUpper, setIncludeUpper] = useState(false)
  const [includeLower, setIncludeLower] = useState(false)
  const [includeNumbers, setIncludeNumbers] = useState(false)
  const [includeSymbols, setIncludeSymbols] = useState(false)
  const [password, setPassword] = useState("")
  const [copied, setCopied] = useState(false)

  const genratePassword = useCallback(()=>{
    let chars = ""
    if(includeUpper)   chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if(includeLower)   chars += "abcdefghijklmnopqrstuvwxyz"
    if(includeNumbers) chars += "0123456789"
    if(includeSymbols) chars += "!@#$%^&*()_+~`|}{[]:;?><,./-="

    if(chars.length === 0){
      setPassword("")
    return
    }
     
    let pass = ""
    for (let i = 0; i < length; i++) {
      const idx = Math.floor((Math.random()* chars.length +1))
      pass += chars.charAt(idx)
    }

    setPassword(pass)
    setCopied(false)
},[length, includeUpper, includeLower, includeNumbers, includeSymbols])

useEffect(()=> {
  genratePassword(password)
},[genratePassword])

const copyToClipboard = async ()=>{
try{
 await navigator.clipboard.writeText(password)
  setCopied(true)
  setTimeout(()=> setCopied(false),1000)
}
catch(err){
  console.error(err)
}


}
  //  strength meter (simple logic)

    const getStrength = () => {
    let score = 0
    if (includeUpper) score++
    if (includeLower) score++
    if (includeNumbers) score++
    if (includeSymbols) score++
    if (length >= 12) score++
    if (length >= 16) score++
    if (score <= 5) return "Weak"
    if (score === 10 || score === 4) return "Medium"
    return "Strong"
  }




return(
<>
<div className="w-full max-w-md mx-auto shadow-lg rounded-xl px-6 py-8 my-10 text-white bg-gray-800 border-2">
<h1 className="text-white font-bold text-center text-2xl mb-6">
   Password Genrator </h1>

<div className="flex shadow rounded-lg overflow-hidden mb-4">

  <input type="text"
  value={password}
  className="w-full px-3 py-2 outline-none text-gray-800 bg-white"
  placeholder="Password" 
  readOnly
  />
  <button 
  onClick={copyToClipboard}
  className="outline-none bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 shrink-0">
{ copied ? "Copied!" : "Copy" }
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
          onClick={genratePassword}
          className="bg-green-600 hover:bg-green-700 transition text-white px-4 py-2 rounded-lg"
        >
          Generate
        </button>
       </div>
     </div>





</>
)
};

export default App















// import { useState, useCallback, useEffect } from "react"
// import "./App.css"

// function App() {
//   const [length, setLength] = useState(12)
//   const [includeUpper, setIncludeUpper] = useState(true)
//   const [includeLower, setIncludeLower] = useState(true)
//   const [includeNumbers, setIncludeNumbers] = useState(true)
//   const [includeSymbols, setIncludeSymbols] = useState(false)
//   const [password, setPassword] = useState("")
//   const [copied, setCopied] = useState(false)

//   const generatePassword = useCallback(() => {
//     let chars = ""
//     if (includeUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
//     if (includeLower) chars += "abcdefghijklmnopqrstuvwxyz"
//     if (includeNumbers) chars += "0123456789"
//     if (includeSymbols) chars += "!@#$%^&*()_+~`|}{[]:;?><,./-="

//     if (chars.length === 0) {
//       setPassword("")
//       return
//     }

//     let pass = ""
//     for (let i = 0; i < length; i++) {
//       const idx = Math.floor(Math.random() * chars.length)
//       pass += chars.charAt(idx)
//     }

//     setPassword(pass)
//     setCopied(false)
//   }, [length, includeUpper, includeLower, includeNumbers, includeSymbols])

//   useEffect(() => {
//     generatePassword()
//   }, [generatePassword])

//   const copyToClipboard = async () => {
//     try {
//       await navigator.clipboard.writeText(password)
//       setCopied(true)
//       setTimeout(() => setCopied(false), 2000)
//     } catch (err) {
//       console.error(err)
//     }
//   }

//   // strength meter (simple logic)
//   const getStrength = () => {
//     let score = 0
//     if (includeUpper) score++
//     if (includeLower) score++
//     if (includeNumbers) score++
//     if (includeSymbols) score++
//     if (length >= 12) score++
//     if (length >= 16) score++
//     if (score <= 5) return "Weak"
//     if (score === 10 || score === 4) return "Medium"
//     return "Strong"
//   }

//   return (
//     <div className="w-full max-w-md mx-auto shadow-lg rounded-xl px-6 py-8 my-10 text-gray-300 bg-gray-800">
//       <h1 className="text-white font-bold text-center text-2xl mb-6">
//         Password Generator
//       </h1>

//       <div className="flex shadow rounded-lg overflow-hidden mb-4">
//         <input
//           type="text"
//           value={password}
//           className="w-full px-3 py-2 outline-none text-gray-800 bg-white"
//           placeholder="Password"
//           readOnly
//         />
//         <button
//           onClick={copyToClipboard}
//           className="outline-none bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 shrink-0"
//         >
//           {copied ? "Copied!" : "Copy"}
//         </button>
//       </div>

//       <div className="mb-4">
//         <label className="block mb-1">Length: {length}</label>
//         <input
//           type="range"
//           min={6}
//           max={30}
//           value={length}
//           onChange={(e) => setLength(Number(e.target.value))}
//           className="w-full cursor-pointer accent-blue-500"
//         />
//       </div>

//       <div className="grid grid-cols-2 gap-3 text-sm mb-6">
//         <label className="flex items-center gap-x-2">
//           <input
//             type="checkbox"
//             checked={includeUpper}
//             onChange={() => setIncludeUpper((p) => !p)}
//             className="accent-blue-500"
//           />
//           Uppercase
//         </label>
//         <label className="flex items-center gap-x-2">
//           <input
//             type="checkbox"
//             checked={includeLower}
//             onChange={() => setIncludeLower((p) => !p)}
//             className="accent-blue-500"
//           />
//           Lowercase
//         </label>
//         <label className="flex items-center gap-x-2">
//           <input
//             type="checkbox"
//             checked={includeNumbers}
//             onChange={() => setIncludeNumbers((p) => !p)}
//             className="accent-blue-500"
//           />
//           Numbers
//         </label>
//         <label className="flex items-center gap-x-2">
//           <input
//             type="checkbox"
//             checked={includeSymbols}
//             onChange={() => setIncludeSymbols((p) => !p)}
//             className="accent-blue-500"
//           />
//           Symbols
//         </label>
//       </div>

//       <div className="flex items-center justify-between">
//         <p>
//           Strength:{" "}
//           <span
//             className={
//               getStrength() === "Weak"
//                 ? "text-red-400"
//                 : getStrength() === "Medium"
//                 ? "text-yellow-400"
//                 : "text-green-400"
//             }
//           >
//             {getStrength()}
//           </span>
//         </p>
//         <button
//           onClick={generatePassword}
//           className="bg-green-600 hover:bg-green-700 transition text-white px-4 py-2 rounded-lg"
//         >
//           Generate
//         </button>
//        </div>
//      </div>
//   )
// }

//  export default App
 

 