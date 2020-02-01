import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ notes, vacations, followingCompanies })=> {
  return (
    <main className='home'>
      <div>{ notes.length } <Link to='/notes'>notes</Link>.</div>
      <div>{ vacations.length } <Link to='/vacations'>vacations</Link>.</div>
      <div>Following { followingCompanies.length } <a href='#view=followingCompanies'>companies</a></div>
    </main>
  );
};

export default Home;
