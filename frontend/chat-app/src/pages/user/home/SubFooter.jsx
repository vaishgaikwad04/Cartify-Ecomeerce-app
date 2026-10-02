import React, { useContext, useState } from "react";

import Button from "../../../components/ui/Button";
import InputField from "../../../components/ui/InputField";

import { ThemeContext } from "../../../context/ThemeContext";

import toast from "react-hot-toast";

const SubFooter = () => {
  const { theme } = useContext(ThemeContext);

  const isDark = theme === "Dark Mode";

  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  // ================= SUBSCRIBE =================
  const handleSubscribe = (e) => {
    e.preventDefault();

    // Prevent submitting again
    if (isSubscribed) return;

    // Empty email
    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    // Validate email
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubscribed(true);
    setEmail("");

    toast.success("Subscribed successfully!");
  };

  return (
    <div>
      {/* =====================================================
          NEWSLETTER
      ===================================================== */}
      <section
        className={`
          w-full
          transition-colors
          duration-300
          ${isDark ? "bg-black text-white" : "bg-[#1f1f21] text-white"}
        `}
      >
        <div
          className="
            w-full
            max-w-[1700px]
            mx-auto

            px-4
            sm:px-5
            md:px-6
            lg:px-8
            xl:px-10

            py-6
            sm:py-7
            md:py-7
            lg:py-8
            xl:py-8
          "
        >
          <div
            className="
              grid

              grid-cols-1
              sm:grid-cols-[auto_1fr]
              lg:grid-cols-[auto_minmax(220px,1fr)_auto]

              items-center

              gap-4
              sm:gap-x-8
              sm:gap-y-4
              md:gap-x-10
              lg:gap-x-12
              xl:gap-x-14
            "
          >
            {/* =================================================
                TITLE
            ================================================= */}
            <div className="min-w-0">
              <h2
                className="
                  text-[11px]
                  sm:text-xs
                  md:text-xs
                  lg:text-sm
                  xl:text-sm

                  font-medium
                  tracking-[0.12em]

                  whitespace-nowrap
                "
              >
                NEWSLETTER
              </h2>
            </div>

            {/* =================================================
                DESCRIPTION
            ================================================= */}
            <div className="min-w-0">
              <p
                className={`
                  w-full

                  max-w-[280px]
                  sm:max-w-[320px]
                  md:max-w-[380px]
                  lg:max-w-[420px]
                  xl:max-w-[460px]

                  text-[10px]
                  sm:text-[11px]
                  md:text-[11px]
                  lg:text-xs
                  xl:text-xs

                  leading-relaxed

                  ${isDark ? "text-gray-300" : "text-gray-200"}
                `}
              >
                Subscribe to the weekly newsletter for all the latest updates
              </p>
            </div>

            {/* =================================================
                SUBSCRIBE FORM
            ================================================= */}
            <form
              onSubmit={handleSubscribe}
              className="
                flex
                items-center

                w-full
                sm:w-auto

                min-w-0

                gap-1
                sm:gap-1
                md:gap-1
              "
            >
              {/* EMAIL INPUT */}
              <InputField
                type="email"
                value={email}
                handleChange={(e) => setEmail(e.target.value)}
                placeholder="Email address..."
                disabled={isSubscribed}
                className={`
                  w-full

                  sm:w-[180px]
                  md:w-[195px]
                  lg:w-[210px]
                  xl:w-[220px]

                  min-w-0

                  !h-[34px]
                  sm:!h-[35px]
                  md:!h-[36px]
                  lg:!h-[36px]
                  xl:!h-[36px]

                  !min-h-0

                  !px-2.5
                  sm:!px-3
                  md:!px-3

                  !py-0

                  !text-[10px]
                  sm:!text-[10px]
                  md:!text-[11px]
                  lg:!text-[11px]
                  xl:!text-[11px]

                  !leading-none

                  ${
                    isDark
                      ? "bg-gray-900 text-white border-gray-700"
                      : "bg-[#f5f5f5] text-black border-gray-300"
                  }
                `}
              />

              {/* SUBSCRIBE BUTTON */}
              <Button
                type="submit"
                label={isSubscribed ? "Subscribed" : "Subscribe"}
                variant="danger"
                disabled={isSubscribed}
                className="
                  !w-auto

                  !min-w-[75px]
                  sm:!min-w-[80px]
                  md:!min-w-[85px]
                  lg:!min-w-[88px]
                  xl:!min-w-[90px]

                  !h-[34px]
                  sm:!h-[35px]
                  md:!h-[36px]
                  lg:!h-[36px]
                  xl:!h-[36px]

                  !min-h-0

                  !px-2
                  sm:!px-2.5
                  md:!px-2.5

                  !py-0

                  !mt-0
                  !ml-0

                  !text-[9px]
                  sm:!text-[10px]
                  md:!text-[10px]
                  lg:!text-[10px]
                  xl:!text-[10px]

                  whitespace-nowrap
                "
              />
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubFooter;