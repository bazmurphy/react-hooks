import { useState, useEffect } from "react";

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
