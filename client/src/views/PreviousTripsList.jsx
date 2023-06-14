import { List, ListItem, Text, Stack, Button, Box, Flex, Link, Spacer, Image } from '@chakra-ui/react';


const PreviousTripsList = () => {
    const previousTrips = [
        'Tirane',
        'Durres',
        'Vlore',
        'Shkoder',
        'Korce',
    ];

    return (
        <div>
            <Box>
                <Box bg="gray.200" py={4} px={8}>
                    <Flex alignItems="center">
                        <Link href="/home" fontSize="xl" fontWeight="bold">
                            Ikim? IKIM!
                        </Link>
                        <Spacer />
                        <Box>
                            <Link href="/be-a-driver" mr={4}>
                                Be a driver
                            </Link>
                        </Box>
                    </Flex>
                </Box>
            </Box>
        <List spacing={3}>
            {previousTrips.map((trip, index) => (
                <ListItem key={index}>
                    <Box
                        maxWidth="80%"
                        padding="4"
                        borderWidth="1px"
                        borderRadius="md"
                        _hover={{ boxShadow: '0 0 5px teal' }}
                    >
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Box display="flex" alignItems="center">
                                <Image
                                    marginRight="5%"
                                    src="https://storage.googleapis.com/albania-travel-guide/2022/07/Vlore-Albania-Travel-Guide-44-960x540.jpg"
                                    boxSize={20}
                                    borderRadius="full"
                                />
                                <Text fontSize="xl" fontWeight="bold">{trip}</Text>
                            </Box>
                            <Stack display="flex" alignItems="end">
                                <Text fontSize="md" color="gray.500">Shoferi: Bruno</Text>
                                <Text fontSize="md" color="gray.500">Ora: 10:30</Text>
                            </Stack>
                            <Button
                                colorScheme="teal"
                                isDisabled
                                cursor="not-allowed"
                                _hover={{ opacity: 0.8 }}
                            >
                                Finished
                            </Button>
                        </Box>
                    </Box>
                </ListItem>
            ))}
        </List>
        </div>
    );
};

export default PreviousTripsList;