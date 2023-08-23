import { Box, Heading, Button, Stack } from '@chakra-ui/react';
import React, { useState, useContext } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';
import UserContext from './UserContext';
import Modal from './Modal';

const Nav = () => {
    const { userLocation, setUserLocation } = useContext(UserContext);
    const [location, setLocation] = useState(null);
    const [showModal, setShowModal] = useState(false);

    function handleLocationClick() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(success, error);
        } else {
          console.log("Geolocation not supported");
        }
    }

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLocation({ latitude, longitude });
        setUserLocation([ latitude, longitude ]);
    }

    function error() {
        console.log("Unable to retrieve your location");
    }

    function handleResetClick() {
        setLocation({});
        setUserLocation([]);
    }

    const addBin = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const bin = {
            name: formData.get("name") ?? "",
            lat: +formData.get("lat") ?? "",
            long: +formData.get("long") ?? "",
        };

        console.log(bin);

        try {
            const docRef = await addDoc(collection(db, "bins"), bin);
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        
    }
    
    return (
        <div>
            <Box>
                <Heading pb='4' size='xl'>Nav</Heading>
                <Stack spacing={4} direction='column' align='left'>
                    <Button onClick={ handleLocationClick } colorScheme='green' size='md' variant='link' justifyContent="flex-start">
                        Get My Location
                    </Button>
                    <Button onClick={ handleResetClick } colorScheme='green' size='md' variant='link' justifyContent="flex-start">
                        Reset View
                    </Button>
                    <Button onClick={ () => setShowModal(true) } colorScheme='green' size='md' variant='link' justifyContent="flex-start">
                        Add a Bin
                    </Button>
                </Stack>
            </Box>
            {
                showModal ? 
                (
                    <Modal>
                        <div>
                            <h1>Add a bin</h1>
                            <form onSubmit={addBin}>
                                <label htmlFor="name">
                                    Name
                                    <input
                                    id="name" 
                                    name="name"
                                    placeholder="Name" />
                                </label>

                                <label htmlFor="lat">
                                    Latitude
                                    <input
                                    id="lat" 
                                    name="lat"
                                    placeholder="Latitude" />
                                </label>

                                <label htmlFor="long">
                                    Longitude
                                    <input
                                    id="long" 
                                    name="long"
                                    placeholder="Longitude" />
                                </label>
                                
                                <div className="buttons">
                                    <button>Submit</button>
                                    <button onClick={() => setShowModal(false) }>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </Modal>
                ) : null
            }
        </div>
    )
}

export default Nav;