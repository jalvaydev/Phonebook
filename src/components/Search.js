import React from 'react'

const Search = ({newSearch, handler}) => {
    return (
      <div>
        Search by Name
        <input value={newSearch} onChange={handler}/>
    </div>
    )
  }

export default Search