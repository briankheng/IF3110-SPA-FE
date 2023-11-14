import React, { useState, useEffect } from 'react';
import movie from '../../assets/images/movie-dummy.jpg';
import useAuth from '../../contexts/AuthContext';
import { AlbumApi } from "../../api";
import { AlbumResponse } from "../../types";

const Home: React.FC = () => {
    const { isAdmin } = useAuth();
    const [album, setAlbum] = useState<AlbumResponse[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const albums = await AlbumApi.recommend();
                setAlbum(albums);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const handleAddAlbum = () => {
        console.log('tambahin sini kack');
    };

    return (
        <main className="bg-black text-white flex flex-col w-full min-h-screen">
            <div className="relative h-screen overflow-hidden">
                <img
                    src="https://res.cloudinary.com/ehizeex-shop/image/upload/v1668267540/NetflixApp/avengers-age-of-ultron-team-together-poster-wallpaper-1600x600-92751_84_qvwbif.jpg"
                    alt="Hero Background"
                    className="absolute inset-0 object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-[0.97]" />
                <div className="relative z-10 flex flex-col items-center justify-center h-[80vh] text-white">
                    <h1 className="text-8xl font-bold">KBLMovie.</h1>
                    <p className="text-2xl mt-3">Immerse yourself in a cinematic journey like never before</p>
                </div>
            </div>
            <div className="w-full h-full px-10 p-5 mb-8">
                <div className="py-5 pb-7 text-4xl">
                    <h1>Albums you might like</h1>
                </div>
                <div className="w-full h-full py-5 px-5 flex space-x-8 overflow-x-auto hide-scrollbar">
                    {album.map((data) => (
                        <div key={data.id} className="h-full bg-gray-700 space-y-3 p-5 rounded-xl transition-transform duration-300 transform hover:scale-110">
                            <div className="w-52 h-full">
                                <img src={data.thumbnail == "default" ? movie : data.thumbnail} alt="Movie"/>
                            </div>
                            <div className="w-full h-full">
                                <h1>{data.title}</h1>
                                <h3>{data.description}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="py-5 pb-7 text-4xl mt-7">
                    <h1>Your Favorite Album(s)</h1>
                </div>
                <div className="w-full h-full flex space-x-8 overflow-x-auto hide-scrollbar">
                    <div className="h-full bg-gray-700 space-y-3 p-5 rounded-xl">
                        <div className="w-52 h-full">
                            <img src={movie} alt="Movie"/>
                        </div>
                        <div className="w-auto h-auto">
                            <h1>Judul</h1>
                            <h3>Deskripsi</h3>
                        </div>
                    </div>
                    <div className="h-full bg-gray-700 space-y-3 p-5 rounded-xl">
                        <div className="w-52 h-full">
                            <img src={movie} alt="Movie"/>
                        </div>
                        <div className="w-auto h-auto">
                            <h1>Judul</h1>
                            <h3>Deskripsi</h3>
                        </div>
                    </div>
                    <div className="h-full bg-gray-700 space-y-3 p-5 rounded-xl">
                        <div className="w-52 h-full">
                            <img src={movie} alt="Movie"/>
                        </div>
                        <div className="w-auto h-auto">
                            <h1>Judul</h1>
                            <h3>Deskripsi</h3>
                        </div>
                    </div>
                    <div className="h-full bg-gray-700 space-y-3 p-5 rounded-xl">
                        <div className="w-52 h-full">
                            <img src={movie} alt="Movie"/>
                        </div>
                        <div className="w-auto h-auto">
                            <h1>Judul</h1>
                            <h3>Deskripsi</h3>
                        </div>
                    </div>
                    <div className="h-full bg-gray-700 space-y-3 p-5 rounded-xl">
                        <div className="w-52 h-full">
                            <img src={movie} alt="Movie"/>
                        </div>
                        <div className="w-auto h-auto">
                            <h1>Judul</h1>
                            <h3>Deskripsi</h3>
                        </div>
                    </div>
                </div>
                {isAdmin && (<>
                    <div className="py-5 pb-7 text-4xl mt-7">
                        <h1>Admin Section</h1>
                    </div>
                    <div className="h-full bg-gray-700 space-y-3 p-2 rounded-xl">
                        <button onClick={handleAddAlbum} className="hover:bg-gray-900 p-3 px-5 rounded-xl">Create New Album</button>
                    </div>
                </>)}
            </div>
        </main>
    );
};

export default Home;
