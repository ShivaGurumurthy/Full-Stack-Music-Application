import { collection, getDocs } from "firebase/firestore"
import { createContext, useEffect, useState } from "react"
import { __DB } from "../Backend/FirebaseConfig"
import Spinner from "../Helper Components/Spinner"

export const AlbumContextAPI = createContext()

let AlbumProvider = (props)=>{
    let [albums, setAlbums] = useState([])
    let [isLoading, setIsLoading] = useState(false)

    //!STATES FROM INSTRUCTOR, FROM NPM'S REACT-PRO-AUDIO-PLAYER LIBRARY, DO NOT TOUCH!
    const [songs, setSongs] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSongIndex, setCurrentSongIndex] = useState(null);


    useEffect(()=>{
        let fetchAlbums = async ()=>{
            try{
                setIsLoading(true)
              let album_collection = collection(__DB, "album_collection")
              let albumSnapshot = await getDocs(album_collection)
              let albumList =  albumSnapshot.docs.map(doc=>doc.data())
              console.log(albumList);
              setAlbums(albumList)
              
            }
            catch(error){
                console.log(error);
                
            }
            finally{
                setIsLoading(false)
            }
        }
        fetchAlbums()
    },[])

    return <AlbumContextAPI.Provider value={{ albums, isLoading, songs, setSongs, isPlaying, setIsPlaying, currentSongIndex, setCurrentSongIndex }}>
        {props.children}
    </AlbumContextAPI.Provider>
}

export default AlbumProvider