import { useState, useMemo, useCallback } from "react";

const SortedList = ({ list, sortFunction }) => {
  console.log("SortedList render");

  const sortedList = useMemo(() => {
    console.log("running sortedList");
    return [...list].sort(sortFunction), [list];
    // the useMemo will only update if either list or sortFunction changes
  }, [list, sortFunction]);

  return <div>sortedList: {sortedList.join(", ")}</div>;
};

const UseCallbackExample = () => {
  const [names] = useState(["John", "Paul", "George", "Ringo"]);

  // we create a new sort function (new reference) each time the component renders
  // that triggers the useMemo dependency array above
  // const sortFunction = (a, b) => a.localeCompare(b);

  // so we wrap the function in useCallback and in this case the dependency array is empty
  const sortFunction = useCallback((a, b) => a.localeCompare(b), []);

  // when should you use useCallback?

  // [1] if the callback that you are creating (like the onClick or onChange)
  // is going onto a nested component as a property

  // we are passing sortFunction as a property to the sortedList
  // and you don't know the internals of sortedList
  // maybe it depends on that sortFunction and if the reference of that sortFunction changes it will go and update
  // make sure you stabilise references that you send to a React component

  // [2] if you are creating a Custom Hook
  // anytime you create a callback in a Custom Hook
  // you want to make sure to use useCallback when you do that
  // because you have no idea what the component that is going to use that hook is going to do with that callback
  // and you want to make sure that the reference to that callback is absolutely stable over time

  return (
    <div>
      <h2>useCallback Example</h2>
      <SortedList list={names} sortFunction={sortFunction} />
    </div>
  );
};

export default UseCallbackExample;
