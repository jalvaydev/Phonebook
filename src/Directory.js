import React from 'react'

const Contact = ({person}) => {
    return(  
      <tr>
        <td>{person.name}</td>
        <td>{person.number}</td>
      </tr>
    )
  }

const Directory = ({persons, newSearch}) => {

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
              <Contact person={person} key={person.name}/>)}
        </tbody>
      </table>
    )
  }

export default Directory