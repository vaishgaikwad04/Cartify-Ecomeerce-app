import { Link } from "react-router-dom";
import {
  FiCheckCircle,
  FiShoppingBag,
  FiArrowRight,
} from "react-icons/fi";

const Success = () => {
  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-6 ">
      <div className="w-full max-w-2xl bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">

        {/* Top Section */}
        <div className="flex flex-col items-center px-10 pt-12">

          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <FiCheckCircle className="text-green-600 text-5xl" />
          </div>

          <h1 className="mt-6 text-4xl font-bold text-gray-900">
            Payment Successful
          </h1>

          <p className="mt-3 text-gray-500 text-center max-w-md leading-7">
            Thank you for shopping with <span className="font-semibold">Cartify</span>.
            Your payment has been received successfully and your order is now
            being prepared for dispatch.
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mt-10"></div>

        {/* Order Summary */}
        <div className="px-10 py-8">

          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Order Summary
          </h2>

          <div className="space-y-5">

            <div className="flex justify-between">
              <span className="text-gray-500">Order Status</span>
              <span className="font-semibold text-green-600">
                Confirmed
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Payment</span>
              <span className="font-semibold">
                Completed
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Delivery Status</span>
              <span className="font-semibold">
                Processing
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Estimated Delivery</span>
              <span className="font-semibold">
                3 - 5 Business Days
              </span>
            </div>

          </div>
        </div>

        {/* Bottom */}
        <div className="bg-gray-50 border-t border-gray-200 px-10 py-8">

          <div className="flex flex-col sm:flex-row gap-4">

            <Link
              to="/"
              className="flex-1 bg-black hover:bg-gray-800 text-white rounded-xl py-3.5 font-semibold transition flex items-center justify-center gap-2"
            >
              <FiShoppingBag />
              Continue Shopping
            </Link>

            <Link
              to="/orders"
              className="flex-1 border border-gray-300 hover:bg-white rounded-xl py-3.5 font-semibold transition flex items-center justify-center gap-2"
            >
              View Orders
              <FiArrowRight />
            </Link>

          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            A confirmation email has been sent to your registered email
            address.
          </p>

        </div>

      </div>
    </div>
  );
};

export default Success;