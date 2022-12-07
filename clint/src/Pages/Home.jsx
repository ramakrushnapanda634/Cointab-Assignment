import {  Button, Card, Heading } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();
  const userToken = localStorage.getItem("userToken");

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  return (
    <div>
      <Card width="450px" margin="auto" bg="beige" mt="50px">
        <Heading>Email-Id-{userData.email}</Heading>
        <br />
        {userToken && (
          <Button
            colorScheme="blue"
            bg="#2563eb"
            width="100px"
            margin="auto"
            mb="5px"
            color="white"
            fontSize="20px"
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}
      </Card>
    </div>
  );
};

export default Home;
