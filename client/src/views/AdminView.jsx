import { useState, useEffect } from 'react';
import { Button, VStack, Heading, Flex, Box } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const AdminView = () => {
    const [drivers, setDrivers] = useState([]);
    const [requests, setRequests] = useState([]);
    const [update, setUpdate] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/getRequest/')
            .then((res) => {
                console.log(res);
                setRequests(res.data);
            })
            .catch((err) => console.log(err));
        axios
            .get('http://localhost:8000/api/getDrivers/')
            .then((res) => {
                console.log(res);
                setDrivers(res.data);
            })
            .catch((err) => console.log(err));
    }, [update]);

    const logOut = () => {
        console.log('logging out');
        axios
            .post('http://localhost:8000/api/logout', {}, { withCredentials: 'same-origin' })
            .then((e) => {
                localStorage.removeItem('userId');
                navigate('/auth');
            });
    };

    const DeclineRequest = (driverId) => {
        axios.get('http://localhost:8000/api/removeRequest/' + driverId).then((e) => {
            setUpdate(!update);
        });
    };

    const AcceptRequest = (userId) => {
        axios.get('http://localhost:8000/api/updateRole/' + userId).then((e) => {
            setUpdate(!update);
        });
    };

    const removeDriver = (userId) => {
        axios.get('http://localhost:8000/api/removeDriver/' + userId).then((e) => {
            setUpdate(!update);
        });
    };

    return (
        <VStack spacing={4} py={8}>
            <Heading size="m" color='teal'>User Management</Heading>
            <Button size="sm" bg={'teal.800'} color={'white'} onClick={logOut}>
                Log Out
            </Button>
            <Box width="80%" padding="4" borderWidth="1px" borderRadius="md" p={4} _hover={{ outline: '2px solid teal' }}>
                <Heading size="sm" mb={2}>
                    Requests
                </Heading>
                {requests && requests.length > 0 ? (
                    requests.map((request) => (
                        <Flex key={request._id} justifyContent="space-between" alignItems="center">
                            <Box>{request.firstName}</Box>
                            <Flex>
                                <Button size="sm" colorScheme="teal" onClick={() => AcceptRequest(request._id)}>
                                    Accept
                                </Button>
                                <Button size="sm" colorScheme="red" ml={2} onClick={() => DeclineRequest(request._id)}>
                                    Decline
                                </Button>
                            </Flex>
                        </Flex>
                    ))
                ) : (
                    <Box>No requests found.</Box>
                )}
            </Box>

            <Box width="80%" padding="4" borderWidth="1px" borderRadius="md" p={4} _hover={{ outline: '2px solid teal' }}>
                <Heading size="sm" mb={2}>
                    Drivers
                </Heading>
                {drivers && drivers.length > 0 ? (
                    drivers.map((driver) => (
                        <Flex key={driver._id} justifyContent="space-between" alignItems="center" mb={2}>
                            <Link to={`/driver/${driver._id}`}>{driver.firstName}</Link>
                            <Button size="sm" colorScheme="red" onClick={() => removeDriver(driver._id)}>
                                Remove Driver
                            </Button>
                        </Flex>
                    ))
                ) : (
                    <Box>No drivers found.</Box>
                )}
            </Box>
        </VStack>
    );
};

export default AdminView;
