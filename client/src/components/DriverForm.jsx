import React, { useState } from "react";
import axios from 'axios'
import { VStack, FormControl, FormLabel, Input, Button, Heading, Center } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const DriverForm = (props) => {
    const [idCard, setIdCard] = useState('');
    const userId =localStorage.getItem('userId')
    const navigate = useNavigate()


    const driverLicense = (photo) => {

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
        <>
        <Center>
            
            <VStack spacing='5px' maxWidth={400} mt={10}>
                <Heading as="h1" size="xl" mb={10}>
                    Driver Registration
                </Heading>
                <FormControl id="personal-number" mb={4} isRequired>
                    <FormLabel>Personal Number (ID) :</FormLabel>
                    <Input
                        placeholder='Enter your ID'
                        onChange={(e) => setIdCard(e.target.value)}
                    />
                </FormControl>
                <FormControl id='driver-license' mb={4} isRequired>
                    <FormLabel>Driver License (Front Side) :</FormLabel>
                    <Input
                        type='file'
                        p={1.5}
                        accept="image/*"
                        onChange={(e) => driverLicense(e.target.value[0])}
                    />
                </FormControl>
                <Button
                    colorScheme="blue"
                    width='100%'
                    style={{ marginTop: 15 }}
                    onClick={handleRegister}
                >
                    Be a Driver
                </Button>
            </VStack>
        </Center>
        </>
    )
}

export default DriverForm;