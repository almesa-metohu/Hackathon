import React, { useState } from "react";
import axios from 'axios'
import { VStack, FormControl, FormLabel, Input, Button, Select, Heading, Center } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AddRide = (props) => {
    const [hour, setHour] = useState('');
    const [minutes, setMinutes] = useState('');
    const [amPM, setAmpm] = useState('');
    const [people, setPeople] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const userId = localStorage.getItem('userId')
    const navigate = useNavigate()


    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/newRide/' + userId, {
                hour,
                minutes,
                amPM,
                people,
                location,
                price,
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
                        Add Ride
                    </Heading>
                    <FormControl id="hour" mb={4} isRequired>
                        <FormLabel>Hour :</FormLabel>
                        <Input
                            type="number"
                            placeholder='Enter the time'
                            onChange={(e) => setHour(e.target.value)}
                        />
                    </FormControl>
                    <FormControl id='minutes' mb={4} isRequired>
                        <FormLabel>Minutes :</FormLabel>
                        <Input
                            type="number"
                            placeholder='Enter the time'
                            onChange={(e) => setMinutes(e.target.value)}
                        />
                    </FormControl>
                    <FormControl id="ampm" isRequired>
                        <FormLabel>AM/PM :</FormLabel>
                        <Select placeholder='Select option' onChange={(e) => setAmpm(e.target.value)}>
                            <option>AM</option>
                            <option>PM</option>
                        </Select>
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
                    </FormControl>
                    <FormControl id='people' mb={4} isRequired>
                        <FormLabel>People:</FormLabel>
                        <Input
                            type="number"
                            placeholder='Enter the number of people'
                            onChange={(e) => setPeople(e.target.value)}
                        />
                    </FormControl>
                    <FormControl id='price' mb={4} isRequired>
                        <FormLabel>Price / person :</FormLabel>
                        <Input
                            type="number"
                            placeholder='Enter the price'
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </FormControl>
                    <Button
                        colorScheme="blue"
                        width='100%'
                        style={{ marginTop: 15 }}
                        onClick={handleRegister}
                    >
                        Add Ride
                    </Button>
                </VStack>
            </Center>
        </>
    )
}

export default AddRide;