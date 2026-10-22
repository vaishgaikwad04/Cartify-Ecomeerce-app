
import { Link } from "react-router-dom";
import {
  FiXCircle,
  FiShoppingBag,
  FiArrowRight,
  FiShield,
} from "react-icons/fi";

const Cancel = () => {
  return (
    <main className="flex min-h-[60vh] w-full items-center justify-center bg-white px-4 py-10 sm:min-h-[70vh] sm:px-6 sm:py-14 lg:py-16">
      <section className="mx-auto flex w-full max-w-md flex-col items-center text-center">

        {/* Cancellation icon */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-rose-50 sm:h-14 sm:w-14">
          <FiXCircle
            className="h-6 w-6 text-rose-500 sm:h-7 sm:w-7"
            strokeWidth={1.6}
          />
        </div>

        {/* Heading */}
        <p className="mt-5 text-[9px] font-semibold uppercase tracking-[0.18em] text-rose-500 sm:mt-6 sm:text-[10px] sm:tracking-[0.2em]">
          Checkout interrupted
        </p>

        <h1 className="mt-2 text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl md:text-[28px]">
          Payment cancelled
        </h1>

        <p className="mt-3 max-w-[340px] text-xs leading-5 text-gray-500 sm:text-[13px] sm:leading-6">
          No worries! Your purchase wasn't completed.
          Your cart is still waiting for you whenever
          you're ready to try again.
        </p>

        {/* Cart reassurance */}
        <div className="mt-5 flex items-center justify-center gap-2 text-[11px] text-emerald-700 sm:text-xs">
          <FiShoppingBag className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
          <span>Your cart items are preserved</span>
        </div>

        {/* Responsive actions */}
        <div className="mt-7 flex w-full max-w-[320px] flex-col gap-2.5 sm:mt-8">
          <Link
            to="/cart"
            className="group flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-3 text-xs font-medium text-white transition-colors hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 sm:text-[13px]"
          >
            Return to cart
            <FiArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            to="/"
            className="flex min-h-11 w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-3 text-xs font-medium text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 sm:text-[13px]"
          >
            Continue shopping
          </Link>
        </div>

        {/* Security note */}
        <div className="mt-6 flex w-full max-w-[340px] items-start justify-center gap-2 px-1 text-[10px] leading-[18px] text-gray-400 sm:mt-7 sm:text-[11px] sm:leading-5">
          <FiShield className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <p>
            If you're unsure whether your payment went through,
            verify its status before trying again.
          </p>
        </div>

      </section>
    </main>
  );
};

export default Cancel;
