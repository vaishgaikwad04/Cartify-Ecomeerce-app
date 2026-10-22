
import { Link } from "react-router-dom";
import {
  FiCheckCircle,
  FiPackage,
  FiMapPin,
  FiCreditCard,
  FiArrowRight,
  FiShoppingBag,
} from "react-icons/fi";

const Success = () => {
  // Replace these sample values with your actual order data.
  const order = {
    id: "ORD-123456",
    date: new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    paymentMethod: "Online payment",
    paymentStatus: "Paid",
    subtotal: 2499,
    shipping: 0,
    total: 2499,
    deliveryEstimate: "3–5 business days",
    shippingAddress: {
      name: "Customer Name",
      address: "Your saved delivery address",
    },
    items: [
      {
        id: 1,
        name: "Your purchased product",
        variant: "Size: M",
        quantity: 1,
        price: 2499,
      },
    ],
  };

  const money = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);

  return (
    <main className="min-h-screen bg-[#f8f9fb] px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-3xl">

        {/* Confirmation header */}
        <header className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50">
            <FiCheckCircle className="h-6 w-6 text-emerald-600" />
          </div>

          <h1 className="mt-4 text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
            Thank you for your order!
          </h1>

          <p className="mt-2 text-xs leading-5 text-gray-500 sm:text-sm">
            Your payment was successful. We've received your order
            and will keep you updated on its progress.
          </p>

          <p className="mt-3 text-xs text-gray-500">
            Order number:{" "}
            <span className="font-semibold text-gray-900">
              {order.id}
            </span>
          </p>

          <p className="mt-1 text-[11px] text-gray-400">
            Placed on {order.date}
          </p>
        </header>

        {/* Receipt */}
        <section className="mt-8 overflow-hidden rounded-xl border border-gray-200 bg-white sm:mt-10">

          {/* Order items */}
          <div className="p-4 sm:p-6">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
              <FiPackage className="h-4 w-4 text-gray-500" />
              <h2 className="text-sm font-semibold text-gray-900">
                Order details
              </h2>
            </div>

            <div className="divide-y divide-gray-100">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between gap-4 py-4"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-gray-900 sm:text-sm">
                      {item.name}
                    </p>
                    <p className="mt-1 text-[11px] text-gray-500 sm:text-xs">
                      {item.variant}
                    </p>
                    <p className="mt-1 text-[11px] text-gray-500 sm:text-xs">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="shrink-0 text-xs font-medium text-gray-900 sm:text-sm">
                    {money(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            {/* Price breakdown */}
            <div className="space-y-3 border-t border-gray-100 pt-4">
              <div className="flex justify-between gap-4 text-xs text-gray-500">
                <span>Subtotal</span>
                <span className="text-gray-800">
                  {money(order.subtotal)}
                </span>
              </div>

              <div className="flex justify-between gap-4 text-xs text-gray-500">
                <span>Shipping</span>
                <span className="text-emerald-600">
                  {order.shipping === 0 ? "Free" : money(order.shipping)}
                </span>
              </div>

              <div className="flex justify-between gap-4 border-t border-gray-100 pt-3">
                <span className="text-sm font-semibold text-gray-900">
                  Total paid
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  {money(order.total)}
                </span>
              </div>
            </div>
          </div>

          {/* Delivery and payment */}
          <div className="grid grid-cols-1 border-t border-gray-200 bg-gray-50/70 sm:grid-cols-2">

            <div className="p-4 sm:p-6">
              <div className="flex items-center gap-2">
                <FiMapPin className="h-4 w-4 text-gray-500" />
                <h2 className="text-xs font-semibold text-gray-900">
                  Shipping address
                </h2>
              </div>

              <p className="mt-3 text-xs font-medium text-gray-800">
                {order.shippingAddress.name}
              </p>
              <p className="mt-1 text-xs leading-5 text-gray-500">
                {order.shippingAddress.address}
              </p>

              <p className="mt-3 text-[11px] text-gray-500">
                Estimated delivery: {order.deliveryEstimate}
              </p>
            </div>

            <div className="border-t border-gray-200 p-4 sm:border-l sm:border-t-0 sm:p-6">
              <div className="flex items-center gap-2">
                <FiCreditCard className="h-4 w-4 text-gray-500" />
                <h2 className="text-xs font-semibold text-gray-900">
                  Payment information
                </h2>
              </div>

              <p className="mt-3 text-xs text-gray-600">
                {order.paymentMethod}
              </p>

              <span className="mt-2 inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                {order.paymentStatus}
              </span>
            </div>
          </div>
        </section>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/orders"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-gray-900 px-6 py-3 text-xs font-medium text-white transition hover:bg-gray-700 sm:text-[13px]"
          >
            View my orders
            <FiArrowRight className="h-4 w-4" />
          </Link>

          <Link
            to="/"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-6 py-3 text-xs font-medium text-gray-700 transition hover:bg-gray-50 sm:text-[13px]"
          >
            <FiShoppingBag className="h-4 w-4" />
            Continue shopping
          </Link>
        </div>

        <p className="mt-5 text-center text-[11px] leading-5 text-gray-400">
          Keep your order number for future reference.
        </p>
      </div>
    </main>
  );
};

export default Success;
