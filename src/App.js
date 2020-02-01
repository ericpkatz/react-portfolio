import React, { useState, useEffect } from 'react';
import qs from 'qs';
import Header from './Header';
import Notes from './Notes';
import { fetchUser, fetchVacations, fetchNotes, fetchFollowingCompanies } from './api';


function App() {
  const [ user, setUser ] = useState({});
  const [ notes, setNotes ] = useState([]);
  const [ vacations, setVacations ] = useState([]);
  const [ followingCompanies, setFollowingCompanies] = useState([]);

  const getHash = ()=> {
    return window.location.hash.slice(1);
  }
  const [ params, setParams ] = useState(qs.parse(getHash()));

  useEffect(()=> {
    window.addEventListener('hashchange', ()=> {
      setParams(qs.parse(getHash()));
    });
  }, []);

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
  const { view } = params;


  return (
    <div>
      <Header user={ user } changeUser={ changeUser } />
      {
        view === undefined && (
          <main className='home'>
            <div>{ notes.length } <a href='#view=notes'>notes</a>.</div>
            <div>{ vacations.length } <a href='#view=vacations'>vacations</a>.</div>
            <div>Following { followingCompanies.length } <a href='#view=followingCompanies'>companies</a></div>
          </main>
        )
      }
      {
        view === 'notes' && (
          <Notes notes={ notes } />
        )
      }
    </div>
  );
}

export default App;
