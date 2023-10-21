/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand className="brand">Team Roster</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/teams">
              <Nav.Link>View Teams</Nav.Link>
            </Link>
            <Link passHref href="/members">
              <Nav.Link>View Members</Nav.Link>
            </Link>
            <Link passHref href="/team/new">
              <Nav.Link>Add A Team</Nav.Link>
            </Link>
            <Link passHref href="/member/new">
              <Nav.Link>Add A Member</Nav.Link>
            </Link>
            <Button className="signOut" variant="danger" onClick={signOut}>Sign Out</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
