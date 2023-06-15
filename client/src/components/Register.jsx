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
                navigate("/home");
            }
        }   catch (error) {
            console.log(error)
            setValidation(error.response.data.errors)
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
                {validation.firstName? validation.firstName.message:""}
            </FormControl>
            <FormControl id="last-name" isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input
                    placeholder='Enter your last name'
                    onChange={(e) => setLastName(e.target.value)}
                />
                {validation.lastName? validation.lastName.message:""}
            </FormControl>
            <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    placeholder='Enter your email'
                    onChange={(e) => setEmail(e.target.value)}
                />
                                {validation.email? validation.email.message:""}

            </FormControl>
            <FormControl id="location" isRequired>
                <FormLabel>Location</FormLabel>
                <Select placeholder='Select option' onChange={(e) => setLocation(e.target.value)}>
                    <option value='Bajram Curri'>Bajram Curri</option>
                    <option value='Berat'>Berat</option>
                    <option value='Bulqize'>Bulqize</option>
                    <option value='Burrel'>Burrel</option>
                    <option value='Cerrik'>Cerrik</option>
                    <option value='Divjake'>Divjake</option>
                    <option value='Diber'>Diber</option>
                    <option value='Durres'>Durres</option>
                    <option value='Elbasan'>Elbasan</option>
                    <option value='Erseke'>Erseke</option>
                    <option value='Fier'>Fier</option>
                    <option value='Fushe-Kruje'>Fushe-Kruje</option>
                    <option value='Gjirokaster'>Gjirokaster</option>
                    <option value='Gramsh'>Gramsh</option>
                    <option value='Himare'>Himare</option>
                    <option value='Klos'>Klos</option>
                    <option value='Kavaje'>Kavaje</option>
                    <option value='Konispol'>Konispol</option>
                    <option value='Kruje'>Kruje</option>
                    <option value='Kucove'>Kucove</option>
                    <option value='Kukes'>Kukes</option>
                    <option value='Lac'>Lac</option>
                    <option value='Lezhe'>Lezhe</option>
                    <option value='Librazhd'>Librazhd</option>
                    <option value='Peshkopi'>Peshkopi</option>
                    <option value='Permet'>Permet</option>
                    <option value='Pogradec'>Pogradec</option>
                    <option value='Puke'>Puke</option>
                    <option value='Rrogozhine'>Rrogozhine</option>
                    <option value='Sarande'>Sarande</option>
                    <option value='Tepelene'>Tepelene</option>
                    <option value='Tirane'>Tirane</option>
                    <option value='Vlore'>Vlore</option>
                </Select>
                {validation.location? validation.location.message:""}

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
                {validation.confirmPassword? validation.confirmPassword.message:""}

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