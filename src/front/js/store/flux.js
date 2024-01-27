const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      videogames: [],
      genres: [],
      consoles: [],
      favorites: [],

      user: [null],
      token: null,

      auth: false,

      
    },
    actions: {



      updateGenre: async (genreId, updatedGenreData) => {
        try {
          const url = `${process.env.BACKEND_URL}/api/genres/${genreId}`;
          const options = {
            method: "PUT",
            body: JSON.stringify(updatedGenreData),
            headers: { "Content-Type": "application/json" },
          };
          await fetch(url, options)
            .then((res) => res.json())
            .then((response) => {
              console.log("Success: ", JSON.stringify(response));
            });
        } catch (error) {
          console.error("Error updating genre from backend", error);
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
      
      toggleFavoriteConsole: async (console_id) => {
        try {
          const url = `${process.env.BACKEND_URL}/api/consoles_fav`;
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${getStore().token}`,
            },
            body: JSON.stringify({ console_id }),
          };
          await fetch(url, options)
            .then((res) => res.json())
            .then((response) => {
              console.log("Success: ", JSON.stringify(response));
            });
        } catch (error) {
          console.error("Error toggling console favorite", error);
        }
      },

      loginadmin: (email, password) => {

        const requestOptions = {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            "email": email,
            "password": password
          })
        };

        fetch(process.env.BACKEND_URL + "/api/loginadministrador", requestOptions)
          .then(response => {

            if (response.status == 200) {
              setStore({ auth: true });
            }
            return response.json()
          })

          .then(data => {
            localStorage.setItem("token", data.access_token);
            console.log(data);
          })
          .catch(error => console.log('error', error));
      },

      logoutadmin: () => {
				setStore({ auth: false});
				localStorage.removeItem("token");
				
			},

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
        } catch (error) { console.error("Error to add a videogame from backend", error) }
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
        try {
          const resp = process.env.BACKEND_URL + "/api/genre_fav/";
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
        } catch (err) { console.error("Error loading list of favorites from backend", err); }
      },

      getGenres: async () => {
        try {
          const resp = process.env.BACKEND_URL + "/api/genres/";
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
        } catch (err) { console.error("Error loading list of videogames from backend", err); }
      },

      
      getSingleGenre: async (genreId) => {

        try {
          const url = `${process.env.BACKEND_URL}/api/genres/${genreId}`;
          const options = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          };
          const response = await fetch(url, options);
          const data = await response.json();
          return data;
        } catch (error) {
          console.error("Error getting single genre from backend", error);
        }
      },

      addGenres: async (addGenres) => {
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

        } catch (error) { console.error("Error to add a gender from backend", error) }
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

      deleteVideogame: async (videogame_id) => {

      try {
        const url = `${process.env.BACKEND_URL}/api/videogames/${videogame_id}`;
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
        console.error("Error deleting videogame from backend", error);
      }
    },
      

    getSingleVideogame: async (videogameId) => {
      try {
        const url = `${process.env.BACKEND_URL}/api/videogames/${videogameId}`;
        const options = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error loading single videogame from backend", error);
      }
    },
    
    updateVideogame: async (videogameId, updatedVideogameData) => {
      try {
        const url = `${process.env.BACKEND_URL}/api/videogames/${videogameId}`;
        const options = {
          method: "PUT",
          body: JSON.stringify(updatedVideogameData),
          headers: { "Content-Type": "application/json" },
        };
        await fetch(url, options)
          .then((res) => res.json())
          .then((response) => {
            console.log("Success: ", JSON.stringify(response));
          });
      } catch (error) {
        console.error("Error updating videogame from backend", error);
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

      //USER
      signUp: async (form, navigate) => {
        const url = process.env.BACKEND_URL + "/api/signup";
        await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*"
          },
          body: JSON.stringify({
            "email": form.email,
            "password": form.password,
            "is_active": true
          })
        })
          .then(async resp => {
            console.log(resp.ok); 
            console.log(resp.status); 
            if (!resp.ok) {
              alert("user already exists");
              console.log(resp.status);
              return false;

            }
            await resp.json(); 
            navigate('/login');
          })
          .catch(error => {
            //error handling
            console.log(error);
          })
      },
      login: (form, navigate) => {
        const store = getStore();
        const url = process.env.BACKEND_URL + "/api/login"
        fetch(url, {
          method: "Post",
          headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({
            "email": form.email,
            "password": form.password
          })
        })
          .then(async resp => {
            console.log(resp.ok); 
            console.log(resp.status); 
            if (!resp.ok) {
              alert("wrong username or password");
              return false;
            }
            
            const data = await resp.json();
            sessionStorage.setItem("token", data.token);
            setStore({ token: data.token });

            console.log(store.token);
            navigate('/private');
          })
          .catch(error => {
            
            console.log(error);
          })
      },
      authenticateUser: (navigate) => {
        const store = getStore();
        console.log(store.token);
        const url = process.env.BACKEND_URL + "/api/private"
        fetch(url, {
          method: "GET",
          headers: {
            "Authorization": "Bearer " + store.token,
            'Access-Control-Allow-Origin': '*'
          }
        })
          .then(resp => {
            console.log(resp.ok); 
            console.log(resp.status); 
            if (!resp.ok) {
              navigate("/login");
              alert("Please login to continue");

            }

            
            return resp.json();
          })
          .then(data => {
            setStore({ user: data });

          })
          .catch(error => {
            //error handling
            console.log(error);
          })
      },
      tokenFromStore: () => {
        let store = getStore();
        const token = sessionStorage.getItem("token");
        if (token && token != null && token != undefined) setStore({ token: token });
      },
      logout: (navigate) => {
        setStore({ user: null });
        sessionStorage.removeItem("token");
        setStore({ token: null });
        navigate("/");
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
    fecthRawg: async () => {
      try {
        const resp = await fetch("https://api.rawg.io/api/games/")
        const data = await resp.json()
        setStore({ raw: data.raw })
        return data;
      } catch (error) {
        console.log("Error loading message from backend", error)
      }
    },

  };
};

export default getState;