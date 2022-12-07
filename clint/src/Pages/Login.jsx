import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {  useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useRef } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const currentRef = useRef();
  const navigate = useNavigate();
  const toast = useToast();
  const [count, setCount] = useState(0);
  const timerid = useRef(null);
  let [setTimer] = useState(86400000);
  const [lastLoginTime, setlastLoginTime] = useState("");

  useEffect(() => {
    if (!currentRef.current) {
      let Timer = setTimeout(() => {
        if (count > 4) {
          const payload = {
            email: email,
          };
          console.log("payload", payload);
          fetch(`http://localhost:8080/countupdate`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          })
            .then((res) => res.json())
            .then((res) => {
              if (res.message === "Count updated Successfully") {
                setCount(res.wrongCount);
                localStorage.setItem("count", JSON.stringify(res.wrongCount));
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }, 86400000);

      return () => {
        clearTimeout(Timer);
      };
    }
  }, [lastLoginTime, count]);

  const handleLogin = () => {
    const payload = {
      email,
      password,
    };

    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "login successful" && res.token) {
          localStorage.setItem("userToken", res.token);
          localStorage.setItem("userData", JSON.stringify(res.userData));
          toast({
            title: "Login Success",
            position: "top",
            description: "Login successful",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          navigate("/");
        }
        if (res.message === "Something went wrong") {
          setCount(res.wrongCount);
          localStorage.setItem("count", JSON.stringify(res.wrongCount));
          toast({
            title: "Login Failed",
            position: "top",
            description: "Something went wrong",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
        }
        if (
          res.message === "Can not attempt more than 5 times. Try after 24 hrs"
        ) {
          localStorage.setItem("lastLoginTime", res.lastTimeLogin);
          setlastLoginTime(res.lastTimeLogin);
          localStorage.setItem("count", JSON.stringify(res.wrongCount));
          setCount(res.wrongCount);
        }
      });
  };

  function msToTime(duration) {
    var milliseconds = Math.floor((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
  }
  useEffect(() => {
    if (count === 5) {
      if (!timerid.current) {
        let id = setInterval(() => {
          setTimer((prev) => prev - 100);
        }, 100);
        timerid.current = id;
      }
    }
    return () => {
      clearTimeout(timerid.current);
      timerid.current = null;
    };
  }, [count]);

  return (
    <Box
      w="100%"
      display={"flex"}
      justifyContent="center"
      alignItems={"center"}
    >
      {count === 5 ? (
        <Alert
          status="error"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="400px"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Too many wrong attempts at a time
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            your account is now blocked for 24 hours
          </AlertDescription>
        </Alert>
      ) : (
        <Box w={{ base: "80%", sm: "80%", md: "60%", lg: "40%" }}>
          <Box
            m="auto"
            mt="40px"
            height="450px"
            p="15px"
            boxShadow={
              "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;"
            }
          >
            <Text fontWeight="bold" fontSize={"22px"} mt="20px">
              Login
            </Text>
            <Box w="70%" m="auto">
              <FormControl isRequired mt="30px">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  borderRadius={"0px"}
                />
              </FormControl>
              <FormControl isRequired mt="20px">
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    borderRadius={0}
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    variant={"solid"}
                    borderRadius={"0px"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputGroup>
              </FormControl>
              <Button
                w="30%"
                m="auto"
                mt="20px"
                colorScheme="blue"
                color="white"
                onClick={handleLogin}
              >
                Submit
              </Button>
              <br />
              <Text color="red">
                Can not login after entering wrong password 5 times.
              </Text>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Login;
