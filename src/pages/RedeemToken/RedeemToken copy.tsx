function RedeemToken() {
    return (
        <div className="bg-black h-screen w-screen flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center gap-3 bg-white w-1/3 overflow-y-auto px-20 py-16 rounded-xl text-black text-lg font-poppins">
                <p className="text-center font-semibold">Redeem Your Token</p>
                {/* Token Input Field */}
                <input
                    type="text"
                    className="border border-black rounded-3xl focus:border-light-blue px-5 py-2"
                />

                {/* Redeem Button */}
                <button className="w-fit bg-green-400 hover:bg-green-300 px-5 py-2 rounded-3xl mt-5">Submit</button>
            </div>
        </div>
    );
}

export default RedeemToken;