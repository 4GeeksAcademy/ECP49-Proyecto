const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      videogames: [],

      genres: [],

      consoles: [],

      favorites: [],
      

    },
    actions: {
      // Use getActions to call a function within a function
      getVideogames: async () => {
        try {
          const url = process.env.BACKEND_URL + "/api/videogames/";
          const options = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          };
          await fetch(url, options)
            .then((res) => res.json())
            .then((data) => {
              // console.log(data);
              setStore({ videogames: data });
            });
        } catch (err) {
          console.error("Error loading list of videogames from backend", err);
        }
      },

      addVideogame: async (addVideogame) => {
        try {
          const url = process.env.BACKEND_URL + "/api/videogames/new";
          const options = {
            method: "POST",
            body: JSON.stringify(addVideogame),
            headers: { "Content-Type": "application/json" },
          };
          await fetch(url, options)
          .then(res => res.json()) 
				  .then(response => {
					console.log('Success: ', JSON.stringify(response));
				  })           
        } catch(error) {console.error("Error to add a videogame from backend", error)}
      },

/////////////////////// START GENRES /////////////////////////

          
      addFavoriteGenre: (typeGenre) => {
				//console.log("add favorite")
        const store = getStore();
        if(store.favorites.includes(typeGenre)) {
          setStore({ favorites: store.favorites.filter((repeated)=> repeated != typeGenre) });
        }else{
          setStore({ favorites: [...store.favorites , typeGenre]});
        }
			},

      getFavGenres: async () => {
        try {const resp = process.env.BACKEND_URL + "/api/genre_fav/";
        const options = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };
        await fetch(resp, options)
        .then((res) => res.json())
            .then((data) => {
              console.log(data);
              setStore({ favorites: data });
            });
        }catch (err){console.error("Error loading list of favorites from backend", err);}
      }, 

      getGenres: async () => {
        try {const resp = process.env.BACKEND_URL + "/api/genres/";
        const options = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };
        await fetch(resp, options)
        .then((res) => res.json())
            .then((data) => {
              console.log(data);
              setStore({ genres: data });
            });
        }catch (err){console.error("Error loading list of videogames from backend", err);}
      },
      
      getSingleGenre: async (genres_id) => {
        try {
          const url = `${process.env.BACKEND_URL}/api/genresList/${genres_id}`;
          const options = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          };
          const response = await fetch(url, options);
          const data = await response.json();
          return data; 
        } catch (error) {
          console.error("Error loading single genre from backend", error);
        }
      },

      addGenres: async(addGenres) => {
        try {
          const url = process.env.BACKEND_URL + "/api/genres/";
          const options = {
            method: 'POST',
            body: JSON.stringify(addGenres),
            headers: { 'Content-Type': 'application/json' } 
          };
          await fetch(url, options)
          .then(res => res.json()) 
				  .then(response => {
					console.log('Success: ', JSON.stringify(response));
				  })
            
        } catch(error) {console.error("Error to add a gender from backend", error)}
      },

      deleteGenre: async (genres_id) => {
        try {
          const url = `${process.env.BACKEND_URL}/api/genresList/${genres_id}`;
          const options = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          };
          await fetch(url, options)
            .then((res) => res.json())
            .then((response) => {
              console.log("Success: ", JSON.stringify(response));
            });
        } catch (error) {
          console.error("Error deleting genre from backend", error);
        }
      },

/////////////////////// END GENRES /////////////////////////

      getConsoles: async () => {
        try {
          const url = process.env.BACKEND_URL + "/api/consoles/";
          const options = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          };
          const response = await fetch(url, options);
          const data = await response.json();
          setStore({ consoles: data });
        } catch (error) {
          console.error("Error loading list of consoles from backend", error);
        }
      },

      addConsole: async (newConsole) => {
        try {
          const url = process.env.BACKEND_URL + "/api/consoles";
          const options = {
            method: "POST",
            body: JSON.stringify(newConsole),
            headers: { "Content-Type": "application/json" },
          };
          await fetch(url, options)
            .then((res) => res.json())
            .then((response) => {
              console.log("Success: ", JSON.stringify(response));
            });
        } catch (error) {
          console.error("Error to add a console from backend", error);
        }
      },

      deleteConsole: async (console_id) => {
        try {
          const url = `${process.env.BACKEND_URL}/api/consoles/${console_id}`;
          const options = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          };
          await fetch(url, options)
            .then((res) => res.json())
            .then((response) => {
              console.log("Success: ", JSON.stringify(response));
            });
        } catch (error) {
          console.error("Error deleting genre from backend", error);
        }
      },

      

      getSingleConsole: async (consoleId) => {
        try {
          const url = `${process.env.BACKEND_URL}/api/consoles/${consoleId}`;
          const options = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          };
          const response = await fetch(url, options);
          const data = await response.json();
          return data; 
        } catch (error) {
          console.error("Error loading single console from backend", error);
        }
      },

      updateConsole: async (consoleId, updatedConsoleData) => {
        try {
          const url = `${process.env.BACKEND_URL}/api/consoles/${consoleId}`;
          const options = {
            method: "PUT",
            body: JSON.stringify(updatedConsoleData),
            headers: { "Content-Type": "application/json" },
          };
          await fetch(url, options)
            .then((res) => res.json())
            .then((response) => {
              console.log("Success: ", JSON.stringify(response));
            });
        } catch (error) {
          console.error("Error updating console from backend", error);
        }
      },
    },
  };
};

export default getState;
