import { Link } from "react-router-dom";

function Login() {
    return (
        <div className="bg-black h-screen w-screen flex flex-col justify-center items-center">
            <div className="bg-light-gray w-1/3 overflow-y-auto px-20 py-16 rounded-lg text-white text-lg font-poppins">
                <p className="text-center text-2xl font-semibold">Welcome Back!</p>
                <p className="text-center">We're so excited to see you again!</p>
                <form className="flex flex-col mt-8" >
                    {/* Username */}
                    <label>Username<span className="text-red-700">*</span></label>
                    <input 
                        type="text" 
                        className="bg-black text-white px-4 py-2 mt-2 border rounded-2xl border-white focus:border-light-blue focus:outline-none"
                    />

                    {/* Password */}
                    <label className="mt-7">Password<span className="text-red-700">*</span></label>
                    <input 
                        type="password"
                        className="bg-black text-white px-4 py-2 mt-2 border rounded-2xl border-white focus:border-light-blue focus:outline-none"
                    />

                    {/* Submit Button */}
                    <button className="bg-green-500 rounded-lg mt-6 py-2 text-md font-bold hover:bg-green-400">Login</button>
                </form>
                <p className="text-white text-md mt-5">Need a KBL account? <Link to="/signup" className="text-light-blue hover:underline hover:text-blue-300">Signup</Link></p>
            </div>
            
        </div>
    );
}

export default Login;