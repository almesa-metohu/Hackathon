import {
    Box,
    Flex,
    Link,
    Spacer,
    Input,
    IconButton,
    Image,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar(props) {
    const navigate = useNavigate();
    const { word, setWord } = props;
    const [words, setWords2] = useState();
    const [role, setRole] = useState("");

    const userId = localStorage.getItem("userId");

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/user/" + userId)
            .then((res) => {
                setRole(res.data.role);
            })
            .catch((err) => console.log(err));
    }, []);

    const logOut = () => {
        console.log("logging out");
        axios
            .post("http://localhost:8000/api/logout", {}, { withCredentials: true })
            .then((e) => {
                localStorage.removeItem("userId");
                navigate("/auth");
            });
    };
    const getWord = () => {
        setWord(words);
    };

    return (
        <Box bg="teal.500" color="white">
            <Flex alignItems="center" p={4}>
                <Image
                    width="70px"
                    src="https://i.ibb.co/VYkWSRg/images-removebg-preview-1.png"
                />
                <Link href="/home" fontSize="xl" fontWeight="bold" ml={4}>
                    Ikim? IKIM!
                </Link>
                <Spacer />
                <Box>
                    {role === "driver" ? (
                        <Link href="/add-a-ride" mr={4}>
                            Add a ride
                        </Link>
                    ) : (
                        <Link href="/be-a-driver" mr={4}>
                            Be a driver
                        </Link>
                    )}
                </Box>
                <Menu>
                    <MenuButton as={Button} rightIcon={<span>&#9660;</span>}>
                        My Account
                    </MenuButton>
                    <MenuList>
                        <MenuItem color='black' onClick={() => navigate("/edit-profile/")}>
                            Edit Profile
                        </MenuItem>
                        <MenuItem color='black' onClick={() => navigate("/recent-drives")}>
                            Recent Rides
                        </MenuItem>
                        <MenuItem color='red' onClick={logOut}>Log out</MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
            <Box p={2} display="flex" bg="teal.600">
                <Input
                    placeholder="Search..."
                    onChange={(e) => setWord(e.target.value)}
                    bg="white"
                    ml={4}
                    p={2}
                    borderRadius="md"
                    width="300px"
                    color='black'
                />
                <IconButton
                    icon={<SearchIcon />}
                    aria-label="Search"
                    ml={2}
                    colorScheme="whiteAlpha"
                    onClick={getWord}
                />
            </Box>
        </Box>
    );
}

export default Navbar;
