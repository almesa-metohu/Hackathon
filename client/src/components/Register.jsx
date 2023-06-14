import React, { useState } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { VStack, Select, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";


const Register = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [validation, setValidation] = useState({})
    const [show, setShow] = useState(false)
    const navigate = useNavigate()

    const showPass = (e) => {
        setShow(!show)
    }

    const postDetails = (photo) =>{

    }

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/register', {
                firstName,
                lastName,
                email,
                location,
                password,
                confirmPassword
            }, { withCredentials: true });

            if (response.status === 200) {
                localStorage.setItem('userId', JSON.stringify(response.data.user._id));
                navigate("/");
            }
        }   catch (error) {
            console.log(error)
        }
    };

    return (
        <VStack spacing='5px'>
            <FormControl id="first-name" isRequired>
                <FormLabel>First Name</FormLabel>
                <Input
                    placeholder='Enter your first name'
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </FormControl>
            <FormControl id="last-name" isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input
                    placeholder='Enter your last name'
                    onChange={(e) => setLastName(e.target.value)}
                />
            </FormControl>
            <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    placeholder='Enter your email'
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id="location" isRequired>
                <FormLabel>Location</FormLabel>
                <Select placeholder='Select option' onChange={(e) => setLocation(e.target.value)}>
                    <option value='option1'>Bajram Curri</option>
                    <option value='option3'>Berat</option>
                    <option value='option1'>Bulqize</option>
                    <option value='option2'>Burrel</option>
                    <option value='option3'>Berat</option>
                    <option value='option1'>Cerrik</option>
                    <option value='option2'>Divjake</option>
                    <option value='option2'>Diber</option>
                    <option value='option3'>Durres</option>
                    <option value='option1'>Elbasan</option>
                    <option value='option2'>Erseke</option>
                    <option value='option3'>Fier</option>
                    <option value='option1'>Fushe-Kruje</option>
                    <option value='option2'>Gjirokaster</option>
                    <option value='option3'>Gramsh</option>
                    <option value='option3'>Himare</option>
                    <option value='option1'>Klos</option>
                    <option value='option2'>Kavaje</option>
                    <option value='option3'>Konispol</option>
                    <option value='option1'>Kruje</option>
                    <option value='option2'>Kucove</option>
                    <option value='option3'>Kukes</option>
                    <option value='option1'>Lac</option>
                    <option value='option2'>Lezhe</option>
                    <option value='option3'>Librazhd</option>
                    <option value='option1'>Peshkopi</option>
                    <option value='option2'>Permet</option>
                    <option value='option3'>Pogradec</option>
                    <option value='option3'>Puke</option>
                    <option value='option1'>Rrpgozhine</option>
                    <option value='option2'>Sarande</option>
                    <option value='option3'>Tepelene</option>
                    <option value='option1'>Tirane</option>
                    <option value='option2'>Vlore</option>
                </Select>
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show ? 'text' : "password"}
                        placeholder='Enter your password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement>
                        <Button h='1.75rem' size='sm' onClick={showPass}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id="confirm-password" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show ? 'text' : "password"}
                        placeholder='Enter your password'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <InputRightElement>
                        <Button h='1.75rem' size='sm' onClick={showPass}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl>
                <FormLabel>Upload your photo</FormLabel>
                <Input
                    type='file'
                    p={1.5}
                    accept="image/*"
                    onChange={(e) => postDetails(e.target.value[0])}
                    />
            </FormControl>

            <Button
                colorScheme="blue"
                width='100%'
                style={{marginTop: 15}}
                onClick={handleRegister}
            >
                Sign Up
            </Button>
        </VStack>
    )
}

export default Register;