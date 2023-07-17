import React, { useState } from "react";
import axios from 'axios'
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const DriverForm = (props) => {
  const [idCard, setIdCard] = useState("");
  const userId =localStorage.getItem('userId')
  const navigate = useNavigate()

  const driverLicense = (photo) => {
    // Function for handling the driver license photo (if needed).
  }

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/driverRequest/' + userId, {
        idCard,
      }, { withCredentials: true });
      console.log(response)
      navigate('/home')
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <Box bg="teal.500" color="black" py={40}>
      <Box maxW="md" mx="auto" p={4} bg="white" borderRadius="md">
        <Heading size="lg" mb={4} textAlign="center">
          Driver Registration
        </Heading>
        <FormControl id="personal-number" mb={4} isRequired>
          <FormLabel color="black">Personal Number (ID) :</FormLabel>
          <Input
            placeholder='Enter your ID'
            value={idCard}
            onChange={(e) => setIdCard(e.target.value)}
          />
        </FormControl>
        <FormControl id='driver-license' mb={4} isRequired>
          <FormLabel color="black">Driver License (Front Side) :</FormLabel>
          <Input
            type='file'
            p={1.5}
            accept="image/*"
            onChange={(e) => driverLicense(e.target.value[0])}
          />
        </FormControl>
        <Button
          colorScheme="teal"
          width='100%'
          style={{ marginTop: 15 }}
          onClick={handleRegister}
        >
          Be a Driver
        </Button>
      </Box>
    </Box>
  )
}

export default DriverForm;
