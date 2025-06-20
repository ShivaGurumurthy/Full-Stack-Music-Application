import { doc, onSnapshot } from "firebase/firestore"
import { createContext, useContext, useEffect, useState } from "react"
import { AuthContextAPI } from "./AuthContext"
import { __DB } from "../Backend/FirebaseConfig"

export let UserContextAPI = createContext()

let UserProvider = (props)=>{
    let [userProfile, setUserProfile] = useState(null)
    let [isLoading,setIsLoading]=useState(true)
    let {authUser} = useContext(AuthContextAPI)
    // console.log(authUser);
    

    useEffect(()=>{
        let fetchProfile = ()=>{
          let user_collection =  doc(__DB, "user-profile", authUser?.uid)
          
            //Used to snap of the complete data from the DB!
            onSnapshot(user_collection, (data)=>{
                // console.log(data);
            //    console.log(data.data());
               setUserProfile(data.data())
               
                
            })
        }
        if(authUser){
            fetchProfile()
        }
        setIsLoading(false)

    },[authUser])

    return <UserContextAPI.Provider value={{userProfile, setUserProfile,isLoading}}>
        {props.children}
    </UserContextAPI.Provider>
}
export default UserProvider