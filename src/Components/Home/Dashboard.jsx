import React, { useContext } from 'react'
import { AlbumContextAPI } from '../../Context/AlbumContext'
import Spinner from '../../Helper Components/Spinner';
import { NavLink } from 'react-router-dom';

const Dashboard = () => {
    let {albums, isLoading} = useContext(AlbumContextAPI)
    console.log(albums);
    
  return (
    <div className='p-15 w-[80%]'>
        <h1 className='text-4xl font-semibold'>Albums</h1>
        <section className='mt-15 flex gap-10 overflow-x-auto scrollbar-hide'>
            {albums.map((album)=>{
                return(
                    <NavLink to="/album-details" state={{album}} key={album.albumID} className='p-7 bg-sky-800 rounded-2xl shrink-0'>
                        <img src={album.albumPoster} alt="" className='h-[270px] w-[240px] rounded-lg'/>
                        <h2 className='text-2xl text-center font-semibold mt-5'>{album.albumTitle}</h2>
                    </NavLink>
                )
            })}
        </section>
        {isLoading && <Spinner/>}
    </div>
  )
}

export default Dashboard