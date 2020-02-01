import React from 'react';

const Header = ({ user, changeUser })=> {
  return (
    <header>
      <img src={ user.avatar } />
      <h2>Welcome { user.email }!</h2>
      <button onClick={ changeUser }>Switch User</button>
    </header>
  );
};

export default Header;
