import { MDBBtn, MDBTypography } from 'mdb-react-ui-kit'
import React from 'react'
import { useNavigate } from 'react-router-dom';

function About() {
  const navigate = useNavigate();
  return (
    <div style={{marginTop: "50px", textTransform: "capitalize"}}>
      <MDBTypography note noteColor='success'>
        lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Maecenas eget nisl id libero tincidunt sodales.
        Donec eget nisl id libero tincidunt sodales.
      </MDBTypography>
      <MDBBtn style={{marginTop: "50px"}} color='danger' onClick={() => navigate('/')}>Go Back</MDBBtn>
    </div>
  )
}

export default About