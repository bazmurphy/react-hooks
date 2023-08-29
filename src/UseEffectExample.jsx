import { useState, useEffect } from "react";

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
  //     fetch(`/${selectedName}.json`)
  //       .then((response) => response.json())
  //       .then((data) => setSelectedName(data));
  //   }
  // }, [selectedName]);

  // we can just do it as part of the click event handler function
  const onSelectNameChange = (name) => {
    fetch(`/${name}.json`)
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
