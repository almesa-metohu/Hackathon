import { useState } from 'react';
import {
    Button,
    Switch,
    VStack,
    Heading,
    Text,
    useToast,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Badge,
    Stack,
} from '@chakra-ui/react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const AdminView = () => {
    const [isSuperUser, setIsSuperUser] = useState(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const toast = useToast();
    const [requests, setRequests] = useState([]);
    const navigate = useNavigate()

    const createRequest = (role) => {
        const newRequest = { id: Date.now(), role, status: 'Pending' };
        setRequests([...requests, newRequest]);
        toast({
            title: 'Role change requested',
            status: 'info',
            duration: 3000,
            isClosable: true,
        });
    };

    const acceptRequest = (id) => {
        const updatedRequests = requests.map((request) => {
            if (request.id === id) {
                return { ...request, status: 'Approved' };
            }
            return request;
        });
        setRequests(updatedRequests);
        toast({
            title: 'Request accepted',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    };

    const logOut = () => {
        console.log('logging out')
        axios.post('http://localhost:8000/api/logout', {}, {withCredentials: 'same-origin'})
            .then(e => {
                localStorage.removeItem('userId');
                navigate('/auth')
            })
    }

    const rejectRequest = (id) => {
        const updatedRequests = requests.map((request) => {
            if (request.id === id) {
                return { ...request, status: 'Rejected' };
            }
            return request;
        });
        setRequests(updatedRequests);
        toast({
            title: 'Request rejected',
            status: 'error',
            duration: 3000,
            isClosable: true,
        });
    };

    const handleRoleChange = () => {
        setIsConfirmationOpen(true);
    };

    const handleConfirmRoleChange = () => {
        setIsSuperUser(!isSuperUser);
        setIsConfirmationOpen(false);
        createRequest(isSuperUser ? 'User' : 'Driver');
    };

    const handleRejectRoleChange = () => {
        setIsConfirmationOpen(false);
    };

    return (
        <VStack spacing={4} align="start">
            <Heading size="md">User Management</Heading>
            <Button
                size="sm"
                colorScheme="red"
                onClick={logOut}
            >
                Log Out
            </Button>

            {/* Admin Confirmation Dialog */}
            <AlertDialog isOpen={isConfirmationOpen} leastDestructiveRef={undefined}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Admin Confirmation
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to change the user's role?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button colorScheme="red" onClick={handleRejectRoleChange}>
                                Decline
                            </Button>
                            <Button colorScheme="teal" ml={3} onClick={handleConfirmRoleChange}>
                                Accept
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

            {/* Requests Tab */}
            <Tabs isLazy>
                <TabList>
                    <Tab>Requests</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Stack spacing={4} align="start">
                            {requests.map((request) => (
                                <Stack
                                    key={request.id}
                                    direction="row"
                                    align="center"
                                    justify="space-between"
                                    p={4}
                                    borderWidth={1}
                                    borderRadius="md"
                                    _hover={{ boxShadow: '0 0 5px teal' }}
                                >
                                    <Stack direction="column" spacing={2}>
                                        <Text>{request.role}</Text>
                                        <Badge
                                            variant="subtle"
                                            colorScheme={request.status === 'Approved' ? 'green' : 'red'}
                                        >
                                            {request.status}
                                        </Badge>
                                    </Stack>
                                    <Stack direction="row" spacing={2} align="center">
                                        <Button
                                            size="sm"
                                            colorScheme="teal"
                                            onClick={() => acceptRequest(request.id)}
                                            isDisabled={request.status !== 'Pending'}
                                        >
                                            Accept
                                        </Button>
                                        <Button
                                            size="sm"
                                            colorScheme="blue"
                                            onClick={() => rejectRequest(request.id)}
                                            isDisabled={request.status !== 'Pending'}
                                        >
                                            Reject
                                        </Button>
                                    </Stack>
                                </Stack>
                            ))}
                        </Stack>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </VStack>
    );
};

export default AdminView;