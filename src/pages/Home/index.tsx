import React, { useState } from 'react';
import movie from '../../assets/images/movie-dummy.jpg';

const Home: React.FC = () => {

    return (
        <main className="bg-black text-white flex flex-col w-full min-h-screen px-10 p-5">
            <div className="py-5 pb-7 text-4xl">
                <h1>Albums you might like</h1>
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
        </main>
    );
};

export default Home;
