import React from "react";
import Register from "../components/Register";
import Login from '../components/Login'
import {
    Box,
    Container,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    Image
} from "@chakra-ui/react";

const Authenticate = ({setRefresh}) => {


    return (
        <Container maxW="xl" centerContent>
            <Box
                display="flex"
                justifyContent="center"
                bg="white"
                w="100%"
                p='20px 0 0 0'
                m="40px 0 15px 0"
                borderRadius="lg"
                borderWidth="1px"
            >
                <Image width='50px' height='50px' src="https://img.freepik.com/premium-vector/car-pin-location-logo-design_412311-3774.jpg" />
                <Text fontSize="4xl" fontFamily="Work sans">Ikim? IKIM!</Text>
            </Box>
            <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
                <Tabs variant='soft-rounded' colorScheme='green'>
                    <TabList mb='1em'>
                        <Tab width='50%'>Login</Tab>
                        <Tab width='50%'>Sign Up</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login {...{setRefresh}}/>
                        </TabPanel>
                        <TabPanel>
                            <Register/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    )
}

export default Authenticate;