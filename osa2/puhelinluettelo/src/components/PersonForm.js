import React from 'react'

const PersonForm = ( {addName, newName, handleNameChange, newNumber, handleNumberChange} ) => {
    return (
      <form onSubmit={addName}>
      <div>
        <b>name:</b> 
        <input 
        value={newName}
        onChange={handleNameChange}
        />
        <br />
        <b>phone number:</b>
        <input
        value={newNumber}
        onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    )
  }

  export default PersonForm