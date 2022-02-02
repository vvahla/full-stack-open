import React from 'react'
import personService from './../services/personService'

const Person = ( {person, setPersons, setNotificationMessage} ) => {
    return(
      <>
        <li><b>Name:</b> {person.name} <b>Phone number:</b> {person.number} </li>
        <button onClick={() => {
          if(window.confirm(`Do you want to delete ${person.name}?`))
          personService
          .deletePerson(person.id)
          .then(() =>
            personService
              .getAll()
              .then(initialPersons => {
                setPersons(initialPersons);
              })
          )

          setNotificationMessage(
            `Person ${person.name} was deleted from the phonebook`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        }}>delete</button>
      </>
    )
  }

  export default Person