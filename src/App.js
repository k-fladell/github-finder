import React, {Fragment, useState} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import axios from 'axios'
import Search from './components/users/Search'
import Alert from './components/layout/Alert'
import About from './components/pages/About'
import User from './components/users/User'

const App = () => {
  //it is best practice to bring state all the way up to the top-level component, 
  //especially if you are not using a state management framework like Redux

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [repos, setRepos] = useState([]);


  //to use async with classes, add the keyword 'async' before the class name
  /*async componentDidMount(){
   console.log(process.env.REACT_APP_GITHUB_CLIENT_ID);
   this.setState({loading: true});
   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

   //console.log(res.data);
   this.setState({users: res.data, loading: false});
  }*/

  //Search GitHub users
  //to use async with arrow functions, add the keyword 'async' before the parameters
  const searchUsers = async (text) => {
   //console.log(text);
   setLoading(true);
   const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

   //console.log(res.data.items);
   setUsers(res.data.items);
   setLoading(false);
  }

  const getUser = async (username) => {
    //console.log(username;
   setLoading(true);
   const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

   //console.log(res.data.items);
   setUser(res.data);
   setLoading(false);
  }

  const getUserRepos = async (username) => {
    //console.log(username;
    setLoading(true);
   const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

   //console.log(res.data.items);
   setRepos(res.data);
   setLoading(false);
  }


  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  }

  const showAlert = (msg, type) => {
    setAlert({msg: msg, type: type });

    //the setTimeout method takes a function as a parameter
    //here we use the function to set the state of alert back to null after 5 seconds
    setTimeout(() => setAlert(null), 5000);
  }

    return (
      <Router>
        <div className="App">
          <Navbar title="Github Finder Application"/> 

          <div className="container">
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Alert alert={alert}/>
                  <Search searchUsers={searchUsers} clearUsers={clearUsers} showClear={users.length > 0 ? true : false} setAlert={showAlert}/>
                  <Users loading={loading} users={users}/>
                </Fragment>
              )} />
              <Route exact path='/about' component={About}/>
              <Route exact path='/user/:login' render={props => (
                <Fragment>
                  <User { ...props} getUser={getUser} getUserRepos={getUserRepos} repos={repos} user={user} loading={loading}/>
                </Fragment>
              )}/>
            </Switch>
          </div>    
        </div>
      </Router>
    );
  
}

export default App;