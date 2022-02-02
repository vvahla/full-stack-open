import React from 'react'
import Person from './Person'
const Persons = ( {persons, newSearch, setPersons, setNotificationMessage} ) => {
    const peopleToShow = persons.filter(person => person.name.toUpperCase().includes(newSearch.toUpperCase()))
    return (
      <ul>
        {peopleToShow.map(person =>
          <Person key={person.name} person={person} setPersons={setPersons} setNotificationMessage={setNotificationMessage}/>
        )}
      </ul>
    )
  }

  export default Persons