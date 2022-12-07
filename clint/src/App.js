
import "./App.css";
import AllRoutes from "./Routes/AllRoutes";
import Navbar from "./Components/Navbar";
import { Box } from "@chakra-ui/react";

function App() {
  return (
    <Box className="App" w="100%">
      <Navbar />
      <AllRoutes />
    </Box>
  );
}

export default App;