import {
  MDBCollapse,
  MDBContainer,
  MDBIcon,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarNav,
  MDBNavbarToggler,
} from "mdb-react-ui-kit";
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <header>
      <MDBNavbar expand="lg" light bgColor="primary">
        <MDBContainer>
          <NavLink to="/" className="text-white d-flex justify-content-between me-3">
            <span style={{ marginRight: "10px" }}>
              <MDBIcon fas icon="book-open" />
            </span>
            <p className="fw-bold">TODO APP</p>
          </NavLink>
          <MDBNavbarToggler
            aria-controls="navbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowMenu(!showMenu)}
          >
            <MDBIcon fas icon="bars" color="white" />
          </MDBNavbarToggler>
          <MDBCollapse navbar show={showMenu}>
            <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
              <MDBNavbarItem>
                <NavLink to="/about" className="fw-bold text-white me-2">
                  About
                </NavLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <NavLink to="/add_user" className="fw-bold text-white me-2">
                  Add User
                </NavLink>
              </MDBNavbarItem>
              {/* <MDBNavbarItem>
                <NavLink to="/edit_user" className="fw-bold text-white me-2">
                  Edit User
                </NavLink>
              </MDBNavbarItem> */}
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </header>
  );
}

export default Header;
