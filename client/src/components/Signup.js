import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import { useMutation } from '@apollo/react-hooks';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const Signup = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', password: '' });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  // declare addUser function 
  const[addUser] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    // console.log(event.target.name, event.target.value);
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(userFormData);
    // console.log('event', event);
    // console.log('event.currentTarget', event.currentTarget);

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    // console.log(form.checkValidity());
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    console.log('after propogation');

    try {
      const { data } = await addUser({
        variables: { ...userFormData}
      });

      console.log('data', data);

      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    } 

    console.log('after Auth login');

    setUserFormData({
      username: '',
      password: '',
    });
  };

  return (
    <div className='bg-grey'>
        <div className='spacer'></div>
        <div className='signup-text' style={{ color: 'white' }}>Signup</div>
      {/* This is needed for the validation functionality above */}
      <Form className='signup-text' noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert>

        <Form.Group>
          <Form.Label className="p-1" htmlFor='username'>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Create username'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback className='text-faded' type='invalid'>Username is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label className="p-1" htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback className='text-faded' type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          className='btn-primary'
          disabled={!(userFormData.username && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
        <div className='spacer'></div>
      </Form>
    </div>
  );
};

export default Signup;