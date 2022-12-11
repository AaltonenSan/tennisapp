
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from "react";
import AllPlayers from "./components/AllPlayers/AllPlayers";
import TournamentList from "./components/Tournaments/TournamentList";
import TabsMUI from "./components/common/TabsMUI";
import Homepage from "./components/Homepage/Homepage";
import PlayerList from "./components/Favorites/PlayerList";
import LoginPage from "./components/Login/LoginPage";

const theme = createTheme({
  palette: {
    primary: { main: "#377DB8", contrastText: '#FFFFFF' },
    secondary: { main: "#E8F7FF", contrastText: '#FFFFFF' },
    background: { default: "#1E8FD5" }
    },
    typography: {
      fontFamily: 'Roboto',
      color: "#FFFFFF",
  }
  });

function App() {
  /*
    User login status is first checked in sessionStorage.
    If user was logged in and refreshed the site, the login status is still true
  */
  const [logged, setLogged] = useState(sessionStorage.getItem('logged'));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TabsMUI logged={logged} setLogged={setLogged} /> }>
            <Route index element={<Homepage />} />
            <Route path="favorites" element={<PlayerList />} />
            <Route path="players" element={<AllPlayers />} />
            <Route path="tournaments" element={<TournamentList />} />
            <Route path="login" element={<LoginPage setLogged={setLogged} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
