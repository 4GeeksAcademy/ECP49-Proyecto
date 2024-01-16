const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      videogames: [],
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
      }

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
