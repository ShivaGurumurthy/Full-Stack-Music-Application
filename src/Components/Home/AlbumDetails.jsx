import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { AlbumContextAPI } from '../../Context/AlbumContext';

const AlbumDetails = () => {
    let data = useLocation()
    console.log(data);

    let {state:{album}} = data
    let {songs, setSongs, isPlaying, setIsPlaying, currentSongIndex, setCurrentSongIndex} = useContext(AlbumContextAPI)

    let handleSongClick = (index)=>{
        setSongs(album.songs)
        setCurrentSongIndex(index)
        if(currentSongIndex === index){
            setIsPlaying(!isPlaying)
        }
        else{
            setIsPlaying(true)
        }

    }

    //Song Duration Converter function:
    const formatDuration = (durationInMinutes) =>{
        let min = Math.floor(durationInMinutes/60)
        let sec = Math.floor(durationInMinutes%60)
        return `${min}:${sec.toString().padStart(2,'0')}`
    }
    
    
  return (
   <section className='p-15'>
        <article className='flex gap-8 bg-sky-900 p-8 rounded-xl'>
            <aside className='shrink-0 bg-sky-700 p-8 rounded-xl'>
                <img src={album.albumPoster} alt=""  className='h-[450px] w-[330px] rounded-xl'/>
            </aside>
            <aside>
                <h1 className='text-6xl font-semibold'>{album.albumTitle}</h1>
                <ul className='mt-15 flex flex-col gap-5 text-3xl'>
                    <li className='flex'>
                        <span className='w-[150px]'>Title</span>
                        <span>{album.albumTitle}</span>
                    </li>
                    <li className='flex'>
                        <span className='w-[150px]'>Number of tracks</span>
                        <span>{album.songs.length}</span>
                    </li>
                    <li className='flex'>
                        <span className='w-[150px]'>Release Date</span>
                        <span>{album.albumReleaseDate}</span>
                    </li>
                    <li className='flex'>
                        <span className='w-[150px]'>Languages</span>
                        <span>{album.albumLanguages}</span>
                    </li>
                    <li className='flex'>
                        <span className='w-[150px] shrink-0'>Decription</span>
                        <span>{album.albumDescription}</span>
                    </li>
                </ul>
            </aside>
        </article>
        <main className={`p-6 mt-7 bg-slate-900 rounded-xl ${currentSongIndex!==null && "mb-[100px]"}`}>
            <h1 className='text-5xl px-6 p-4 font-semibold'>Songs List</h1>
            <table className='w-full mt-16 text-left rounded-lg overflow-hidden'>
                <thead className='bg-slate-600 text-3xl text-center'>
                    <tr className='border-2 border-slate-400'>
                        <th className='px-4 py-5'></th>
                        <th className='px-2 py-4'>Track</th>
                        <th className='px-2 py-4'>Song</th>
                        <th className='px-2 py-4'>Singers</th>
                        <th className='px-2 py-4'>Music Director</th>
                        <th className='px-2 py-4'>Mood</th>
                        <th className='px-2 py-4'>Duration</th>
                    </tr>
                </thead>
                <tbody className='w-full text-center text-2xl'>
                    {album.songs.map((song,index)=>{
                        return(
                            <tr className='border-2 border-slate-700 hover:border-slate-200 cursor-pointer' onClick={()=>handleSongClick(index)}>
                                <td className='py-3 text-center'>{index+1}</td>
                                <td className='py-4 text-center flex justify-center'>
                                    <img src={song.songThumbnail} alt="" className='h-30 w-[50%] rounded-lg'/>
                                </td>
                                <td>{song.songName}</td>
                                <td>{song.songSingers}</td>
                                <td>{song.songDirector}</td>
                                <td>{song.songMood}</td>
                                {/* <td className='text-center'>{(song.songDuration/60).toFixed(2)}</td> */}
                                <td>{formatDuration(song.songDuration)}</td>
                            </tr>
                        )
                        
                    })}
                </tbody>
            </table>
        </main>
   </section>

  )
}

export default AlbumDetails