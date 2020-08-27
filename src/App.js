import React, { useState, useEffect } from 'react'
import Search from './Search'
import Form from './Form'
import Directory from './Directory'
import axios from 'axios'


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newSearch, setNewSearch] = useState('')

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data)
      })
  }, [])


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