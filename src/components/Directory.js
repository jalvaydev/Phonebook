import React from 'react'

const Directory = ({persons, newSearch, removePerson}) => {

    const toDisplay = () => {
      if (newSearch.length === 0){
        return (persons)
      } else {
        let filtered = persons
          .filter( person => 
            person.name.toLowerCase()
            .includes(newSearch.toLowerCase()))
            
        return(filtered)
      }
    }
  
    return(
      <table>
        <tbody>
          {toDisplay()
            .map(person=> 
              <tr key={person.name}>
                <td>{person.name}</td>
                <td>{person.number}</td>
                <td><button onClick={() => removePerson(person.id)}>Remove</button></td>
              </tr>)}
        </tbody>
      </table>
    )
  }

export default Directory