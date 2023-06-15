import React, {useState} from "react";
import Navbar from "../components/NavBar";
import Profile from "../components/List";
import io from 'socket.io-client';

const Home = () => {

    const socket = io('http://localhost:8000', {transports: ['websocket']})
    const [update, setUpdate] = useState(false)
    const [word, setWord] = useState("")

    return (
        <div>
            <Navbar setWord={setWord} word={word}/>
            <Profile word={word} update={update} setUpdate={setUpdate} socket={socket}/>
        </div>
    )
}

export default Home;