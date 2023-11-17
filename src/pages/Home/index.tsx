import React, { useState, useEffect } from "react";
import movie from "../../assets/images/movie-dummy.jpg";
import useAuth from "../../contexts/AuthContext";
import { AlbumApi, FavoriteApi } from "../../api";
import { AlbumResponse } from "../../types";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const { userId } = useAuth();
  const [recommend, setRecommend] = useState<AlbumResponse[]>([]);
  const [favorite, setFavorite] = useState<AlbumResponse[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const albums = await AlbumApi.recommend();
        setRecommend(albums);
        const favorites = await FavoriteApi.getFavorite(userId);
        setFavorite(favorites);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

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
          <p className="text-2xl mt-3">
            Immerse yourself in a cinematic journey like never before
          </p>
        </div>
      </div>
      <div className="w-full h-full px-10 p-5 mb-8">
        <div className="py-5 pb-7 text-4xl">
          <h1>Albums you might like</h1>
        </div>
        <div className="w-full h-full py-5 px-5 flex space-x-8 overflow-x-auto hide-scrollbar">
          {recommend && recommend.length > 0 ? (
            recommend.map((data) => (
              <div
                key={data?.id}
                className="h-full bg-gray-700 space-y-3 p-5 rounded-xl transition-transform duration-300 transform hover:scale-110 cursor-pointer"
                onClick={() => {
                  navigate("/album/" + data.id);
                }}
              >
                <div className="flex justify-center items-center">
                  <img
                    src={data?.thumbnail == "default" ? movie : data?.thumbnail}
                    alt="Movie"
                    className="w-52 h-full"
                  />
                </div>
                <div className="w-full h-full">
                  <h1>{data?.title}</h1>
                  <h3>
                    {data?.description.trim().length > 30
                      ? data?.description.substring(0, 30) + "..."
                      : data?.description}
                  </h3>
                </div>
              </div>
            ))
          ) : (
            <div className="text-2xl w-full mt-10 h-full justify-center text-center">
              Album Not Found.
            </div>
          )}
        </div>

        <div className="py-5 pb-7 text-4xl mt-7">
          <h1>Your Favorite Album(s)</h1>
        </div>
        <div className="w-full h-full py-5 px-5 flex space-x-8 overflow-x-auto hide-scrollbar">
          {favorite && favorite.length > 0 ? (
            favorite.map((data) => (
              <div
                key={data?.id}
                className="h-full w-auto bg-gray-700 space-y-3 p-5 rounded-xl transition-transform duration-300 transform hover:scale-110 cursor-pointer"
                onClick={() => {
                  navigate("/album/" + data?.id);
                }}
              >
                <div className="flex justify-center items-center">
                  <img
                    src={data?.thumbnail == "default" ? movie : data?.thumbnail}
                    alt="Movie"
                    className="w-52 h-full"
                  />
                </div>
                <div className="h-full">
                  <h1>{data?.title}</h1>
                  <h3>
                    {data?.description.trim().length > 30
                      ? data?.description.substring(0, 30) + "..."
                      : data?.description}
                  </h3>
                </div>
              </div>
            ))
          ) : (
            <div className="text-2xl w-full mt-10 h-full justify-center text-center">
              Favorite Album Not Found.
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
