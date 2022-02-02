import React from 'react'

const Filter = ( {newSearch, handleSearchChange} ) => {
    return (
      <p>filter shown with a <input value={newSearch} onChange={handleSearchChange} /></p>
    )
  }

export default Filter