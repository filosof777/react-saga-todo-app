import { MDBBtn, MDBInput, MDBValidation } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createUserStart, updateUserStart } from "../redux/actions";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

function EditUser() {
  const [formValue, setFormValue] = useState(initialState);
  const [editMode, setEditMode] = useState(false);
  const { users } = useSelector((state) => state.data);
  const { name, email, phone, address } = formValue;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setEditMode(true);
      const user = users.find((user) => user.id === Number(id));
      setFormValue({ ...user });
    } else {
      setEditMode(false);
      setFormValue({...initialState});
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && phone && address) {
      if (!editMode) {
        dispatch(createUserStart(formValue));
        toast.success("User created successfully");
        setTimeout(() => {
          navigate("/");
        }, 500);
      } else {
        dispatch(updateUserStart({ id, formValue }));
        toast.success("User updated successfully");
        setTimeout(() => {
          navigate("/");
        }, 500);
        setEditMode(false);
      }
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <MDBValidation
      className="row g-3"
      style={{ marginTop: "100px" }}
      noValidate
      onSubmit={handleSubmit}
    >
      <p className="fs-2 fw-bold">{!editMode ? "Add user" : "Edit user"}</p>
      <div
        style={{
          margin: "auto",
          padding: "16px",
          maxWidth: "400px",
          alignContent: "center",
        }}
      >
        <MDBInput
          value={name}
          name="name"
          type="text"
          onChange={onInputChange}
          required
          label="Name"
          validation="Please enter your name"
          invalid
        />
        <br />
        <MDBInput
          value={email}
          name="email"
          type="email"
          onChange={onInputChange}
          required
          label="Email"
          validation="Please enter your email"
          invalid
        />
        <br />
        <MDBInput
          value={phone}
          name="phone"
          type="number"
          onChange={onInputChange}
          required
          label="Phone"
          validation="Please enter your phone"
          invalid
        />
        <br />
        <MDBInput
          value={address}
          name="address"
          type="text"
          onChange={onInputChange}
          required
          label="Address"
          validation="Please enter your address"
          invalid
        />
        <br />
      </div>
      <div>
        <MDBBtn type="submit" color="primary" style={{ margin: "16px" }}>
          {!editMode ? "Add" : "Update"}
        </MDBBtn>
        <MDBBtn
          onClick={() => navigate("/")}
          type="reset"
          color="danger"
          style={{ margin: "16px" }}
        >
          Go Back
        </MDBBtn>
      </div>
    </MDBValidation>
  );
}

export default EditUser;
