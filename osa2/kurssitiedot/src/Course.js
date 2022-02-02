import React from 'react'
import Part from './Part';

const Course = ({ courses }) => {
    return (
      <>
      {courses.map(element =>
        <div key={element.id+1} >
          <h1 key={element.id+2}>{element.name}</h1>
          <Part key={element.id} courses={element} />
        </div>
        )}
      </>
    )
  }

  export default Course;