import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../contexts/AuthContext";
import { TokenApi } from "../../api";

function RedeemToken() {
  const { userId } = useAuth(); 
  const [token, setToken] = useState("");
  const [redeemedTokenValue, setRedeemedTokenValue] = useState(0);
  const [isRedeemSuccess, setIsRedeemSuccess] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await TokenApi.checkToken(token);
      if (response.valid) {
        setIsRedeemSuccess(true);
        setRedeemedTokenValue(response.coinValue)

      } else {
        alert('Invalid token');
      }
    } catch (error) {
      alert('An error occurred while redeeming the token');
    }
  };

  const addCoinsToUser = async (coinValue: number) => {
    try {
      await TokenApi.addCoins(userId, coinValue);
    } catch (error) {
      alert('An error occurred while adding coins to the user');
    }
  };

  useEffect(() => {
    if (isRedeemSuccess) {
      addCoinsToUser(redeemedTokenValue);
    }
  }, [isRedeemSuccess]);

  return (
    <div className="bg-black h-screen w-full flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-3 bg-light-gray w-5/6 md:w-1/2 xl:w-1/3 overflow-y-auto px-2 py-10 xl:px-6 xl:py-14 rounded-xl text-white text-sm md:text-lg xl:text-xl font-poppins">
        <p className="text-center font-semibold text-lg md:text-xl xl:text-2xl">Redeem Your Token</p>
        {/* Token Input Field */}
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="border border-black rounded-3xl px-5 py-2 text-black mt-4"
        />

        {/* Redeem Button */}
        <button onClick={handleSubmit} className="w-fit bg-green-400 hover:bg-green-300 px-5 py-2 rounded-3xl mt-5">Submit</button>
      </div>

      {/* Success Modal */}
      {isRedeemSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center mb-20">
          <div className="flex flex-col justify-center items-center px-6 pt-4 pb-12 md:px-8 md:pt-6 md:pb-14 xl:px-10 xl:pt-8 xl:pb-16 border border-lime-400 bg-light-gray rounded-lg text-white font-poppins space-y-4">
            {/* Redirect to Home Page */}
            <Link to="/" className="self-end text-lg md:text-xl xl:text-2xl">x</Link>
            <p className="text-base md:text-lg xl:text-xl font-semibold">CONGRATULATIONS!</p>
            <p className="text-sm md:text-base xl:text-lg text-center">Your token has been successfully redeemed!</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default RedeemToken;
