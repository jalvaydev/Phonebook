import React from 'react'

const Form = ({addPerson, nameHandler, numberHandler, newName, newNumber}) => {
    return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={nameHandler}/>
        <br/>
        number: <input value={newNumber} onChange={numberHandler}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    )
  }

export default Form