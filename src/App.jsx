import React, { useState, useMemo } from "react";
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme, Heading, Grid, GridItem, Box } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Mapp from "./Map";
import Nav from "./Nav";
import UserContext from "./UserContext";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchInterval: 120000,
    }
  }
})

const colors = {
  brand: {
    green: {
      900: "#2ECC71",
      800: "#48C9B0",
      700: "#27AE60"
    },
    blue: {
      900: "#3498DB",
      800: "#1E90FF"
    },
    gray: {
      900: "#555555",
      800: "#EAEAEA"
    },
    yellow: {
      900: "#F39C12"
    }
  }
}

const theme = extendTheme({ colors })

const App = () => {
  const [userLocation, setUserLocation] = useState([]);
  const value = useMemo(
    () => ({ userLocation, setUserLocation }), 
    [userLocation]
  );

  return (
    <UserContext.Provider value={value}>
      <QueryClientProvider client={queryClient}>
        <Grid
            templateAreas={`"header header"
                            "nav main"`}
            gridTemplateRows={'50px 1fr 30px'}
            gridTemplateColumns={'250px 1fr'}
            h='100%'
            gap='0'
            color='blackAlpha.700'
            fontWeight='bold'
          >
            <GridItem pl='2' bg='brand.gray.900' color='white' area={'header'}>
              <Box>
                {/* <Heading>BinSpotter</Heading> */}
                <Heading>Title</Heading>
              </Box>
            </GridItem>
            <GridItem pl='2' bg='brand.gray.800' color='black' area={'nav'}>
              <Nav />
            </GridItem>
            <GridItem pl='0' bg='brand.gray.900' area={'main'}>
              <Mapp />
            </GridItem>
          </Grid>
      </QueryClientProvider>
      
    </UserContext.Provider>
  )
};

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)