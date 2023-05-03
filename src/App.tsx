import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './layout/app_layout';
import Home from './pages/Home/home';
import Team from './pages/Team/team';
import Player from './pages/Player/player';
import Game from './pages/Game/game';
class App extends React.Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/team" element={<Team />} />
            <Route path="/player" element={<Player />} />
            <Route path="/game" element={<Game />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    );
  }
}


export default App;

