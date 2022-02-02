import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'
import personService from './services/personService'
import axios from 'axios'
import { useEffect } from 'react/cjs/react.development'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
  }, [])

  const addName = (event) => {
    event.preventDefault();
    
    const phoneNumber = {
      name: newName,
      number: newNumber
    }

    let personID = 0;
    persons.forEach(person => {
      if(person.name == newName){
        personID = person.id;
        console.log('DEBUG: person found: id ' + personID)
      }
    })

    if(!persons.some(person => person.name == newName)){
      personService
        .create(phoneNumber)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })

        setNotificationMessage(
          `Person ${newName} was added to the phonebook`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)

    } else {
      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){

        personService
          .update(personID, phoneNumber)
          .then(() =>
            personService
            .getAll()
            .then(initialPersons => {
              setPersons(initialPersons);
            }))
            .then(() => {
              setNotificationMessage(
                `Information of ${newName} was updated`
              )
              setTimeout(() => {
                setNotificationMessage(null)
              }, 5000)
            })
            .catch(() => {
              setErrorMessage(
                `Information of ${newName} has already been removed from the server`
              )
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
            }
          )
    }
  }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  }

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  return (
    <div>
      <Notification message={notificationMessage} />
      <ErrorNotification message={errorMessage} />
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />

      <h2>Add a new</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>
      <Persons persons={persons} newSearch={newSearch} setPersons={setPersons} setNotificationMessage={setNotificationMessage}/>
    </div>
  )

}

export default App