import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import UserSession from "../UserSession";

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
    };
  }
  
  componentDidMount() {
    UserSession.attachNavMenu(this)
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  
  sessionToggle () {
    console.log("checking status")
    if (UserSession.checkSession()){
      console.log("Session active")
      return(
          <NavItem>
            <NavLink tag={Link} className="text-white" to="/logout">Log out</NavLink>
          </NavItem>
      )
    } return (
        <NavItem>
          <NavLink tag={Link} className="text-white" to="/login">Log in</NavLink>
        </NavItem>
    )
  }
  
  displayUsername () {
    if (UserSession.checkSession()){
      return (
          <small className="text-white">Logged in as {UserSession.getUsername()}</small>
      )
    } return null
  }

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm navbar-dark bg-danger border-danger border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/">Supersimple Forum</NavbarBrand>
            {this.displayUsername()}
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-white" to="/createPost">New post</NavLink>
                </NavItem>
                {this.sessionToggle()}
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
