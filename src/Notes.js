import React from 'react';

const Notes = ({ notes })=> {
  return (
    <main className='notes'>
      <h2>Notes</h2>
      <ul>
        {
          notes.map( note => {
            return (
              <li key={ note.id }>{ note.text }</li>
            );
          })
        }
      </ul>
    </main>
  );
};

export default Notes;
