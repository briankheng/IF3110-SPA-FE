import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    
    return (
        <div className="w-full h-screen bg-black text-white justify-center text-center">
            <div className="h-[70vh] w-full flex flex-col space-y-3 justify-center items-center">
                <h1 className="text-8xl">404</h1>
                <h3 className="text-3xl">Page Not Found.</h3>
                <h3 className="text-3xl mb-3">Please go back to KBLMovie. homepage</h3>
                <button className="bg-gray-800 p-3 px-5 rounded-xl text-xl w-40 transition-transform duration-300 transform hover:scale-110" onClick={() => {navigate("/")}}>Go Back</button>
            </div>
        </div>
    );
};

export default NotFound;