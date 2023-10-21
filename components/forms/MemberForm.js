import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createTeamMember, updateTeamMember } from '../../api/members';
import { getTeams } from '../../api/teams';

const initialState = {
  name: '',
  image: '',
  role: '',
  teamId: '',
};

function MemberForm({ memberObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [teams, setTeams] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (memberObj.firebaseKey) setFormInput(memberObj);
    getTeams(user.uid).then(setTeams);
  }, [memberObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (memberObj.firebaseKey) {
      console.warn('Im here');
      updateTeamMember(formInput).then(() => router.push('/members'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createTeamMember(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateTeamMember(patchPayload).then(() => router.push('/members'));
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Member Name"
            name="name"
            value={formInput.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Role</Form.Label>
          <Form.Select
            name="role"
            onChange={handleChange}
            value={formInput.role}
            required
          >
            <option value="">Select A Role</option>
            <option>Quarterback</option>
            <option>Wide Receiver</option>
            <option>Tight End</option>
            <option>Left Tackle</option>
            <option>Line Backer</option>
            <option>Running Back</option>
            <option>Kicker</option>
            <option>Water Boy</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Member Image URL"
            name="image"
            value={formInput.image}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Team</Form.Label>
          <Form.Select
            name="teamId"
            onChange={handleChange}
            value={formInput.teamId}
            required
          >
            <option value="">Select A Team</option>

            {
            teams.map((team) => (
              <option
                key={team.firebaseKey}
                value={team.firebaseKey}
              >
                {team.name}
              </option>
            ))
          }

          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

MemberForm.propTypes = {
  memberObj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    role: PropTypes.string,
    teamId: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

MemberForm.defaultProps = {
  memberObj: initialState,

};

export default MemberForm;
