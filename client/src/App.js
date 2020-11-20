import React, { useEffect, useState, createContext, useReducer, useContext } from 'react';
import './App.css';

import { BrowserRouter, Route, useHistory, Switch } from 'react-router-dom';

import Home from './components/Home'
import Admin from './components/Admin'
import CandidateDetails from './components/CandidateDetails'
import EditCandidateDetails from './components/EditCandidateDetails'
import AdminLoginPage from './components/AdminLoginPage'
import Navbar from './components/Navbar'

import { reducer, initialState } from './reducers/adminReducer'
export const AdminContext = createContext()

const Routing = ({ ip }) => {
  const {state, dispatch} = useContext(AdminContext)
  const history = useHistory()

  useEffect( () => {
    const admin = JSON.parse(localStorage.getItem("admin"))
    
    if(admin) {
      dispatch({type: "ADMIN", payload: admin})
    }
    else {
      if(!(history.location.pathname === '/') )
        history.push('adminsignin')
    }
  }, [])

  return (
    <Switch>
        <Route exact path="/">
          <Home ip={ip} />
        </Route>

        <Route path="/admin">
          <Admin ip={ip} />
        </Route>

        <Route path="/addcandidate">
          <CandidateDetails />
        </Route>

        <Route path="/editcandidatedetails/:id">
          <EditCandidateDetails />
        </Route>

        <Route path="/adminsignin">
          <AdminLoginPage />
        </Route>

        <Route path="*">
          <h1>404 Not Found</h1>
        </Route>
    </Switch>
  )
}

function App() {
  const [ip, setIp] = useState('')
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const getIp = async () => {
      await fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(result => {
        setIp(result.ip)
      })
    } 

    getIp()
  }, [])

  return (
    <div className="App">
      <AdminContext.Provider value={{state, dispatch}}>
      <BrowserRouter>
        <Navbar />
        <Routing ip={ip} />
      </BrowserRouter> 
      </AdminContext.Provider> 
    </div>
  );
}

export default App;
