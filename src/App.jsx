import "./App.css";
import UseReducerExample from "./UseReducerExample";
import UseReducerExample2 from "./UseReducerExample2";
import UseMemoExample from "./UseMemoExample";
import UseCallbackExample from "./UseCallbackExample";
import UseEffectExample from "./UseEffectExample";
import UseEffectExample2 from "./UseEffectExample2";
import UseRefExample from "./UseRefExample";
import UseRefExample2 from "./UseRefExample2";
import CodeBlock from "./CodeBlock";
import {
  useCallBackExample,
  useEffectExample,
  useEffectExample2,
  useMemoExample,
  useReducerExample,
  useReducerExample2,
  useRefExample,
  useRefExample2,
} from "./codeSnippets";

const App = () => {
  return (
    <div className="app">
      <header>
        <img src="teacher.png" alt="teacher" className="teacher" />
        <h1>React Hooks</h1>
        <img src="hook.png" alt="hook" className="hook" />
      </header>
      <main>
        <UseEffectExample />
        <CodeBlock code={useEffectExample} />
        <UseEffectExample2 />
        <CodeBlock code={useEffectExample2} />
        <UseRefExample />
        <CodeBlock code={useRefExample} />
        <UseRefExample2 />
        <CodeBlock code={useRefExample2} />
        <UseMemoExample />
        <CodeBlock code={useMemoExample} />
        <UseCallbackExample />
        <CodeBlock code={useCallBackExample} />
        <UseReducerExample />
        <CodeBlock code={useReducerExample} />
        <UseReducerExample2 />
        <CodeBlock code={useReducerExample2} />
      </main>
    </div>
  );
};

export default App;
