import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

import PetList from './components/petsList';
import CreatePet from './components/createPet';
import UpdatePet from './components/updatePet';
import PetDetails from './components/petDetails';
function App() {
  return (
    <div className="App">
      <h1 className='text-start'>Pet Shelter</h1>

      <BrowserRouter>
          <Switch>
            <Route exact path='/'>
              <PetList />
            </Route>
            <Route exact path="/pets/new">
              <CreatePet/>
            </Route>
            <Route exact path="/pets/:id">
              <PetDetails/>
            </Route>
            <Route path="/pets/:id/edit">
              <UpdatePet/>
            </Route>
          </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
