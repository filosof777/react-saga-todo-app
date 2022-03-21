import {
  MDBBtn,
  MDBIcon,
  MDBSpinner,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBTooltip,
} from "mdb-react-ui-kit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserStart, loadUsersStart } from "../redux/actions";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Home() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(loadUsersStart());
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error])

  if(loading) {
    return (
      <MDBSpinner style={{marginTop: "50px"}} role="status">
        <h4 className="visually-hidden">Loading...</h4>
      </MDBSpinner>
    )
  }

  const handleDelete = (id) => {
    dispatch(deleteUserStart(id));
    toast.success("User deleted successfully");
  };

  return (
    <div className="container" style={{ marginTop: "50px" }}>
      <MDBTable>
        <MDBTableHead dark>
          <tr key="">
            <th scope="col">No.</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>
            <th scope="col">Action</th>
          </tr>
        </MDBTableHead>
        {users &&
          users.map((item, index) => {
            return (
              <MDBTableBody key={item.id}>
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.address}</td>
                  <td>
                    <MDBBtn
                      tag="span"
                      color="none"
                      onClick={() => handleDelete(item.id)}
                    >
                      <MDBTooltip title="Delete" tag="span">
                        <MDBIcon
                          fas
                          icon="trash"
                          style={{ color: "#dd4b39", margin: "10px" }}
                          size="lg"
                        />
                      </MDBTooltip>
                    </MDBBtn>
                    <Link to={`/edit_user/${item.id}`}>
                      <MDBTooltip title="Edit" tag="span">
                        <MDBIcon
                          fas
                          icon="pen"
                          style={{ color: "#55acee", margin: "10px" }}
                          size="lg"
                        />
                      </MDBTooltip>
                    </Link>
                    <Link to={`/user_info/${item.id}`}>
                      <MDBTooltip title="View" tag="span">
                        <MDBIcon
                          fas
                          icon="eye"
                          style={{ color: "#3b5998", margin: "10px" }}
                          size="lg"
                        />
                      </MDBTooltip>
                    </Link>
                  </td>
                </tr>
              </MDBTableBody>
            );
          })}
      </MDBTable>
    </div>
  );
}

export default Home;
