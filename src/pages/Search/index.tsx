import React, { useEffect, useState } from 'react';
import movie from '../../assets/images/movie-dummy.jpg';
import { useLocation } from 'react-router-dom';
import { AlbumApi } from "../../api";
import { SearchResponse } from "../../types";

const Search: React.FC = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const title = searchParams.get('title') || 'Default Title';
    const [album, setAlbum] = useState<SearchResponse[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const albums = await AlbumApi.search(title as string);
                setAlbum(albums);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [title]);

    return (
        <main className="bg-black text-white flex flex-col w-full min-h-screen px-10 p-5 pt-10">
            <div className="h-full">
                <h1 className="text-3xl">Search Result for Title "{title}"</h1>
            </div>
            <div
                className="w-full h-full mt-10 mb-8 flex flex-wrap justify-center items-center"
                style={{ gap: '2rem' }}
            >
                {album.map((data) => (
                    <div
                        key={data.id}
                        className="h-full bg-gray-700 space-y-3 p-5 rounded-xl transition-transform duration-300 transform hover:scale-110"
                        style={{ flex: '0 0 calc(25% - 100px)' }}
                    >
                        <div className="w-52 h-full">
                            <img src={data.thumbnail == "default" ? movie : data.thumbnail} alt="Movie" />
                        </div>
                        <div className="w-full h-full">
                            <h1>{data.title}</h1>
                            <h3>{data.description}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default Search;
