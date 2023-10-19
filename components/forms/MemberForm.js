import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { createMember, updateMember } from '../../api/memberData';
import { useAuth } from '../../utils/context/authContext';

const intialState = {
  name: '',
  role: '',
  image: '',
};

function MemberForm({ obj }) {
  const [formInput, setFormInput] = useState(intialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (obj.firebaseKey) {
      updateMember(formInput).then(() => router.push(`/member/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createMember(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };

        updateMember(patchPayload).then(() => {
          router.push('/members');
        });
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Member Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Team Member Name"
            name="name"
            value={formInput.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicRole">
          <Form.Label> Team Member Role</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Team Member Role"
            name="role"
            value={formInput.role}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Team Member Image</Form.Label>
          <Form.Control
            type="url"
            placeholder="Enter Team Member Image"
            name="image"
            value={formInput.image}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {obj.firebaseKey ? 'Update Member' : 'Submit Team Member'}
        </Button>
      </Form>
    </>
  );
}

MemberForm.propTypes = {
  obj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

MemberForm.defaultProps = {
  obj: intialState,
};

export default MemberForm;
