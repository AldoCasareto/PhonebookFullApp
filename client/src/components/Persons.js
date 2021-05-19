import React from 'react';

const Persons = ({ persons, filterName, handleFilter, handleDelete }) => {
  return (
    <>
      {(handleFilter === '' ? persons : filterName).map((person) => (
        <p key={person.name}>
          {person.name} - {person.number}
          <button onClick={()=>handleDelete(person.id, person.name)}>Delete</button>
        </p>
      ))}
    </>
  );
};

export default Persons;
