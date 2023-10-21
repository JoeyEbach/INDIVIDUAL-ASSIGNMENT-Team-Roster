import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createTeam, updateTeam } from '../../api/teams';

const initialState = {
  name: '',
  image: '',
};

function TeamForm({ teamObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (teamObj.firebaseKey) setFormInput(teamObj);
  }, [teamObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (teamObj.firebaseKey) {
      updateTeam(formInput).then(() => router.push('/teams'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createTeam(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateTeam(patchPayload).then(() => router.push('/teams'));
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Team Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Team Name"
            name="name"
            value={formInput.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Team Image</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Team Image URL"
            name="image"
            value={formInput.image}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

TeamForm.propTypes = {
  teamObj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

TeamForm.defaultProps = {
  teamObj: initialState,

};

export default TeamForm;
