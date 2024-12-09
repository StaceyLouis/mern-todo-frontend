import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://todo-backend-4fyf.onrender.com/todos/")
      .then((res) => res.json())
      .then((data) => setData(data));
  });

  console.log(data);

  return (
    <div>
      {data.map((i) => (
        <p key={i.id}>{i.title}</p>
      ))}
    </div>
  );
}

export default App;
