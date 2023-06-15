import { List, ListItem, Text, Stack, Button, Box, Flex, Link, Spacer, Image } from '@chakra-ui/react';
import Navbar from '../components/NavBar';

const PreviousTripsList = () => {
  const previousTrips = [
    'Tirane',
    'Durres',
    'Vlore',
    'Shkoder',
    'Korce',
  ];

  const albaniaImages = [
    'https://storage.googleapis.com/albania-travel-guide/2022/07/Vlore-Albania-Travel-Guide-44-960x540.jpg',
    'https://cdn.britannica.com/35/195935-050-456D7CBC/Skanderbeg-Square-Tirana-Albania.jpg', // Add more image URLs here
    'https://slightnorth.com/wp-content/uploads/2018/07/IMG_3918-1024x768.jpg',
    'https://cdn.albanianews.al/wp-content/uploads/2018/09/Korce-Coriza-Albania.jpg',
    'https://www.visitsaranda.net/wp-content/uploads/2022/04/visit-saranda-cover.jpg',
  ];

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * albaniaImages.length);
    return albaniaImages[randomIndex];
  };

  return (
    <div>
      <Navbar/>
      <Flex justifyContent="center" alignItems="center">
      <List width="100%" spacing={3}>
        {previousTrips.map((trip, index) => (
          <ListItem  key={index}>
            <Box
              width="97%"
              padding="4"
              borderWidth="1px"
              borderRadius="md"
              _hover={{ boxShadow: '0 0 5px teal' }}
            >
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center">
                  <Image
                    marginRight="5%"
                    src={getRandomImage()} // Use a random image URL
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
      </Flex>
    </div>
  );
};

export default PreviousTripsList;
