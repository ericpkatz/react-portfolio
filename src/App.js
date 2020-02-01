import React, { useState, useEffect } from 'react';
import Header from './Header';
import { fetchUser, fetchVacations, fetchNotes, fetchFollowingCompanies } from './api';


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

  return (
    <div>
      <Header user={ user } changeUser={ changeUser } />
      <main>
        <div>{ notes.length } notes.</div>
        <div>{ vacations.length } vacations.</div>
        <div>Following { followingCompanies.length } companies</div>
      </main>
    </div>
  );
}

export default App;
