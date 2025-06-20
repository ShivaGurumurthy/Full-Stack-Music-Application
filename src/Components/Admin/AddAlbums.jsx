import React, { useState } from 'react'
import toast from 'react-hot-toast'
import Spinner from '../../Helper Components/Spinner'
import { doc, setDoc } from 'firebase/firestore'
import { __DB } from '../../Backend/FirebaseConfig'

const AddAlbums = () => {
  let [isLoading, setIsLoading] = useState(false)
  let [album, setAlbum] = useState({
    albumTitle: "",
    albumPoster: null,
    albumReleaseDate: "",
    albumLanguages: "",
    albumDescription: ""
  })

  // let [data, setData] = useState({
  //   albumTitle: 
  // })

  let {albumTitle, albumPoster, albumReleaseDate, albumLanguages, albumDescription} = album

  let handleAlbumChange = (e)=>{
    let value = e.target.value
    let key = e.target.name
    setAlbum ({...album, [key]:value})
  }
  
  let handlePosterChange = (e)=>{
    let file = e.target.files[0]
    setAlbum({...album, albumPoster:file})
  }
  
  
  let initialSongData = {
    songName: "",
    songFile: null,
    songThumbnail: null,
    songSingers:"",
    songMood:"",
    songDirector:""
    
  }
  
  let [songs, setSongs] = useState([initialSongData])
  
  let addSongs = ()=>{
    setSongs ([...songs, {...initialSongData}])
  }
  
  let removeSongs = (ind)=>{
    let newSongs = songs.filter((value, index)=> index !== ind)
    setSongs(newSongs)
  }
  

  let handleSongChange = (e, index)=>{
    let value = e.target.value
    let key = e.target.name
    let copy = [...songs]
    copy[index][key] = value
    setSongs(copy)
  }

  let handleSongFileChange = (e, index)=>{
    let file = e.target.files[0]
    let key = e.target.name
    let copy = [...songs]
    copy[index][key] = file
    setSongs(copy)
  }

  

  let handleSubmit = async (e) =>{
    e.preventDefault()
    // console.log(album);

    try{
      setIsLoading(true)
      let albumPosterData = new FormData()
      albumPosterData.append("file", albumPoster)
      albumPosterData.append("upload_preset", "Innovators Hub Music")

      let posterResponse = await fetch("https://api.cloudinary.com/v1_1/dz4q4vx88/image/upload",{
        method:"POST",
        body:albumPosterData
      })

      let posterResult = await posterResponse.json()
      console.log(posterResult);
      let albumID = posterResult.asset_id
      let albumPosterURL = posterResult.url
      console.log(posterResult);
      


      let albumData = {
        albumID : albumID,
        albumTitle: albumTitle,
        albumPoster: albumPosterURL,
        albumReleaseDate: albumReleaseDate,
        albumLanguages: albumLanguages,
        albumDescription: albumDescription
      }
      
      console.log(albumData)
      
      let songData = []

      await Promise.all(
        songs.map(async (value, index)=>{
          let songThumbnailData = new FormData()
          
          songThumbnailData.append("file", value.songPoster)
          songThumbnailData.append("upload_preset", "Innovators Hub Music")
          
          let songThumbnailRequest = await fetch("https://api.cloudinary.com/v1_1/dz4q4vx88/image/upload",{
            method:"POST",
            body: songThumbnailData,
          })
    
          let songThumbnailResponse = await songThumbnailRequest.json()
    
          let songThumbnailURL = songThumbnailResponse.url
          
          let songFileData = new FormData()
          songFileData.append("file", value.songFile)
          songFileData.append("upload_preset", "Innovators Hub Music")
    
          let songFileRequest = await fetch("https://api.cloudinary.com/v1_1/dz4q4vx88/upload",{
            method:"POST",
            body: songFileData,
          })
    
          let songFileResponse = await songFileRequest.json()
    
    
          let songFileURL = songFileResponse.url
          let songFileFormat = songFileResponse.format
          let songFileBytes = songFileResponse.bytes 
          let songFileID = songFileResponse.asset_id
          let songFileDuration = songFileResponse.duration
          
          let songPayload = {
            songID: songFileID,
            songName: value.songName,
            songURL: songFileURL,
            songThumbnail: songThumbnailURL,
            songFormat: songFileFormat,
            songBytes: songFileBytes,
            songDuration: songFileDuration,
            songSingers: value.songSingers,
            songMood: value.songMood,
            songDirector: value.songDirector
    
          }
          songData.push(songPayload)
        })
      )

    let completePayload = {...albumData, songs:songData}
    console.log(completePayload)

    let album_collection = doc(__DB, "album_collection", albumData.albumID)
    await setDoc(album_collection, completePayload)

    }
    catch(error){
      console.log(error)
      // toast.error(error.message)
    }
    finally{
      setIsLoading(false)
    }
  }
  return (
    <section className='h-[100%] w-[100%] bg-sky-700 flex p-12 justify-center'>
      <article className='min-h-[900px] w-[80%] bg-slate-700 rounded-2xl p-7 flex flex-col gap-10'>
        <h2 className='text-center text-3xl'>Add Albums!</h2>
        <form action="" onSubmit={handleSubmit}>
          <h3 className='text-3xl'>Album Details</h3>
          <article className='mt-5 flex flex-wrap gap-8'>
            <div className='flex flex-col gap-4 w-[48%]'>
              <label htmlFor="albumtitle">
                Album Title
              </label>
              <input type="text" id='albumtitle' placeholder='Enter album title' value={albumTitle} name="albumTitle" onChange={handleAlbumChange} className='outline-none bg-white py-3 px-4 rounded-xl text-black '/>
            </div>
            <div className='flex flex-col gap-4 w-[48%]'>
              <label htmlFor="albumposter" className=''>
                Album Poster
              </label>
              <input type="file" id='albumposter' name="albumPoster" onChange={handlePosterChange} className='outline-none bg-white py-3 px-4 rounded-xl text-black file:bg-slate-600 file:text-white file:px-2 file:rounded-lg'/>
            </div>
            <div className='flex flex-col gap-4 w-[48%]'>
              <label htmlFor="release">
                Release Date
              </label>
              <input type="date" id='release' placeholder='Enter album title' value={albumReleaseDate} onChange={handleAlbumChange} name="albumReleaseDate" className='outline-none bg-white py-3 px-4 rounded-xl text-black'/>
            </div>
            <div className='flex flex-col gap-4 w-[48%]'>
              <label htmlFor="lang">
              Languages
              </label>
              <input type="text" id='lang' placeholder='Enter languages' value={albumLanguages} onChange={handleAlbumChange} name='albumLanguages' className='outline-none bg-white py-3 px-4 rounded-xl text-black'/>
            </div>
            <div className='flex flex-col gap-4 w-[98%]'>
              <label htmlFor="albumdesc">
                Album Description
              </label>
              <textarea id='albumdesc' placeholder='Enter album description' value={albumDescription} onChange={handleAlbumChange} name='albumDescription' className='outline-none bg-white py-3 px-4 rounded-xl text-black'/>
            </div>
          </article>
          <h3 className='text-center text-3xl mt-10'>Song Details</h3>
          <article className='mt-5 flex flex-col gap-7'>
             {songs.map((value, index)=>{
                return(
                  <section className='bg-slate-600 rounded-lg p-6' key={index}>
                    <h4 className='text-xl text-center'>Song {index+1}</h4>
                    <main className='flex flex-wrap gap-6'>
                    <div className='flex flex-col gap-4 w-[32%]'>
                      <label htmlFor="songname">
                        Song Name
                      </label>
                      <input type="text" id='songname' name="songName" value={value.songName} onChange={(e)=>handleSongChange(e,index)} placeholder='Enter song title' className='outline-none bg-white py-3 px-4 rounded-xl text-black '/>
                    </div>
                    <div className='flex flex-col gap-4 w-[32%]'>
                      <label htmlFor="songfile">
                        Song File
                      </label>
                      <input type="file" id='songfile' name="songFile" onChange={(e)=>handleSongFileChange(e,index)} className='outline-none bg-white py-3 px-4 rounded-xl text-black  file:bg-slate-600 file:text-white file:px-2 file:rounded-lg '/>
                    </div>
                    <div className='flex flex-col gap-4 w-[32%]'>
                      <label htmlFor="songposter">
                        Song Poster
                      </label>
                      <input type="file" id='songposter' name="songPoster" onChange={(e)=>handleSongFileChange(e,index)} className='outline-none bg-white py-3 px-4 rounded-xl text-black  file:bg-slate-600 file:text-white file:px-2 file:rounded-lg'/>
                    </div>
                    <div className='flex flex-col gap-4 w-[32%]'>
                      <label htmlFor="singers">
                        Singers
                      </label>
                      <input type="text" id='singers' name='songSingers' value={value.songSingers} onChange={(e)=>handleSongChange(e,index)} placeholder='Enter singers name' className='outline-none bg-white py-3 px-4 rounded-xl text-black '/>
                    </div>
                    <div className='flex flex-col gap-4 w-[32%]'>
                      <label htmlFor="mood">
                        Mood
                      </label>
                      <input type="text" id='mood' name='songMood' value={value.songMood} onChange={(e)=>handleSongChange(e,index)} placeholder="Enter song's genre or mood" className='outline-none bg-white py-3 px-4 rounded-xl text-black '/>
                    </div>
                    <div className='flex flex-col gap-4 w-[32%]'>
                      <label htmlFor="musicdir">
                        Music Director
                      </label>
                      <input type="text" id='musicdir' name='songDirector' value={value.songDirector} onChange={(e)=>handleSongChange(e,index)} placeholder="Enter Music Director's name" className='outline-none bg-white py-3 px-4 rounded-xl text-black '/>
                    </div>
                    <div className='w-full flex justify-between items-center'>
                      <div>
                      {songs.length - 1 === index && (<input type='button' value="Add song" onClick={addSongs} className='bg-green-500 px-3 py-2 text-center rounded-lg hover:bg-black'/>)}
                      </div>
                      <div>
                        {songs.length>1 && (
                      <input type='button' value="Remove song" onClick={()=>removeSongs(index)} className='bg-red-500 px-3 py-2 text-center rounded-lg hover:bg-black'/>)}
                      </div>
                    </div>
                    </main>
                  </section>
                )
             })}
          </article>
          <button className='cursor-pointer w-[98%] mt-8 p-3 text-xl bg-sky-600 rounded-lg'>Upload Album</button>
        </form>
      </article>
      {isLoading && <Spinner/>}
    </section>
  )
}

export default AddAlbums