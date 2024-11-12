
import './App.css';
import { useCallback, useEffect, useRef, useState } from 'react';

function App() {
  const [length,setLength]=useState(8);
  const [numberAllowed, setnumberAllowed]=useState(false);
  const [charAllowed, setcharAllowed]=useState(false);
  const [password,setPassword]=useState("");
  


const passRef = useRef(null);

  const passwordGenerator =useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    
    if(charAllowed) str +="!@#$%^&*";
    if(numberAllowed) str +="1234567890"
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass)
  },[length,numberAllowed,charAllowed,setPassword])

  const copybtn = useCallback(()=>{
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password])

  useEffect(()=>{
    passwordGenerator()
    },[length,numberAllowed,charAllowed,passwordGenerator])
 
  return (
    <>
    <div className='container'>
      <div className="row justify-content-center align-content-center">
        <div className="col-lg-6 bg-color">
        <h1 className='text-center'>Password Generator</h1>
    <div>
      <input type="text" 
      className='col-8 pass-input'
      value={password}
      ref={passRef}/>
      <button
      onClick={copybtn}
      className='copybtn'>Copy</button>
      <input 
        type="range"
        className='length-input'
        min={8}
        max={20}
        value={length}
        readOnly
        onChange={(e)=>(setLength(e.target.value))} />
      <label>Length({length})</label>
      <input type="checkbox"
      onChange={()=> setnumberAllowed((prev)=> !prev)} />
      <label>Number</label>
      <input type="checkbox" 
      onChange={()=>setcharAllowed((prev)=> !prev)}/>
      <label>character</label>
    </div>
        </div>

      </div>

    </div>
    
    </>
  );
}

export default App;
