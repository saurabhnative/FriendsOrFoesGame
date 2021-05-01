import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "tailwindcss/dist/tailwind.css";

import IntroductionScreen from "./components/IntroductionScreen";
import GameScreen from "./components/GameScreen";
import AudioComponent from "./components/AudioComponent";
function App() {
  return (
    <Router>
      <div className="flex flex-col">
        <AudioComponent />
        <Switch>
          <Route path="/" exact={true}>
            <IntroductionScreen />
          </Route>
          <Route path="/game">
            <GameScreen />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
