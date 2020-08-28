import React, { useState, useEffect } from 'react'
import Search from './components/Search'
import Form from './components/Form'
import Directory from './components/Directory'
import contactService from './services/contacts'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newSearch, setNewSearch] = useState('')

  useEffect(() => {
    contactService
      .getAll()
      .then(response => {
        if(JSON.stringify(response.data) === JSON.stringify(persons)){
          console.log("interesting")
        } else {
          setPersons(response.data)
        }
      })
  }, [persons])


  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchInput = (event) => {
    setNewSearch(event.target.value)
  }


  const removePerson = (id) => {
     contactService
      .remove(id)
      .then(contactService
            .getAll()
            .then(response => 
              setPersons(response.data)))
  }

  const addPerson = (event) => {
    event.preventDefault()

    const personToAdd = {
      name: newName,
      number: newNumber
    }

    const checkExists = () => {
      let arr = persons.filter(person => person.name === newName)
      return arr.length === 0
    }

    if (checkExists()){
      contactService
        .create(personToAdd)
        .then(response => {
          setPersons(persons.concat(response.data))
        })
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
      <Directory persons={persons} newSearch={newSearch} removePerson={removePerson}/>
    </div>
  )
}

export default App