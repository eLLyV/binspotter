import { Box, Heading } from "@chakra-ui/react";
import React from "react";

const Bin = (props) => {
    return (
        <Box>
            <Heading as='h1' size='xl'>{props.name}</Heading>
            <Heading size='lg'>{props.long}</Heading>
            <Heading size='lg'>{props.lat}</Heading>
        </Box>
    )
}

export default Bin;