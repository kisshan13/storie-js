import "./App.css";
import { useStorie, createStore } from "./storie";

const store = createStore({
  count: 1,
});

function App() {
  const [counter, setCounter] = useStorie(store);

  return (
    <>
      <div>
        <p>{counter.count}</p>
        <button onClick={() => setCounter({ count: (counter.count += 1) })}>
          {counter.count}
        </button>
      </div>
    </>
  );
}

export default App;
