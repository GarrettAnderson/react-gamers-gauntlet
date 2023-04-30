import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert, Dropdown, FormControl } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { CREATE_GAME, ADD_USER } from "../utils/mutations";
import { QUERY_USER, GET_USERS } from "../utils/queries";
import Auth from "../utils/auth";

const CreateGame = () => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(Auth.userId);
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    gameName: "",
    player1: "",
    player2: "",
    player1Score: 0,
    player2Score: 0,
  });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  // declare addUser function
  const { addUser } = useMutation(ADD_USER);
  const [createAGame, { loading: loadNewGame }] = useMutation(CREATE_GAME);
  const { loading, data: usersData } = useQuery(GET_USERS);
  const { data } = useQuery(QUERY_USER);
  //   const [selectedUser, setSelectedUser] = useState(usersData.users[0].email);

  console.log(data.user);
  console.log(usersData);

  //   console.log(getCurrentUser);

  const handleInputChange = (event) => {
    // console.log(event, event.target);
    // console.log(selectedUser);

    console.log(data.user);
    console.log(userFormData);
    console.log(event.target.name, event.target.value);
    const { name, value } = event.target;
    setUserFormData({ name: value });
    console.log(userFormData);
  };

  const choosePlayerTwo = async (event, data) => {
    if (event.target.className.includes("selectDropDown")) {
      console.log("select option");
      console.log(event.target.value, event.target.name);
      const value = event.target.value;
      const name = "player2";
      setUserFormData({ ...userFormData, [name]: value });
      console.log(userFormData);
      //   event.target.map((option) => {
      //     return option;
      //   });
    }
  };

  const choosePlayerOneScore = (event) => {
    // console.log(event.taget);
    const value = 0;
    const name = "player1Score";
    setUserFormData({ ...userFormData, [name]: value });
    console.log(userFormData);
  };

  const choosePlayerTwoScore = (event) => {
    // console.log(event.taget);
    const value = 0;
    const name = "player2Score";
    setUserFormData({ ...userFormData, [name]: value });
    console.log(userFormData);
  };

  const choosePlayerOne = async (event, data) => {
    console.log("player 1 chosen");
    console.log(event.target.value, event.target.name);
    const value = event.target.value;
    const name = "player1";
    setUserFormData({ ...userFormData, [name]: value });
    console.log(userFormData);
  };

  const createGameOnSubmit = async (event) => {
    event.preventDefault();
    console.log(userFormData);
    try {
      const { data: gameData } = await createAGame({
        variables: { ...userFormData },
      });

      console.log("data", gameData);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    navigate("/select");
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

    console.log("after propogation");

    try {
      //   const { data: gameData } = await createAGame({
      //     variables: { ...userFormData },
      //   });

      console.log("data");
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    console.log("after Auth login");

    // setUserFormData({
    //   gameName: "",
    //   player1: "",
    //   player2: "",
    //   player1Score: 0,
    //   player2Score: 0,
    // });
  };

  return (
    <div className="bg-grey">
      <div className="spacer"></div>
      <div className="text-center">Create A Game</div>
      {/* This is needed for the validation functionality above */}
      <Form
        className="text-center"
        noValidate
        validated={validated}
        onSubmit={createGameOnSubmit}
      >
        {/* show alert if server response is bad */}
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your signup!
        </Alert>

        <Form.Group>
          <Form.Label className="p-1" htmlFor="gameName">
            Game Name
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Create Game Name"
            name="name"
            onChange={handleInputChange}
            value={userFormData.gameName}
            required
          />
          <Form.Control.Feedback className="text-faded" type="invalid">
            Game Name is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label className="p-1" htmlFor="player1">
            Player 1
          </Form.Label>
          <Form.Control
            type="text"
            className="form-input"
            placeholder={data.user.email}
            name="player1"
            onClick={choosePlayerOne}
            value={data.user.email}
            required
          />
          <Form.Control.Feedback className="text-faded" type="invalid">
            Player 1 is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label className="p-1" htmlFor="player2">
            Player 2
          </Form.Label>
          {/* <Dropdown> */}
          {/* <Dropdown.Toggle variant="success">Select Player 2</Dropdown.Toggle>
            <Dropdown.Menu>
              {usersData.users.map((user, i) => {
                return (
                  <Dropdown.Item
                    key={i}
                    type="text"
                    onClick={() => handleInputChange}
                    placeholder="Choose Player 2"
                    name="player2"
                    value={user.email}
                  >
                    {user.email}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu> */}
          <FormControl
            as="select"
            className="selectDropDown"
            // onClick={(e) => setSelectedUser(e)}
            onClick={(e) => choosePlayerTwo(e)}
          >
            {usersData.users.map((userChoice, i) => {
              return (
                <option
                  key={i}
                  type="text"
                  //   onClick={(e) => choosePlayerTwo(e)}
                  placeholder="Choose Player 2"
                  name="player2"
                  value={userChoice.email}
                >
                  {userChoice.email}
                </option>
              );
            })}
          </FormControl>
          {/* <select> */}
          {/* </select> */}
          {/* </Dropdown> */}
        </Form.Group>

        <Form.Label className="p-1" htmlFor="player1Score">
          Player 1 Score
        </Form.Label>
        <Form.Control
          type="text"
          className="form-input"
          //   placeholder={data.user.email}
          name="player1Score"
          onClick={choosePlayerOneScore}
          value={0}
        />

        <Form.Label className="p-1" htmlFor="player2Score">
          Player 2 Score
        </Form.Label>
        <Form.Control
          type="text"
          className="form-input"
          name="player2Score"
          onClick={choosePlayerTwoScore}
          value={0}
        />
        <Button
          className="btn-primary"
          //   disabled={
          //     !(
          //       userFormData.gameName &&
          //       userFormData.player1 &&
          //       userFormData.player2
          //     )
          //   }
          type="submit"
          variant="success"
        >
          Submit
        </Button>
        <div className="spacer"></div>
      </Form>
    </div>
  );
};

export default CreateGame;
