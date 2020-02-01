import React from 'react';
import moment from 'moment';

const Vacations = ({ vacations })=> {
  return (
    <main className='vacations'>
      <h2>Vacations</h2>
      <ul>
        {
          vacations.map( vacation => {
            return (
              <li key={ vacation.id}>
                <div>
                  { moment(vacation.startDate).format('dddd MM/DD/YYYY') }
                </div>
                <div> To </div>
                <div>
                  { moment(vacation.endDate).format('dddd MM/DD/YYYY') }
                </div>
                <div>
                  { moment(vacation.endDate).diff(moment(vacation.startDate), 'days') } Days
                </div>
              </li>
            );
          })
        }
      </ul>
    </main>
  );
};


export default Vacations;
