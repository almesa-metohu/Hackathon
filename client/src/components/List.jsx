import { Box, Flex, Image, Text, Button } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import React, {useState, useEffect} from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Profile = (props) => {

  const {socket, update, setUpdate, word} = props
  const navigate = useNavigate()
  const [rides, setRides] = useState([]);


  useEffect(()=> {
    const userToken = localStorage.getItem('token')
    console.log(userToken)
    axios.get('http://localhost:8000/api/rides', {withCredentials: true})
      .then(res => {
        console.log(res.data)
        setRides(res.data.filter(word2=> word2.location.toLowerCase().includes(word.toLowerCase())  ))})
      .catch(err => {
        console.log(err)
        err.response.status === 401 ? navigate('/') : console.log(err)
      })
      socket.on('toClient', (ride) => {
        setUpdate(!update)
      })
      return () => socket.removeAllListeners()
  }, [update,word])

  return (
    <div>
      {rides ? rides.map((ride, index) => (
        <div key={index}>
          <Box maxWidth="70%" padding="4" borderWidth="1px" borderRadius="md" _hover={{ outline: '2px solid teal' }}>
          <Flex alignItems="center">
            <Box marginRight={4}>
              <Image
                src="https://media.licdn.com/dms/image/C4D03AQEjie15QSbS8Q/profile-displayphoto-shrink_800_800/0/1658486032382?e=2147483647&v=beta&t=mHP6ZORElSLzwR5ituzLGtWlcs4H2NJBgrfptvNdYSg"
                boxSize={20}
                borderRadius="full"
              />
            </Box>
            <Box>
              <Text fontSize="xl" fontWeight="bold">{ ride.driver ? ride.driver.firstName : "ska "}</Text>
              <Text fontSize="md" color="gray.500">Location: {ride.location}</Text>
              <Text fontSize="md" color="gray.500">Ora: {ride.hour}:{ride.minutes == 0 ? "00" : ride.minutes} {ride.amPM}</Text>
              <Box display="flex" alignItems="start" justifyContent="space-around">
              <Text fontSize="md" color="gray.500">4/4</Text>
              <Image src='https://cdn-icons-png.flaticon.com/512/17/17181.png' width={5} height={5} />
              </Box>
    
            </Box>
            <Box marginLeft="auto">
              <Text fontSize="md" color="gray.500">Price: ALL{ride.price}</Text>
              <Button colorScheme="teal">Get a Seat</Button>
            </Box>
          </Flex>
        </Box>
      </div>
      )) : ""}
    </div>
  );
}

export default Profile;