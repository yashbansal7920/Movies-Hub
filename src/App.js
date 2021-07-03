import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navabar/Navbar";
import Trendings from "./pages/Trendings/Trendings";
import Movies from "./pages/Movies/Movies";
import Series from "./pages/TvSeries/Series";
import Search from "./pages/Search/Search";
import BottomNav from "./components/BottomNav/BottomNav";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Trendings} />
        <Route exact path="/movies" component={Movies} />
        <Route exact path="/series" component={Series} />
        <Route exact path="/search" component={Search} />
      </Switch>
      <BottomNav />
    </BrowserRouter>
  );
}

export default App;
