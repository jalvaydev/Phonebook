import React, { useState } from 'react'


const Names = ({persons}) => {
  console.log("test")
  return(
    <table>
      <tbody>
        <tr>
          
        </tr>
        {persons.map( person => 
        <tr key={person.name}>{person.name} {person.number}</tr>)}
      </tbody>
    </table>
  )
}


const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newnumber, setNewnumber] = useState('')

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInput = (event) => {
    setNewnumber(event.target.value)
  }



  const addPerson = (event) => {
    event.preventDefault()

    const checkExists = () => {
      let arr = persons.filter(person => person.name === newName)
      return arr.length === 0
    }

    if (checkExists()){
      setPersons(persons.concat({name: newName, number: newnumber}))
    } else {
      alert(`${newName} is already in the directory`)
    }
  }

  return (
    <div>
      <h2>numberbook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameInput}/>
          <br/>
          number: <input value={newnumber} onChange={handleNumberInput}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Names persons={persons}/>
    </div>
  )
}

export default App