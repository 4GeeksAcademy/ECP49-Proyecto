const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      videogames: [],
      genres: [],
    },
    actions: {
      // Use getActions to call a function within a function
      getVideogames: async () => {
        try{
        const url = process.env.BACKEND_URL + "/api/videogames/";
        const options = {
				  method: 'GET',
				  headers: { 'Content-Type': 'application/json' } 
				};
        await fetch(url, options)
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);
            setStore({ videogames: data });
          })
         } catch(err) {console.error("Error loading list of videogames from backend", err)};
        },

      addVideogame: async(addVideogame) => {
        try {
          const url = process.env.BACKEND_URL + "/api/videogames/new";
          const options = {
            method: 'POST',
            body: JSON.stringify(addVideogame),
            headers: { 'Content-Type': 'application/json' } 
          };
          await fetch(url, options)
          .then(res => res.json()) 
				  .then(response => {
					console.log('Success: ', JSON.stringify(response));
				  })
            // .then((res) => res.json())
            // .then((data) => {
            //   // console.log(data);
            //   setStore({ videogames: data });
            // })
        } catch(error) {console.error("Error to add a videogame from backend", error)}
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

      deleteGenre: async (genre_id) => {
        try {
          const url = `${process.env.BACKEND_URL}/api/genresList/${genre_id}`;
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



        //  getMessage: async () => {
        // 	try{
        // 		// fetching data from the backend
        // 		const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
        // 		const data = await resp.json()
        // 		setStore({ message: data.message })
        // 		// don't forget to return something, that is how the async resolves
        // 		return data;
        // 	}catch(error){
        // 		console.log("Error loading message from backend", error)
        // 	}
        // },



      // exampleFunction: () => {
      // 	getActions().changeColor(0, "green");
      // },

      // getMessage: async () => {
      // 	try{
      // 		// fetching data from the backend
      // 		const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
      // 		const data = await resp.json()
      // 		setStore({ message: data.message })
      // 		// don't forget to return something, that is how the async resolves
      // 		return data;
      // 	}catch(error){
      // 		console.log("Error loading message from backend", error)
      // 	}
      // },
      // changeColor: (index, color) => {
      // 	//get the store
      // 	const store = getStore();

      // 	//we have to loop the entire demo array to look for the respective index
      // 	//and change its color
      // 	const demo = store.demo.map((elm, i) => {
      // 		if (i === index) elm.background = color;
      // 		return elm;
      // 	});

      // 	//reset the global store
      // 	setStore({ demo: demo });
      // }
    },
  };
};

export default getState;
