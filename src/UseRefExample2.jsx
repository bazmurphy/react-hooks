import { useState, useRef } from "react";

const UseRefExample2 = () => {
  const [names, setNames] = useState([]);

  // here we associate this ref to an input element
  const inputRef = useRef(null);

  // you can change this ref's value without forcing a refresh of the React tree
  const idRef = useRef(1);

  const onAddName = () => {
    setNames([
      ...names,
      {
        id: idRef.current++, // we increment the idRef
        name: inputRef.current.value, // we extract the value from the input element
      },
    ]);
    inputRef.current.value = "";
  };

  return (
    <div>
      <h2>useRef Example2</h2>
      {/* uncontrolled input */}
      <input type="text" ref={inputRef} />
      <button onClick={onAddName}>Add Name</button>
      <ul>
        {names.map((name) => (
          <li key={name.name}>
            {name.id} - {name.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UseRefExample2;
