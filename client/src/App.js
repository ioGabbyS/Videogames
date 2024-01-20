import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import landing from './component/landing/lading';
import Home from './component/home/Home';
import CreateGames from './component/createGames/CreateGames';
import Details from './component/detailsGames/DetailsGames'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path= '/' component={landing} />
        <Route exact path= '/videogames' component={Home} />
        <Route exact path= '/creategames' component={CreateGames} />
        <Route exact path="/videogames/:id" component={Details} />
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
