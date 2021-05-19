import React from 'react';


const Form = (
{  addNewPerson,
  newName,
  handleNumberChange,
  newNumber,
  handleNameChange}
) => {
  return (
    <div>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
