import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { deleteTeamMember } from '../api/members';

function MemberCard({ memberObj, onUpdate }) {
  const deleteMember = () => {
    if (window.confirm(`Are you sure you want to delete ${memberObj.name}?`)) {
      deleteTeamMember(memberObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={memberObj.image} />
        <Card.Body>
          <Card.Title>{memberObj.name}</Card.Title>
          <Card.Text>
            {memberObj.role}
          </Card.Text>
          <Link href={`/${memberObj.firebaseKey}`} passHref>
            <Button variant="outline-secondary" className="m-2">View
            </Button>
          </Link>
          <Link href={`/edit/${memberObj.firebaseKey}`} passHref>
            <Button variant="outline-secondary" className="m-2">Edit
            </Button>
          </Link>
          <Button variant="outline-danger" onClick={deleteMember}>Delete</Button>
        </Card.Body>
      </Card>
    </>
  );
}

MemberCard.propTypes = {
  memberObj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    role: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,

};

export default MemberCard;
