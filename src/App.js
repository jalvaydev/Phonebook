import React, { useState } from 'react'
import Search from './Search'
import Form from './Form'
import Directory from './Directory'


const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newSearch, setNewSearch] = useState('')


  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchInput = (event) => {
    setNewSearch(event.target.value)
  }


  const addPerson = (event) => {
    event.preventDefault()

    const checkExists = () => {
      let arr = persons.filter(person => person.name === newName)
      return arr.length === 0
    }

    if (checkExists()){
      setPersons(persons.concat({name: newName, number: newNumber}))
    } else {
      alert(`${newName} is already in the directory!`)
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Search newSearch={newSearch} handler={handleSearchInput}/>
      <h2>Add A Number</h2>
      <Form addPerson={addPerson} newName={newName} newNumber={newNumber} nameHandler={handleNameInput} numberHandler={handleNumberInput}/>
      <h2>Phone Directory</h2>
      <Directory persons={persons} newSearch={newSearch}/>
    </div>
  )
}

export default App