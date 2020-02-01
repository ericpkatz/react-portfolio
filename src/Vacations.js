import React, { useState } from 'react';
import moment from 'moment';


const VacationForm = ({ create })=> {
  const [startDate, setStartDate ] = useState(moment().format('MM/DD/YYYY'));
  const [endDate, setEndDate ] = useState(moment().add(1, 'week').format('MM/DD/YYYY'));

  const onSubmit = (ev)=> {
    ev.preventDefault();
    create({ startDate, endDate });
  };
  return (
    <form onSubmit={ onSubmit }>
      <input value={ startDate } onChange={ ev => setStartDate(ev.target.value)} />
      <input value={ endDate } onChange={ ev => setEndDate(ev.target.value)} />
      <button>Save</button>
    </form>
  );
};
const Vacations = ({ vacations, destroy, create })=> {

  return (
    <main className='vacations'>
      <h2>Vacations</h2>
      <VacationForm create={ create }/>
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
                <button onClick={()=> destroy( vacation )}>x</button>
              </li>
            );
          })
        }
      </ul>
    </main>
  );
};


export default Vacations;
