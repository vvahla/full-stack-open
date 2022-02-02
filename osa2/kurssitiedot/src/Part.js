import React from 'react'

const Part = ({ courses }) => {
    let totalExercises = 0;
  
    let sum = courses.parts.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.exercises;
    }, totalExercises);
  
    return (
      <ul>
        {courses.parts.map(element => 
          <li key={element.id}>
          {element.name}, {element.exercises}
          </li>
        )}
        <p>total of {sum} exercises</p>
      </ul>
    )
  }

  export default Part;