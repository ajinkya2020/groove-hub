import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Outlet } from "react-router-dom";
import "./App.scss";
import Header from "./components/header/Header";

function App() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <Header />
      <div className="mt-12">
        <Outlet />
      </div>
    </MantineProvider>
  );
}

export default App;
