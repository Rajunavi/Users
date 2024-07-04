import React, { useMemo } from 'react'

const ExpensiveCalculation = ({ number }) => {

    const calculateFactorial = (n) => {
      console.log('Calculating factorial...');
      if (n <= 0) return 1;
      return n * calculateFactorial(n - 1);
    };
  
    const factorial = useMemo(() => calculateFactorial(number), [number]);
  
    return <h1>Factorial of {number} is {factorial}</h1>;
  };

  export default ExpensiveCalculation