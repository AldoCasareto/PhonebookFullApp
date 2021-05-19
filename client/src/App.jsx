import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Form from './components/Form';
import Notifications from './components/Notifications';
import Persons from './components/Persons';
import phoneService from './services/phonebook';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null);

  // useEffect(() => {
  //   axios.get('http://localhost:3001/persons').then((res) => {
  //     const fetchedPeople = res.data;
  //     setPersons(fetchedPeople);
  //   });
  // }, []);

  useEffect(() => {
    phoneService.getAll().then((initialNotes) => setPersons(initialNotes));
  }, []);

  const filterName = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const addNewPerson = (e) => {
    e.preventDefault();
    const newContact = {
      name: newName,
      number: newNumber,
    };

    const findMatch = persons.find((person) => person.name === newName);
    if (findMatch === undefined) {
      phoneService.create(newContact).then((returnedContact) => {
        setPersons(persons.concat(returnedContact));
        setNotification({
          message: `Added ${newName}`,
          status: 'success',
        });
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      });
      // axios.post('http://localhost:3001/persons', newContact).then((res) => {
      //   setPersons(persons.concat(res.data));
      //   setNewName('');
      //   setNewNumber('');
      // });
    } else {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const updateNumber = { ...findMatch, number: newNumber };
        phoneService
          .update(findMatch.id, updateNumber)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== findMatch.id ? person : returnedPerson
              )
            );
          });
        setNotification({
          message: `Updated number for ${newName}`,
          status: 'success',
        });
        setTimeout(() => {
          setNotification(null);
        }, 3000);
        console.log(findMatch.id);
        console.log(updateNumber);
      }
      // setNewNumber('');
    }
  };

  const handleDelete = (id, name) => {
    console.log(id);
    const contact = persons.filter((person) => person.id !== id);
    if (window.confirm(`Delete ${name}?`)) {
      phoneService
        .deleteContact(id)
        .then(setPersons(contact))
        .catch((err) => {
          setNotification({
            message: `Information for ${name} has already been removed from the server`,
            status: 'error',
          });
          setTimeout(() => {
            setNotification(null);
          }, 3000);
        });
      setNotification({
        message: `Deleted ${name}`,
        status: 'success',
      });
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notifications notification={notification} />
      <Filter filter={filter} handleFilter={handleFilter} />
      <Form
        addNewPerson={addNewPerson}
        newName={newName}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
      />
      <h2>Numbers</h2>
      <div>
        <Persons
          persons={persons}
          filterName={filterName}
          handleFilter={handleFilter}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default App;
