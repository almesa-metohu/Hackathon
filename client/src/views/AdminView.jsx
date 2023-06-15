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
        <VStack spacing={4} align="start">
            <Heading size="md">User Management</Heading>
            <Button size="sm" colorScheme="red" onClick={logOut}>
                Log Out
            </Button>
            <Box width="97%" padding="4" borderWidth="1px" borderRadius="md" _hover={{ outline: '2px solid teal' }}>
                <Flex alignItems="center" flexDirection='column'>
                    <div>
                        <p>Request</p>
                        {requests ? (
                            requests.map((request, index) => (
                                <div key={index} style={{ width: '100%' }}>
                                    {request.firstName}{' '}
                                    <Button size="sm" colorScheme="teal" onClick={() => AcceptRequest(request._id)}>
                                        Accept
                                    </Button>{' '}
                                    <Button size="sm" colorScheme="red" onClick={() => DeclineRequest(request._id)}>
                                        Decline
                                    </Button>
                                </div>
                            ))
                        ) : (
                            ''
                        )}
                    </div>
                </Flex>
            </Box>

            <Box width="97%" padding="4" borderWidth="1px" borderRadius="md" _hover={{ outline: '2px solid teal' }}>
                <Flex alignItems="center" flexDirection='column'>
                        <p>Drivers</p>
                        {drivers ? (
                            drivers.map((request, index) => (
                                <div key={index} style={{ width: '100%' }}>
                                    <Box display='flex'
                                        justifyContent='space-between'
                                        width="90%"
                                        padding="4"
                                        borderWidth="1px"
                                        borderRadius="md"
                                        _hover={{ outline: '2px solid teal' }}
                                    >
                                        <Flex alignItems="center" justifyContent='space-between' width='100%'>
                                            {' '}
                                            <Link to={`/driver/${request._id}`}>{request.firstName}</Link>{' '}
                                            <Button size="sm" colorScheme="red" onClick={() => removeDriver(request._id)}>
                                                Remove Driver
                                            </Button>{' '}
                                        </Flex>
                                    </Box>
                                </div>
                            ))
                        ) : (
                            ''
                        )}
                </Flex>
            </Box>
        </VStack>
    );
};

export default AdminView;
