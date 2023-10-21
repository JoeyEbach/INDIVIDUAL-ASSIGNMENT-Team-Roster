import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { deleteTeamMember } from '../api/members';
import { getTeamDetails } from '../api/mergedData';

function MemberCard({ memberObj, onUpdate }) {
  const [teamDetails, setTeamDetails] = useState({});
  const deleteMember = () => {
    if (window.confirm(`Are you sure you want to delete ${memberObj.name}?`)) {
      deleteTeamMember(memberObj.firebaseKey).then(() => onUpdate());
    }
  };

  useEffect(() => {
    getTeamDetails(memberObj.teamId).then(setTeamDetails);
  }, []);

  return (
    <>
      <Card id="memberCard">
        <Card.Img id="cImg" variant="top" src={memberObj.image} />
        <Card.Body>
          <Card.Title>{memberObj.name}</Card.Title>
          <Card.Text>
            {teamDetails.name}: {memberObj.role}
          </Card.Text>
          <div id="memberCardBtns">
            <Link href={`/member/${memberObj.firebaseKey}`} passHref>
              <Button variant="outline-secondary" className="m-2">View
              </Button>
            </Link>
            <Link href={`member/edit/${memberObj.firebaseKey}`} passHref>
              <Button variant="outline-secondary" className="m-2">Edit
              </Button>
            </Link>
            <Button id="deletebtn" variant="outline-danger" onClick={deleteMember}>Delete</Button>
          </div>
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
    teamId: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,

};

export default MemberCard;
