// import AppReducer from './AppReducer'
// import { createContext, useReducer } from 'react'
// import axios from 'axios';


// const initialState = {
//     name: "",
//     username: "",
//     password: ""
// }
// export const GlobalProvider = ({ children }) => {
//     const [state, dispatch] = useReducer(AppReducer, initialState);
//     const getUser = async () => {
//         const response = await axios.get("URL"); // Cambiar esto
//         dispatch({
//             type: "GET_USER",
//             payload: response.data //YA VEREMOS COMO VA ESTO
//         })
//     }

//     return (
//         <GlobalContext.Provider
//             value={{
//                 users: state.users,
//                 getUser
//             }}
//         >{children}
//         </GlobalContext.Provider>
//     )
// }

// export const GlobalContext = createContext(initialState);