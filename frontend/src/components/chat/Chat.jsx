import {useRef, useEffect, useState } from 'react';
import {Box, Grid, Paper, Stack, TextField} from '@mui/material';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Cookies from 'js-cookie';

import ted from "../../testImages/Ted.jpg"
import barney from "../../testImages/Barney.jpeg"
import marshall from "../../testImages/Marshall.jpeg"

function Chat() {
    
    // ********************* Variables & Functions **********************

    // Hard-coded Matches
    const [matches, setMatches] = useState([
        {
            email: 'a@b.com',
            name: 'Ted',
            picture: ted,
            msg: [
                {
                    timeStamp: '2023-07-01',
                    owner: 'a@b.com',
                    text: "Hey, how's it going?",
                },
                {
                    timeStamp: '2023-07-02',
                    owner: 'ydu24@seas.upenn.edu',
                    text: "Not much, how are you?",
                }
            ]
        },
        {
            email: 'a@c.com',
            name: 'Barney',
            picture: barney,
            msg: [],
        },
        {
            email: 'j@k.c',
            name: 'Marshall',
            picture: marshall,
            msg: [],
        },
    ]);

    let [current, setCurrent] = useState(-1);

    let [msgInput, setMsgInput] = useState('');

    const sendMsg = () => {
        if (msgInput.trim() !== '') {
            setMatches((prevMatches) => {
                const updated = [...prevMatches];
                updated[current] = {
                    ...updated[current],
                    msg: [
                        ...updated[current].msg,
                        {
                            timeStamp: new Date().toLocaleString(),
                            owner: Cookies.get('email'),
                            text: msgInput,
                        }
                    ]
                }
                
                console.log(updated);

                return(updated);
            });

            setMsgInput("");
        }
    }

    // ********************* Styling **********************

    const tempStyle = {
        margin: '-30px',
        height: '100% + 30px',
        width: 'calc(100% + 55px)',
    }

    const matchListWrapperStyle = {
        height: '100%',
        padding: '36px',
        paddingLeft: '36px',
        paddingRight: '36px',
        borderRight: '1px solid silver',
    }

    const chatTitleStyle = {
        fontSize: '33px',
        lineHeight: 1.2,
        alightItems: 'center',
        fontWeight: 800,
        color: 'primary.main',
        marginBottom: '26px',
    }

    const matchItemStyle = {
        width: '100%',
        height: '90px',
        cursor: 'pointer',
        borderBottom: '1px solid silver',
    }

    const chatListPicStyle = {
        height: '60px',
        width: '60px',
        margin: '15px',
        marginTop: '16px',
        borderRadius: '50%',
        objectFit: 'cover',
    }

    const chatListNameStyle = {
        marginTop: '16px',
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '6px'
    }

    const chatBoxWrapperStyle = {
        height: '100%',
        // backgroundColor: 'grey',
        display: 'flex',
        flexDirection: 'column',
    }

    const chatBoxTitleStyle = {
        fontSize: '33px',
        alightItems: 'center',
        fontWeight: 'bold',
        marginLeft: '20px',
        marginTop: '22px',
    }

    const messagePaneWrapperStyle = {
        width: '100%',
        flexGrow: 1,
        padding: '30px 30px 0 30px',
    }

    const chatInputWrapperStyle = {
        width: '100%',
        height: '140px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    }

    const messageBoxStyle = {
        padding: '8px 14px 8px 14px',
        fontSize: '18px',
        borderRadius: '10px',
    }

    return (
            <Grid container direction = 'row' sx = {tempStyle}>
                <Grid item xs = {4}>
                    <Box sx = {matchListWrapperStyle}>
                        <Box sx = {chatTitleStyle}>
                                Chats
                        </Box>
                        <Stack>
                            {matches.map((m, i) => (
                                <Box 
                                    sx = {matchItemStyle} 
                                    key = {i} 
                                    borderTop = {i === 0 ? '1px solid silver' : 'none'}
                                    onClick = {() => setCurrent(i)}>
                                    <Stack direction = 'row' height = '100%'>
                                        <Box item xs = {3}>
                                            <img src = {m.picture} style = {chatListPicStyle} alt = 'User'/>
                                        </Box>
                                        <Box item xs = {9}>
                                            <Box sx = {chatListNameStyle}>
                                                {m.name}
                                            </Box>
                                            <Box>
                                                {m.msg.length === 0 ? "Send your first message!" : m.msg[m.msg.length - 1].text}
                                            </Box>
                                        </Box>
                                    </Stack>
                                </Box>
                            ))}
                        </Stack>
                    </Box>
                </Grid>
                <Grid item xs = {8}>
                    <Box sx = {chatBoxWrapperStyle}>
                        <Box width = '100%' height = '90px' borderBottom = '1px solid grey'>
                            <Box sx = {chatBoxTitleStyle}>
                                {current === -1 ? "" : matches[current]['name']}
                            </Box>
                        </Box>
                        <Stack sx = {messagePaneWrapperStyle} spacing = '16px'>
                            { current === -1 ? "" :
                                matches[current]['msg'].map((msg) => (
                                    <Box fullWidth
                                        display = 'flex'                                     
                                        flexDirection = {msg['owner'] === Cookies.get('email') ? 'row-reverse' : 'row'}
                                    >
                                        <Box 
                                            sx = {messageBoxStyle}
                                            backgroundColor = {msg['owner'] === Cookies.get('email') ? 'secondary.main' : '#0000000d'}
                                            color = {msg['owner'] === Cookies.get('email') ? 'white' : 'black'}
                                        >
                                            {msg['text']}
                                        </Box>
                                    </Box>
                                ))
                            }
                        </Stack>
                        <Box sx = {chatInputWrapperStyle} >
                            <Box sx = {{
                                flexGrow: 1,
                                display: 'flex',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                marginLeft: '40px',
                                marginRight: '10px',
                            }}>
                                <TextField 
                                    fullWidth variant = 'outlined' 
                                    placeholder = 'Type your message here'
                                    color = 'secondary'
                                    value = {msgInput}
                                    onChange = {(e) => {
                                        setMsgInput(e.target.value);
                                    }}
                                    onKeyDown = {(e) => {
                                        (e.key === 'Enter') && sendMsg();
                                    }}
                                />
                            </Box>
                            <Box sx = {{
                                width: '60px',
                                height: '100%',
                                marginRight: '20px',
                                display: 'flex',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                paddingBottom: '5px',
                            }}>
                                <ArrowCircleRightIcon 
                                    sx = {{
                                        height: '60px',
                                        fontSize: '52px',
                                        color: 'secondary.main',
                                        cursor: 'pointer',
                                    }}
                                    onClick = {() => sendMsg()}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
    );
}

export default Chat;