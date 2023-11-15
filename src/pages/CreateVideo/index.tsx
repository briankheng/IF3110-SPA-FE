import { useState } from "react";
import { Link } from "react-router-dom";

function CreateVideo() {
    const [selectedAlbum, setSelectedAlbum] = useState("");
    const [isPremium, setIsPremium] = useState("");
    const [isOpenAlbum, setIsOpenAlbum] = useState(false); // Album Dropdown
    const [isOpenPremium, setIsOpenPremium] = useState(false); // Premium Dropdown
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [errors, setErrors] = useState({ title: "", description: "", url: "", thumbnail: "", isPremium: "", album: "" });
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Dummy Available Albums
    const albums = ['Album 1', 'Album 2', 'Album 3', 'Album 4'];
    const premiumOptions = ['Yes', 'No'];

    const handleAlbumChange = (event) => {
        setSelectedAlbum(event.target.value);
    };

    const handlePremiumChange = (event) => {
        setIsPremium(event.target.value);
    };

    const validateForm = () => {
        let valid = true;
        let errors = { title: "", description: "", url: "", thumbnail: "", isPremium: "", album: "" };

        if (title.trim().length === 0) {
            errors.title = "Title is required.";
            valid = false;
        }

        if (description.trim().length === 0) {
            errors.description = "Description is required.";
            valid = false;
        }

        if (url.trim().length === 0) {
            errors.url = "URL is required.";
            valid = false;
        }

        if (thumbnail.trim().length === 0) {
            errors.thumbnail = "Thumbnail is required.";
            valid = false;
        }

        if (isPremium === "") {
            errors.isPremium = "Please select an option.";
            valid = false;
        }

        if (selectedAlbum === "") {
            errors.album = "Please select an album.";
            valid = false;
        }

        setErrors(errors);
        return valid;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // If all fields are filled
        if (validateForm()) {
            setShowSuccessModal(true);
        }
    };

    return (
        <div className="bg-black min-h-screen w-screen text-white font-poppins flex justify-center items-center">
            <div className="h-128 overflow-y-auto border border-lime-700 rounded-lg px-7 md:px-12 pt-5 md:pt-10 pb-8 md:pb-12">
                <p className="text-center font-bold text-sm md:text-xl">Add Your Video</p>
                <form onSubmit={handleSubmit} className="flex flex-col mt-10 gap-1 bg-light-gray px-5 md:px-7 pt-3 md:pt-5 pb-6 md:pb-8 rounded-lg text-xs md:text-base">
                    <label>Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-light-gray border border-white rounded-md py-1 px-2 focus:border-light-blue"/>
                    {errors.title && <p className="mt-2 text-red-500">{errors.title}</p>}

                    <label className="mt-2">Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="h-52 bg-light-gray border border-white rounded-md py-1 px-2 focus:border-light-blue resize-none"></textarea>
                    {errors.description && <p className="mt-2 text-red-500">{errors.description}</p>}

                    <label className="mt-2">URL</label>
                    <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} className="bg-light-gray border border-white rounded-md py-1 px-2 focus:border-light-blue"/>
                    {errors.url && <p className="mt-2 text-red-500">{errors.url}</p>}

                    <label className="mt-2">Thumbnail</label>
                    <input type="text" value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} className="bg-light-gray border border-white rounded-md py-1 px-2 focus:border-light-blue"/>
                    {errors.thumbnail && <p className="mt-2 text-red-500">{errors.thumbnail}</p>}

                    <label className="mt-2">Premium</label>
                    <div onClick={() => {setIsOpenPremium(!isOpenPremium); setIsOpenAlbum(false);}} className="bg-light-gray border border-white rounded-md py-1 px-2 focus:border-green-700 cursor-pointer relative">
                        <div className="flex justify-between">
                            {isPremium || 'Select option'}
                            <div> &gt; </div>
                        </div>

                        {isOpenPremium && (
                        <select size="2" value={isPremium} onChange={handlePremiumChange} onBlur={() => setIsOpenPremium(false)} className="bg-light-gray border border-white rounded-md py-1 px-2 focus:border-green-700 absolute z-10 w-full left-0 top-10">
                            {premiumOptions.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        )}
                    </div>
                    {errors.isPremium && <p className="mt-2 text-red-500">{errors.isPremium}</p>}

                    <label className="mt-2">Album Id</label>
                    <div onClick={() => {setIsOpenAlbum(!isOpenAlbum); setIsOpenPremium(false);}} className="bg-light-gray border border-white rounded-md py-1 px-2 focus:border-green-700 cursor-pointer relative">
                        <div className="flex justify-between">
                            {selectedAlbum || 'Select album'}
                            <div> &gt; </div>
                        </div>

                        {isOpenAlbum && (
                        <select size="3" value={selectedAlbum} onChange={handleAlbumChange} onBlur={() => setIsOpenAlbum(false)} className="bg-light-gray border border-white rounded-md py-1 px-2 focus:border-green-700 absolute z-10 w-full left-0 top-10">
                            {albums.map((album, index) => (
                                <option key={index} value={album}>
                                    {album}
                                </option>
                            ))}
                        </select>
                        )}
                    </div>
                    {errors.album && <p className="mt-2 text-red-500">{errors.album}</p>}

                    {/* Submit Button */}
                    <button onClick={() => handleSubmit(event)} className="bg-lime-600 rounded-lg mt-8 py-2 text-md font-bold hover:bg-lime-300">
                        Add
                    </button>
                </form>
            </div>

            {showSuccessModal && (
                <div className="fixed inset-0 flex items-center justify-center z-10">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="relative bg-light-gray border border-lime-400 px-8 pt-4 pb-10 rounded-lg flex flex-col items-center justify-center text-xs md:text-sm">
                        {/* Redirect to some page */}
                        <Link to="/" onClick={() => setShowSuccessModal(false)} className="self-end rounded-lg hover:bg-gray-500 px-2 -mr-4">x</Link>
                        <p className="mt-5 text-center font-bold text-sm md:text-xl">Your video is successfully created!</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CreateVideo;