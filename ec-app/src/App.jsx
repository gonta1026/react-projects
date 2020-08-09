import React from "react";
import Router from "./Router";
import "../src/assets/reset.css";
import "../src/assets/style.css";
import { Header } from "./components/Header";

const App = () => {
    return (
        <>
            <Header />
            <main className="c-main">
                <Router />
            </main>
        </>
    );
};

export default App;
