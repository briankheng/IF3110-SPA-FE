import React, { useEffect } from 'react';
import movie from '../../assets/images/movie-dummy.jpg';
import { useLocation } from 'react-router-dom';

const Search: React.FC = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const title = searchParams.get('title') || 'Default Title';

    useEffect(() => {
        const fetchData = () => {
            console.log('fetch ' + title);
        };

        fetchData();
    }, [title]);

    return (
        <main className="bg-black text-white flex flex-col w-full min-h-screen px-10 p-5 pt-10">
            <div className="h-full">
                <h1 className="text-3xl">Search Result for Title "{title}"</h1>
            </div>
            <div
                className="w-full h-full mt-8 mb-8 overflow-y-auto flex flex-wrap justify-center items-center"
                style={{ gap: '2rem' }}
            >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                    <div
                        key={item}
                        className="h-full bg-gray-700 space-y-3 p-5 rounded-xl"
                        style={{ flex: '0 0 calc(25% - 100px)' }}
                    >
                        <div className="w-52 h-full">
                            <img src={movie} alt="Movie" />
                        </div>
                        <div className="w-auto h-auto">
                            <h1>Judul</h1>
                            <h3>Deskripsi</h3>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default Search;
