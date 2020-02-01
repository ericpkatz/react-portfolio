import React, { useState, useEffect } from 'react';
import qs from 'qs';
import Header from './Header';
import Notes from './Notes';
import Vacations from './Vacations';
import Home from './Home';
import { destroyVacation, createVacation, fetchUser, fetchVacations, fetchNotes, fetchFollowingCompanies } from './api';
import { HashRouter, Link, Route } from 'react-router-dom';


function App() {
  const [ user, setUser ] = useState({});

  const [ notes, setNotes ] = useState([]);
  const [ vacations, setVacations ] = useState([]);
  const [ followingCompanies, setFollowingCompanies] = useState([]);

  const fetchAndSetUser = ()=> {
    fetchUser()
      .then( user => setUser(user));
  };

  useEffect(()=> {
    fetchAndSetUser()
  }, []);

  useEffect(()=> {
    if(user.id){
      Promise.all([
        fetchNotes(user.id),
        fetchVacations(user.id),
        fetchFollowingCompanies(user.id)
      ])
      .then(([_notes, _vacations, _followingCompanies])=> {
        setNotes(_notes);
        setVacations(_vacations);
        setFollowingCompanies(_followingCompanies);
      });
    }
  }, [user.id]);

  const changeUser = ()=> {
    window.localStorage.removeItem('userId');
    fetchAndSetUser();
  };

  const _destroyVacation = async(vacationToDestroy)=> {
    await destroyVacation(user.id, vacationToDestroy);
    setVacations(vacations.filter(vacation => vacation.id !== vacationToDestroy.id));
  };

  const _createVacation = async(vacationToCreate)=> {
    const created = await createVacation(user.id, vacationToCreate);
    setVacations([...vacations, created]);
  };


  return (
    <HashRouter>
      <div>
        <Header user={ user } changeUser={ changeUser } />
        <Route exact path='/' render={ ()=> <Home vacations={ vacations} notes={ notes } followingCompanies={ followingCompanies }/> } />
        <Route path='/notes' render={()=> <Notes notes={ notes } /> } />
        <Route path='/vacations' render={ ()=> <Vacations vacations={ vacations } destroy={ _destroyVacation } create={ _createVacation }/> } />
      </div>
    </HashRouter>
  );
}

export default App;
