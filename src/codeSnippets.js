export const useCallBackExample = `import { useReducer } from "react";

const UseReducerExample = () => {
  const initialState = {
    name: "",
    names: [],
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_NAME":
        // we have to create a new object and mutate the fields we want
        // because otherwise React compares the references and thinks they are the same
        return { ...state, name: action.payload };
      case "ADD_NAME":
        return { ...state, names: [...state.names, action.payload], name: "" };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="reducer-example">
      <h2>useReducer Example</h2>
      <input
        type="text"
        value={state.name}
        onChange={(event) =>
          dispatch({ type: "SET_NAME", payload: event.target.value })
        }
      />
      <p>name: {state.name}</p>
      <button
        onClick={() => dispatch({ type: "ADD_NAME", payload: state.name })}
      >
        Add Name
      </button>
      <p>names:</p>
      <ul>
        {state.names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
};`;

export const useEffectExample = `import { useState, useEffect } from "react";

const UseEffectExample = () => {
  const [names, setNames] = useState([]);

  // if we try to achieve the following:
  // fetch("/names.json")
  //   .then((response) => response.json())
  //   .then((data) => setNames(data));
  // the app renders
  // and then the fetch asynchronously goes off and eventually returns
  // then it enques a re-render throuhg setNames
  // which means the app re-renders
  // which carries out the fetch again
  // and we are in an INFINITE LOOP

  // useEffect is called once the DOM has rendered (and then whenever React wants to call it again)
  useEffect(() => {
    fetch("/names.json")
      .then((response) => response.json())
      .then((data) => setNames(data));
  }, []);

  const [selectedName, setSelectedName] = useState(null);

  // this is one way to do it
  // but it is incorrect because we don't need to use useEffect
  // useEffect(() => {
  //   if (selectedName) {
  //     fetch('/selectedName.json')
  //       .then((response) => response.json())
  //       .then((data) => setSelectedName(data));
  //   }
  // }, [selectedName]);

  // we can just do it as part of the click event handler function
  const onSelectNameChange = (name) => {
    fetch('/name.json')
      .then((response) => response.json())
      .then((data) => setSelectedName(data));
  };

  // and this is a common mistake
  // you don't need to useState and useEffect
  // when you are just responding to some user interaction
  // it's simpler to do it in the event handler function and it's the right thing to do
  // limit the amount you use useEffect

  // useEffect gets hairy when it depends on data that it also writes

  return (
    <div>
      <h2>useEffect Example</h2>
      <p>{names.join(", ")}</p>
      {names.map((name) => (
        <button key={name} onClick={() => onSelectNameChange(name)}>
          {name}
        </button>
      ))}
      <p>selectedName: {JSON.stringify(selectedName)}</p>
    </div>
  );
};

export default UseEffectExample;
`;

export const useEffectExample2 = `import { useState, useEffect } from "react";

const UseEffectExample2 = () => {
  const [time, setTime] = useState(0);

  // just like the fetch before that is simply in the component
  // it will cause an Infinite Loop
  // setting the state every second
  // setInterval(() => {
  //   setTime(time + 1);
  // }, 1000);

  useEffect(() => {
    // we created a closure here and captured "time" at 0
    const interval = setInterval(() => {
      console.log("setInterval ran");
      // so in this function, time will be forever locked at 0
      setTime((t) => {
        console.log(t);
        return t + 1;
      });
    }, 1000);

    // the function that you give useEffect can return a cleanup function
    // and that cleanup function is called everytime the old useEffect is being unmounted
    // and the new useEffect is coming in
    return () => clearInterval(interval);
  }, []);
  // and we can't just add "time" as a dependency because that will create an Infinite Loop

  return (
    <div>
      <h2>useEffect Example2</h2>
      <p>Time: {time}</p>
    </div>
  );
};

export default UseEffectExample2;
`;

export const useMemoExample = `import { useState, useMemo } from "react";

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
`;

export const useReducerExample = `import { useReducer } from "react";

const UseReducerExample = () => {
  const initialState = {
    name: "",
    names: [],
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_NAME":
        // we have to create a new object and mutate the fields we want
        // because otherwise React compares the references and thinks they are the same
        return { ...state, name: action.payload };
      case "ADD_NAME":
        return { ...state, names: [...state.names, action.payload], name: "" };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="reducer-example">
      <h2>useReducer Example</h2>
      <input
        type="text"
        value={state.name}
        onChange={(event) =>
          dispatch({ type: "SET_NAME", payload: event.target.value })
        }
      />
      <p>name: {state.name}</p>
      <button
        onClick={() => dispatch({ type: "ADD_NAME", payload: state.name })}
      >
        Add Name
      </button>
      <p>names:</p>
      <ul>
        {state.names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UseReducerExample;
`;

export const useReducerExample2 = `import { useReducer } from "react";

const UseReducerExample2 = () => {
  const reducer = (state, action) => {
    // this is a smart pattern with useReducer that you can update any key on the state
    // we combine the existing state with whatever comes in on the action
    return { ...state, ...action };
  };

  const initialState = {
    first: "",
    last: "",
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h2>useReducer Example2</h2>
      <form>
        <div>
          {/* now we can just dispatch with whatever key we want to change */}
          <input
            type="text"
            value={state.first}
            onChange={(event) => dispatch({ first: event.target.value })}
          />
          <input
            type="text"
            value={state.last}
            onChange={(event) => dispatch({ last: event.target.value })}
          />
        </div>
      </form>
      <p>
        first: {state.first} last: {state.last}
      </p>
    </div>
  );
};

export default UseReducerExample2;
`;

export const useRefExample = `import { useRef, useEffect } from "react";

const UseRefExample = () => {
  // when you change the value of a Reference
  // it DOES NOT CAUSE a RE-RENDER of the Component

  // [1] most common use is to get a reference to an HTML element
  // [a] we want to initially give the input the focus
  // [b] we need to know that the element is defined, that the component has rendered, and that we get a reference to that element
  // [c] so we can useEffect for that, because it runs after all of that happens

  const inputRef = useRef(null);

  useEffect(() => {
    // when you have a reference you have a "current" value associated with that reference
    // you can set and read from "current"
    inputRef.current.focus();
  }, []);

  return (
    <div>
      <h2>useRef Example</h2>
      <input type="text" ref={inputRef} />
    </div>
  );
};

export default UseRefExample;
`;

export const useRefExample2 = `import { useState, useRef } from "react";

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
`;
