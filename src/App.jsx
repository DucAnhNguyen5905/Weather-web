import { useState } from "react";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [backgroundClass, setBackgroundClass] = useState("bg-default");

  return (
    <div className={`app ${backgroundClass}`}>
      <WeatherCard setBackgroundClass={setBackgroundClass} />
    </div>
  );
}

export default App;
