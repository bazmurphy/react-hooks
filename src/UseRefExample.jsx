import { useRef, useEffect } from "react";

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
