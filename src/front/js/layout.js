import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

import { Login } from "./pages/user/login";
import  Signup  from "./pages/user/signup";
import Private from "./pages/user/private"
import { VideogamesList } from "./pages/videogames/videogameList";
import { Videogame } from "./pages/videogames/videogame";
import { EditVideogame } from "./pages/videogames/editVideogame";
import { ConsoleList } from "./pages/consoles/consoleList";
import { Console } from "./pages/consoles/console";
import { FormConsole } from "./pages/consoles/formConsole";

import { Genres_list } from "./genres/genresList";
import { Genres } from "./genres/genres";
import { FormGenres } from "./genres/formGenres";
import { FormEditGenres } from "./genres/formEditGenres";
import { Genres_favorites } from "./genres/viewFavGenres";

import GenreEdit from "./genres/genreEdit";




import AdminForm from "./pages/administrador/adminForm";
import ConsoleEdit from "./pages/consoles/consoleEdit";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />

                        {/* <Route element={<Demo />} path="/demo" />
                        // <Route element={<Single />} path="/single/:theid" /> */}
                        <Route element={<VideogamesList />} path="/videogames" />
                        <Route element={<Genres_list />} path="/genresList" />
                        <Route element={<Genres />} path="/genres/:theid" />
                        <Route element={<Genres_favorites />} path="/viewFavGenres" />
                        <Route element={<FormGenres />} path="formGenres/" />
                        <Route element={<FormEditGenres />} path="formEditGenres" />
                        <Route element={<Videogame />} path="/videogames/:theid/" />
                        <Route element={<EditVideogame />} path="/editVideogame/:theid/" />

                        <Route element={<ConsoleList />} path="/consoles" />
                        <Route element={<Console />} path="/consoles/:theid/" />
                        <Route element={<FormConsole />} path="consoles/add" />


                        <Route element={<Signup />} path="/signup" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Private />} path="/private" />


                        <Route element={<h1>Not found!</h1>} />


                        <Route element={<ConsoleList />} path="/consoles" />
                        <Route element={<ConsoleEdit />} path="/consoles/edit/:theid"  />
                        <Route element={<GenreEdit />} path="/genres/edit/:theid"  />
                          
                        <Route element={<AdminForm />} path="/adminform" />

                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
