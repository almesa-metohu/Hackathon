import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Heading, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { useParams ,useNavigate} from "react-router-dom";

const EditProfile = (props) => {

    const { id } = useParams()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [location, setLocation] = useState()
    const [email, setEmail] = useState()
    const navigate=useNavigate()

    const userId =localStorage.getItem('userId')
    useEffect(() => {
        axios.get('http://localhost:8000/api/user/' + userId)
            .then(res => {
                setFirstName(res.data.firstName)
                setLastName(res.data.lastName)
                setEmail(res.data.email)
                setLocation(res.data.location)
            })
            .catch(err => console.log(err))
    }, [])

    const handleSave = (e) => {
        e.preventDefault();

        axios.patch('http://localhost:8000/api/editUser/' + userId, {
            firstName,lastName,email,location
        })
            .then(res => {
                console.log(res)
                
                navigate('/home')
            })
                
            .catch(err => {
                console.log(err)
                // setValidation(err.response.data.error.message)
                // setValidation(err.response.data.error2.message)
                
            })
    }

    return (
        <div>
            <Box maxW="md" mx="auto" py={8}>
                <Heading size="lg" mb={4}>
                    Edit Profile
                </Heading>
                <FormControl id="name" mb={4}>
                    <FormLabel>First Name</FormLabel>
                    <Input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </FormControl>
                <FormControl id="name" mb={4}>
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </FormControl>
                <FormControl id="email" mb={4}>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </FormControl>
                <FormControl id="location" mb={4}>
                    <FormLabel>Location</FormLabel>
                    <Input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                </FormControl>
                <Button colorScheme="blue" onClick={handleSave}>
                    Save
                </Button>
            </Box>
        </div>
    )
}

export default EditProfile;