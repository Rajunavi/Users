import React, { useState } from 'react'
import Child from './Child';
import ExpensiveCalculation from './ExpensiveCalculation';

function Parent() {
    const [count, setCount] = useState(0);
    const [name, setName] = useState();
    const [number, setNumber] = useState(5)


    const operation = (op) => {
        setCount(x => {
            switch (op) {
                case "incrment":
                    return x+1;
                case "decrment": {
                    if(x === 0) return 0;
                    else return x-1;
                }
                default:
                    return x;
            }
        })
    }
    console.log("parent render")
  return (
    <div style={{width:'100%', display:'flex', alignItems:'center', flexDirection:'column'}}>
        <button onClick={() => operation('decrment')}>-</button>
        <h1>{count}</h1>
        <button onClick={() => operation('incrment')}>+</button>
        <Child name={name} />
        <input placeholder='Enter' onChange={(e) => setName(e.target.value)} />
        <ExpensiveCalculation number={number}/> 
        <button onClick={() => setNumber(x => x-1)}>changeNumber</button>
    </div>
  )
}

export default Parent