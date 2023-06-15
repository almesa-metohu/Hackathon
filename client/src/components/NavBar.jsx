import { Box, Flex, Link, Spacer, Input, IconButton, Image, Menu, MenuButton, MenuList, MenuItem, Button, } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import React, {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom'
import axios from 'axios'


function Navbar(props) {

    const navigate = useNavigate()
    const {word, setWord} = props
    const [words, setWords2] = useState()
    const [role, setRole] = useState("")

    const userId =localStorage.getItem('userId')

    useEffect(()=> {
        axios.get('http://localhost:8000/api/user/'+userId)
            .then(res => {setRole(res.data.role)})
            .catch(err => console.log(err))
    }, [])

    const logOut = () => {
        console.log('logging out')
        axios.post('http://localhost:8000/api/logout', {}, {withCredentials: 'same-origin'})
            .then(e => {
                localStorage.removeItem('userId');
                navigate('/auth')
            })
    }
    const getWord = () => {
        setWord(words)
    }

    return (
        <Box>
            <Box py={4} px={8}>
                <Flex alignItems="center">
                    <Image width='70px' src="https://img.freepik.com/premium-vector/car-pin-location-logo-design_412311-3774.jpg" />
                    <Link href="/home" fontSize="xl" fontWeight="bold">
                        Ikim? IKIM!
                    </Link>
                    <Spacer />
                    <Box>
                        {role === "driver" ? <Link href="/add-a-ride" mr={4}>
                            Add a ride
                        </Link> : <Link href="/be-a-driver" mr={4}>
                            Be a driver
                        </Link>}
                    </Box>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Menu>
                        <MenuButton >
                            <Box width='50px' height='50px'>
                                <Image borderRadius="full" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAB5CAMAAAAqJH57AAAAYFBMVEUiLTqzusC3vsQSIC8bJzW6wccdKTYWIzIfKjgAFCZDTFaepawtN0Okq7I9RlEPHi6ss7o3QEtQWGKMk5qUm6JdZW6AiI8JGit5gIhwd39JUVtmbncAECSGjpVYYGknMj/ZEiYSAAADlElEQVRoge2aa5OrIAyG5SaoRbDitdv2///Lo3a727OnImhwZ874djo7++lpQgghIYoOHTp06NChQ4e2S4h4+IidqZTw6FTkaV6cIk7oXljBRdoaifAoJE2bCh7vwI2botZsQD6FMdN10QRnN4Vh39QvOisLFZRL6fUN92F5ywOut0rle+7EznIeDFyhefCA1mcSCHyxcUc0ugVB8zOzgwexPsBa02LB4odO8EmNW4LrxeESfHOpdtnXk79b4KWmuZOvR+Ww2YwYVzIuQf0tUleLoY1WtbOzEatBjdYeNkvAJErP7iYP6uHcTVofMu7gjE4yL7JJwMgfPsuMkP6AAou7FxghKHAUuyewSRhsR4vek5xCHVje5POv2Qy2ob3XGczbUeQFhixMEk8y3JHhmcMkWCaJ1NWLXDZgZFp5kS9wpa8oPMCwRYnyWGgsIatP0rnVvKNYC1kNebkbtuxV5S9VvRFNncmAVdgk11IfG+iLrCjcYgwX4JdJ4nSlA7/QjXK5xsLu5adih6s7LoL0h8hi9sZVoKZY09nRuIM7pH4osSZRFg48WF3hObMxrgKChwBP5XuzmQzXAXyIivqN2ZjVcfgut0rNjyYkRqYP2+n9FCX9VY999Wl1MdLXdLe2ftxEfWcyqWVWdn2s9ujof8N5kzTN8N1lkHDo0E4SlE/6/LNPeMdcJSSv2ro0xmTDt6zbKleJIjTgiFLw5H5uDWKM4VcN/+usvt0TEsR4oZK+zTCbOSbHXyDbPiHQlnOVthrPHs5fdN2mBPC0FCSqMuuQ7PXcyqq7AjKc3Ds5M418y2ayu0MUv5R22v0K+xDTHd16borm7M19sG/bzk5yMmu4EzvbMpFOLgvRbBPG3doOO43LtQZ/mm3EqtXmhdMk0mr2qlKY93oreN0wnNwcU8eSKk80ucFwB7NvXiHOPXvpNjEfhzvO1x2Fc+cIjwVAcL2QkfO7JvdhsyPaOO4tftmWQP4V65yWmubA3FFOS82BfT0KZw5kXkH7ehSrlpc6lgHACOllk5ceB60UXgwyt6cyK6QX3O03pfERruxB5jcT8yJn1golPoUCD+iTrSTkC53NTWTrk4smmLNHd9u6kzxEFnmKWWymDg/uNpDP89Ht91bGV7ieTyYhDosXcjbvbhomZz+l570dBwUjfJ8Di4B5ZCLPzkpFHjK0be9QaRqYPLutwm7ngXz7NfLsQfkfk//y9h8XIzIBrrotgwAAAABJRU5ErkJggg==" alt="Image Description" w="100%" h="100%" objectFit="cover" />
                            </Box>
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={() => navigate("/edit-profile/")}>Edit Profile</MenuItem>
                            <MenuItem onClick={() => navigate("/recent-drives")}>Recent Rides</MenuItem>
                            <MenuItem onClick={logOut}><Button size='sm' colorScheme="red">Log out</Button></MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Box>
            <Box p={5} display='flex'>
                <Input placeholder="Search..."
                onChange={e=>setWord(e.target.value)}/>
                <IconButton
                    icon={<SearchIcon />}
                    aria-label="Search"
                    ml={2}
                    colorScheme="teal"
                    onClick={getWord}
                />
            </Box>
        </Box>
    );
}

export default Navbar;
