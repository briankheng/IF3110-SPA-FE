import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAuth from '../../contexts/AuthContext';
import { AlbumApi, RatingApi, FavoriteApi, SubscriptionApi } from "../../api";
import { AlbumResponse, Video, Favorite, RatingRequest } from "../../types";
import movie from '../../assets/images/movie-dummy.jpg';

const AlbumDetail = () => {
  const { id } = useParams();
  const { userId, isAdmin } = useAuth();

  const [album, setAlbum] = useState<AlbumResponse>({} as AlbumResponse);
  const [rating, setRating] = useState(0);
  const [videos, setVideos] = useState<Video[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const [hover, setHover] = useState(0);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Album
        const albumData = await AlbumApi.getAlbum(id as string);
        setAlbum(albumData);

        // Rating
        const ratingData = await RatingApi.getRating(userId.toString(), id as string);
        setRating(ratingData.score);

        // Subscription
        const subscriptionData = await SubscriptionApi.getStatus(userId, id ? parseInt(id, 10) : 0);
        setIsSubscribed(subscriptionData);

        // Favorite
        const favoriteData = await FavoriteApi.verifyFavorite(userId.toString(), id as string);
        setIsFavorite(favoriteData);

        // Videos
        setVideos(albumData.videos);

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const handleVideoClick = (video : Video) => {
      if (video.isPremium) {
          setShowConfirmationModal(true);
      }
  };

  const handleCloseConfirmationModal = () => {
    // Siap buat bayar
    setShowConfirmationModal(false);
  };

  const handleSubscription = async () => {
    // Siap buat subs dan unsubs
    if (!isSubscribed) {
      const subscriptionRes = await SubscriptionApi.request(userId.toString(), id as string);
      console.log(subscriptionRes);
      alert("Your subscription request is on verification, please wait the confirmation process from admin");
    } else {
      const unsubscriptionRes = await SubscriptionApi.unsubscribe(userId.toString(), id as string);
      console.log(unsubscriptionRes);
      alert("The album is unsubsribed!");
    }
    setIsSubscribed(!isSubscribed);
  }

  const handleFavorite = async () => {
    // Siap buat fav dan unfav
    const sentData : Favorite = {
      userId: userId,
      albumId: typeof id === 'string' ? parseInt(id, 10) : 0,
    }

    if (!isFavorite) {
      const favRes = await FavoriteApi.add(sentData);
      console.log(favRes);
    } else {
      const unfavRes = await FavoriteApi.remove(sentData);
      console.log(unfavRes);
    }
    setIsFavorite(!isFavorite);
  }

  const handleRating = async (ratingValue : number) => {
    // Edit nilai rating
    // Siap buat fav dan unfav
    const sentData : RatingRequest = {
      score : ratingValue,
      userId: userId,
      albumId: typeof id === 'string' ? parseInt(id, 10) : 0,
    }
    console.log(ratingValue);

    const ratingRes = await RatingApi.createRating(sentData);
    console.log(ratingRes);
    setRating(ratingValue);
  }

  const handleAddVideo = () => {
    console.log("add disini bg");
  }

  return (
    <div className="bg-black min-h-screen w-full text-white px-12 py-3 xl:py-10">
            {/* Album Overview */}
            <div className="md:flex gap-7 md:px-7 py-10 text-white font-poppins">
                <img src={album.thumbnail == "default" ? movie : album.thumbnail} className="w-48 mx-auto md:mx-0" />
                <div className="bg-light-gray px-3 md:px-10 py-10 rounded-xl md:w-1/2">
                    <h1 className="font-bold text-xs md:text-2xl">{album.title}</h1>
                    <h2 className="mt-3 text-xs xl:text-base">{album.description}</h2>
                    <hr className="my-4" />
                    <div className="flex justify-center gap-2 md:gap-6 text-xs xl:text-base">
                        <button onClick={() => handleFavorite()} className={`border border-green-500 hover:bg-green-300 ${isFavorite ? 'bg-green-500' : ''} px-3 py-1 rounded-xl`}>Favorite</button>
                        <button onClick={() => handleSubscription()} className={`border border-red-600 hover:bg-red-300 ${isSubscribed ? 'bg-red-500' : ''} px-3 py-1 rounded-xl`}>Subscribe</button>
                        {isAdmin ? <button onClick={() => handleAddVideo()} className="bg-gray-500 hover:bg-gray-300 px-3 py-1 rounded-xl">+ Add Video</button> : <></>}
                    </div>
                    <hr className="my-4" />

                    {/* Star Rating */}
                    <ul className="flex justify-center">
                        {[...Array(5)].map((_, i) => {
                            const ratingValue = i + 1;

                            return (
                                <li key={i}>
                                    <label>
                                        <input
                                            type="radio"
                                            name="rating"
                                            value={ratingValue}
                                            onClick={() => handleRating(ratingValue)}
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
                    <div className="mt-2 text-center text-xs xl:text-base">Rating: {rating}/5</div>
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
                            className={`m-4 text-sm px-4 pt-4 pb-6 rounded-md bg-light-gray ${video.isPremium ? 'border border-light-blue text-gray-500' : ''} hover:bg-gray-600 hover:text-white transition-colors duration-200`} 
                            onClick={() => handleVideoClick(video)}>
                            <img src={video.thumbnail} alt={video.title} className="w-20 md:w-60 h-12 md:h-32" />
                            <h3 className="font-bold w-20 md:w-32 xl:text-lg">{video.title}</h3>
                            <p className="w-20 md:w-32 text-xs xl:text-base">{video.views} views</p>
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
};

export default AlbumDetail;
