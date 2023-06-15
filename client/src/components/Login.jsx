import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { VStack, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";

const Login = ({setRefresh}) => {

    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validation, setValidation] = useState({})
    const [show, setShow] = useState(false)

    const showPass = (e) => {
        setShow(!show)
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/login', { 
                email, 
                password 
            }, { withCredentials: true });

            if (response.status === 200) {
                console.log(response)
                localStorage.setItem('userId',response.data.user._id);
                setRefresh(Math.random())
                /* console.log(localStorage.getItem('userId')) */
                // response.data : 
                navigate("/home");
            }
        } catch (error) {
            console.log(error)
            setValidation(error.response.data.errors);
        }
    };


    return(
        <VStack spacing='5px'>
            <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    placeholder='Enter your email'
                    onChange={(e) => setEmail(e.target.value)}
                />
                {validation.email? validation.email.message:""}
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
                {validation.password? validation.password.message:""}

            </FormControl>

            <Button
                colorScheme="blue"
                width='100%'
                style={{marginTop: 15}}
                onClick={handleLogin}
            >
                Login
            </Button>
        </VStack>
    )
}

export default Login;