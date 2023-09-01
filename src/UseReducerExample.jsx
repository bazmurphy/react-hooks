import { useReducer } from "react";

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
