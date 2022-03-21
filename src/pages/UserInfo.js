import { MDBBtn, MDBSpinner } from "mdb-react-ui-kit";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function UserInfo() {
  const { users, loading } = useSelector((state) => state.data);
  const { id } = useParams();
  const user = users.find((user) => user.id === Number(id));
  const navigation = useNavigate();

  if(loading) {
    return (
      <MDBSpinner style={{marginTop: "50px"}} role="status">
        <h4 className="visually-hidden">Loading...</h4>
      </MDBSpinner>
    )
  }

  return (
    <div className="container">
      <div className="d-flex mb-5" style={{ marginTop: "50px" }}>
        <div className="col-6">
          <p className="fw-bold">ID:</p>
          <p className="fw-bold">Name:</p>
          <p className="fw-bold">Email:</p>
          <p className="fw-bold">Phone:</p>
          <p className="fw-bold">Address:</p>
        </div>
        <div className="col-6">
          <p>{user.id}</p>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>{user.phone}</p>
          <p>{user.address}</p>
        </div>
      </div>
        <MDBBtn color="danger" onClick={() => navigation("/")}>
          Go Back
        </MDBBtn>
    </div>
    );
  }


export default UserInfo;
