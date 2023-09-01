import { useReducer } from "react";

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
