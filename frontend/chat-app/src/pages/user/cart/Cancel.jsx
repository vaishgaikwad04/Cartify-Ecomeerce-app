import { Link } from "react-router-dom";
import {
  FiXCircle,
  FiShoppingCart,
  FiArrowLeft,
} from "react-icons/fi";

const Cancel = () => {
  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-6">
      <div className="w-full max-w-2xl bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">

        {/* Top Section */}
        <div className="flex flex-col items-center px-10 pt-12">

          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
            <FiXCircle className="text-red-600 text-5xl" />
          </div>

          <h1 className="mt-6 text-4xl font-bold text-gray-900">
            Payment Cancelled
          </h1>

          <p className="mt-3 text-gray-500 text-center max-w-md leading-7">
            Your payment was cancelled before it could be completed.
            Don't worry—your cart items have been saved and you can try again
            whenever you're ready.
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mt-10"></div>

        {/* Information */}
        <div className="px-10 py-8">

          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Payment Details
          </h2>

          <div className="space-y-5">

            <div className="flex justify-between">
              <span className="text-gray-500">Payment Status</span>
              <span className="font-semibold text-red-600">
                Cancelled
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Order Status</span>
              <span className="font-semibold">
                Not Placed
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Cart</span>
              <span className="font-semibold">
                Items Preserved
              </span>
            </div>

          </div>
        </div>

        {/* Bottom */}
        <div className="bg-gray-50 border-t border-gray-200 px-10 py-8">

          <div className="flex flex-col sm:flex-row gap-4">

            <Link
              to="/cart"
              className="flex-1 bg-black hover:bg-gray-800 text-white rounded-xl py-3.5 font-semibold transition flex items-center justify-center gap-2"
            >
              <FiShoppingCart />
              Return to Cart
            </Link>

            <Link
              to="/"
              className="flex-1 border border-gray-300 hover:bg-white rounded-xl py-3.5 font-semibold transition flex items-center justify-center gap-2"
            >
              <FiArrowLeft />
              Continue Shopping
            </Link>

          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            If this was unexpected, you can safely retry your payment from the cart.
          </p>

        </div>

      </div>
    </div>
  );
};

export default Cancel;