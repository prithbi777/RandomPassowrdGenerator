import { useCallback, useEffect, useRef, useState } from 'react'
// import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllow, setnumberAllow] = useState(false)
  const [charAllow, setcharAllow] = useState(false)
  const [password, setpassword] = useState("")
  






  const passwordGenerator = useCallback(() =>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllow) str += "0123456789"
    if(charAllow) str += "@#$%&*!+-/"

    for (let i = 1; i <=length; i++) {
        let char = Math.floor(Math.random()*str.length +1)
        pass += str.charAt(char)
    }
    setpassword(pass)

  }, [length, numberAllow, charAllow, setpassword])
 
 
 
  const passwordRef = useRef(null)



  const copypassword = useCallback(() =>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
    alert("Password Copied!")


  }, [password])



  useEffect(() => {
    passwordGenerator()

  }, [length, setnumberAllow, setcharAllow, passwordGenerator])


 



  return (

    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-white text-black">
      <h1 className='text-black text-4xl font-bold text-center my-3'>Password Generator!</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
      />
      <button
        onClick={copypassword}
        className='outline-none font-bold bg-yellow-300 text-black px-3 py-0.5 shrink-0'
        >Copy</button>

      

      </div>

      <div className='flex text-sm gap-x-2'>



      <div className='flex items-center gap-x-1'>
       <input 
       type="range"
       min={8}
       max={15}
       value={length}
       className='cursor-pointer'
       onChange={(e) => {setLength(e.target.value)}}
       />
       <label className='font-bold' htmlFor="">Length: {length}</label>
      </div>



      <div className='flex items-center gap-x-1'>
        <input 
        type="checkbox"
        defaultChecked = {numberAllow}
        id='numberInput'
        onChange={() =>{
          setnumberAllow((prev) => !prev)
        }}
        />
        <label className='font-bold' htmlFor="">Numbers</label>
      </div>




      <div className='flex items-center gap-x-1'>
        <input type="checkbox"
        defaultChecked = {charAllow}
        id='characterInput'
        onChange={() => {
                  setcharAllow((prev) => !prev )
        }}
        />
        <label className='font-bold' htmlFor="">Characters</label>
      </div>

      

      
      </div>





      </div>
      
    

      // <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8  bg-white text-black'>
      // <h1 className='font-bold text-center text-4xl text-black'>PassWord Generator!</h1>

      // <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      // <input 
      //     type="text"
      //     value={password}
      //     className='w-full outline-none py-1 px-3 bg-gray-200'
      //     placeholder='password'
          
          
      
      // />
      // </div>
      // </div>
    
  )
}

export default App







