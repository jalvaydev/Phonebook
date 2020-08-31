import React, { useState, useEffect } from 'react'
import Search from './components/Search'
import Form from './components/Form'
import Directory from './components/Directory'
import contactService from './services/contacts'

const Notification = ({ errorMessage, successMessage }) => {
  if (errorMessage === null && successMessage === null) {
    return null
  }

  if (errorMessage !== null){
    return(
      <div className="error">
        {errorMessage}
      </div>
    )
  }

  if (successMessage !== null){
    return(
      <div className="success">
        {successMessage}
      </div>
    )
  }
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newSearch, setNewSearch] = useState('')
  const [ errorMessage, setErrorMessage] = useState(null)
  const [ successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    contactService
      .getAll()
      .then(response => {
        if(JSON.stringify(response.data) !== JSON.stringify(persons)){
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
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`) === true){
     contactService
      .remove(id)
      .then(contactService
            .getAll()
            .then(response => {
              setPersons(response.data)
              setSuccessMessage(`${person.name} has been removed!`)
              setTimeout(() => {
                setSuccessMessage(null)
              }, 5000)
            }))
      .catch(error => {
        setErrorMessage(`${person.name} has already been removed from the directory!`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()

    const personToAdd = {
      name: newName,
      number: newNumber
    }

    const checkExists = () => {
      let check = persons.filter(person => 0 === person.name.toLowerCase().indexOf(newName.toLowerCase()))
      return(check.length === 0)
    }

    if (checkExists()){
      contactService
        .create(personToAdd)
        .then(response => {
          setPersons(persons.concat(response.data))
          setSuccessMessage(`${newName} has been added!`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
    } else {
      if(window.confirm(`${newName} is already in the directory, would you like to replace the old number with a new one?`) === true){
        let person = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
        person.number = newNumber

        contactService
          .update(person.id, person)
          .then(response => {
            setPersons(persons.map(p => p.id !== person.id ? p : response.data))
            setSuccessMessage(`${newName}'s number has been modified!`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)
          }
        )
      }
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Search newSearch={newSearch} handler={handleSearchInput}/>
      <h2>Add A Number</h2>
      <Form addPerson={addPerson} newName={newName} newNumber={newNumber} nameHandler={handleNameInput} numberHandler={handleNumberInput}/>
      <Notification successMessage={successMessage} errorMessage={errorMessage}/>
      <h2>Phone Directory</h2>
      <Directory persons={persons} newSearch={newSearch} removePerson={removePerson}/>
    </div>
  )
}

export default App