import React from 'react';

const Header = ({ user, changeUser })=> {
  return (
    <header>
      <a href='/#'><img alt='avatar' src={ user.avatar } /></a>
      <h2>Welcome { user.email }!</h2>
      <button onClick={ changeUser }>Switch User</button>
    </header>
  );
};

export default Header;
