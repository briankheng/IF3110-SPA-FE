import { useState } from "react";

// Dummy Data
const album = {
    id: 1,
    title: "My Album",
    description: "This is a description of my album.",
    thumbnail: "https://assets-global.website-files.com/6009ec8cda7f305645c9d91b/6408f6e7b5811271dc883aa8_batman-min.png", // Album Picture
  };
  
const videos = Array.from({ length: 7 }, (_, i) => ({
    id: i + 1,
    title: `Video ${i + 1}`,
    description: `This is a description of video ${i + 1}.`,
    url: "abc",
    thumbnail: "https://anniehaydesign.weebly.com/uploads/9/5/4/6/95469676/landscape-poster-3_orig.jpg", // Video Picture
    views: Math.floor(Math.random() * 10000),
    is_premium: i >= 3, 
    album_id: album.id,
}));

function TestAlbumDetail() {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const handleVideoClick = (video) => {
        if (video.is_premium) {
            setShowConfirmationModal(true);
        }
    };

    const handleCloseConfirmationModal = () => {
        setShowConfirmationModal(false);
    };

    return (
        <div className="bg-black min-h-screen w-screen text-white px-12 py-3 xl:py-10">
            {/* Album Overview */}
            <div className="md:flex gap-7 md:px-7 py-10 text-white font-poppins">
                <img src={album.thumbnail} className="w-40 mx-auto md:mx-0" />
                <div className="bg-light-gray px-3 md:px-10 py-10 rounded-xl">
                    <h1 className="font-bold">{album.title}</h1>
                    <hr className="my-4" />
                    <div className="flex text-xs justify-center gap-2 md:gap-6">
                        <button onClick={() => setIsFavorite(true)} className={`border border-green-500 hover:bg-green-300 ${isFavorite ? 'bg-green-500' : ''} px-3 py-1 rounded-xl`}>Favorite</button>
                        <button onClick={() => setIsSubscribed(true)} className={`border border-red-600 hover:bg-red-300 ${isSubscribed ? 'bg-red-500' : ''} px-3 py-1 rounded-xl`}>Subscribe</button>
                        <button className="bg-gray-500 hover:bg-gray-300 px-3 py-1 rounded-xl">+ Add Video</button>
                    </div>
                    <hr className="my-4" />

                    {/* Star Rating */}
                    <ul className="flex justify-center">
                        {[...Array(5)].map((star, i) => {
                            const ratingValue = i + 1;

                            return (
                                <li key={i}>
                                    <label>
                                        <input
                                            type="radio"
                                            name="rating"
                                            value={ratingValue}
                                            onClick={() => setRating(ratingValue)}
                                            className="hidden"
                                        />
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className={`mr-1 h-5 w-5 cursor-pointer transition duration-200 ease-in-out ${
                                                ratingValue <= (hover || rating)
                                                    ? 'text-yellow-500'
                                                    : 'text-gray-300'
                                            }`}
                                            onMouseEnter={() => setHover(ratingValue)}
                                            onMouseLeave={() => setHover(rating)}
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </label>
                                </li>
                            );
                        })}
                    </ul>
                    {/* Rating Score */}
                    <div className="mt-2 text-center text-xs">Rating: {rating}/5</div>
                </div>
            </div>

            <hr />

            {/* Videos List */}
            <div>
                <h2 className="text-center font-bold mt-2 md:mt-5 text-green-500">VIDEOS</h2>
                {/* Videos */}
                <div className="flex flex-wrap justify-around md:justify-normal">
                    {videos.map((video) => (
                        <div 
                            key={video.id} 
                            className={`m-4 text-sm px-4 pt-4 pb-6 rounded-md bg-light-gray ${video.is_premium ? 'border border-light-blue text-gray-500' : ''} hover:bg-gray-600 hover:text-white transition-colors duration-200`} 
                            onClick={() => handleVideoClick(video)}>
                            <img src={video.thumbnail} alt={video.title} className="w-20 md:w-32 h-12 md:h-20" />
                            <h3 className="font-bold w-20 md:w-32">{video.title}</h3>
                            <p className="w-20 md:w-32">{video.views} views</p>
                        </div>
                    ))}
                </div>
            </div>

            {showConfirmationModal && (
                <div className="fixed inset-0 flex items-center justify-center z-10">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="relative bg-light-gray border border-lime-400 px-8 pt-4 pb-8 rounded-lg flex flex-col items-center justify-center text-xs md:text-sm">
                        <button onClick={handleCloseConfirmationModal} className="self-end rounded-lg hover:bg-gray-500 px-2">x</button>
                        <p className="mt-5">Are you sure you want to buy this video for 10 coins?</p>
                        <button className="bg-green-500 hover:bg-green-200 px-5 py-1 rounded-lg mt-4" onClick={() => handleCloseConfirmationModal()}>Yes</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TestAlbumDetail;
