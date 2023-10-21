import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { deleteTeamMembersRelationship } from '../api/mergedData';

function TeamCard({ teamObj, onUpdate }) {
  const deleteATeam = () => {
    if (window.confirm(`Are you sure you want to delete ${teamObj.name}?`)) {
      deleteTeamMembersRelationship(teamObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <>
      <Card id="teamCard">
        <Card.Img id="tImg" variant="top" src={teamObj.image} />
        <Card.Body>
          <Card.Title>{teamObj.name}</Card.Title>
          <div id="teamCardBtns">
            <Link href={`/team/${teamObj.firebaseKey}`} passHref>
              <Button variant="outline-secondary" className="m-2">View
              </Button>
            </Link>
            <Link href={`team/edit/${teamObj.firebaseKey}`} passHref>
              <Button variant="outline-secondary" className="m-2">Edit
              </Button>
            </Link>
            <Button variant="outline-danger" onClick={deleteATeam}>Delete</Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

TeamCard.propTypes = {
  teamObj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,

};

export default TeamCard;
