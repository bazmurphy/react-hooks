import { useState, useMemo } from "react";

const UseMemoExample = () => {
  const [numbers] = useState([10, 20, 30]);

  // const total = numbers.reduce((acc, cv) => acc + cv, 0);

  // we don't want to recompute the total everytime this component re-renders
  // for example if we have thousands of numbers in the array

  // anything you read from should go in the dependency array
  // it will only run the function anytime "numbers" changes
  const total1 = useMemo(
    () => numbers.reduce((acc, cv) => acc + cv, 0),
    [numbers]
  );

  // its important to stabilise references between arrays/objects

  const [names] = useState(["John", "Paul", "George", "Ringo"]);
  // const sortedNames = names.sort();

  // sort does an in place sort - it mutates names - we get a copy of that array but that array has been sorted

  // so we want to make a copy of an array and then sort it
  // const sortedNames = [...names].sort();

  // [1] its a potentially expensive calculation
  // [2] it results in an array or an object
  const sortedNames = useMemo(() => [...names].sort(), [names]);

  // don't use useMemo for simple calculations
  // the calculation is simple
  // and it results in a primitive data type ("scalar" data type) (a number, string, boolean)
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const total2 = useMemo(() => count1 + count2, [count1, count2]);

  // Myth
  // [1] useMemo is NOT related AT ALL to React.memo
  // React.memo memoises components and is a good performance enhancement in certain circumstances
  // [2] useMemo is a performance killer - the CS concept of memoisation
  // with classic memoisation - you memoise a function - and that function remembers all the parameters sent to it
  // and only if it sees a new set of parameters does it calculate a new value
  // otherwise it will send back a value from the cache that it has

  // useMemo looks at the dependency array and works out if its the same as the last time that it saw it
  // if it is, then it will give you back the last value you created, otherwise i will create a new value, for the new data
  // and then i will hold onto that.. (only for a single level) (it is not cached)

  return (
    <div>
      <h2>useMemo</h2>
      <p>total1: {total1}</p>
      <p>names: {names.join(", ")}</p>
      <p>sortedNames: {sortedNames.join(", ")}</p>
      <button onClick={() => setCount1(count1 + 1)}>Count1: {count1}</button>
      <button onClick={() => setCount2(count2 + 1)}>Count2: {count2}</button>
      <p>total2: {total2}</p>
    </div>
  );
};

export default UseMemoExample;
