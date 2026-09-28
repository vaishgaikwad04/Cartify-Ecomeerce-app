
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

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (isSubscribed) return;

    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    // Validate email
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubscribed(true);
    toast.success("Subscribed successfully!");
    setEmail("");
  };

  return (
    <div>
      {/* ================= NEWSLETTER ================= */}
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
            max-w-[1800px]
            mx-auto

            px-3
            sm:px-5
            md:px-8
            lg:px-12
            xl:px-16

            py-6
            sm:py-7
            md:py-8
            lg:py-10
            xl:py-11
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
              xl:gap-x-16
            "
          >
            {/* ================= TITLE ================= */}
            <div className="min-w-0">
              <h2
                className="
                  text-[11px]
                  sm:text-xs
                  md:text-sm
                  lg:text-base
                  xl:text-lg

                  font-medium
                  tracking-[0.12em]

                  whitespace-nowrap
                "
              >
                NEWSLETTER
              </h2>
            </div>

            {/* ================= DESCRIPTION ================= */}
            <div className="min-w-0">
              <p
                className={`
                  w-full

                  max-w-[260px]
                  sm:max-w-[320px]
                  md:max-w-[400px]
                  lg:max-w-[460px]
                  xl:max-w-[520px]

                  text-[10px]
                  sm:text-[11px]
                  md:text-xs
                  lg:text-sm
                  xl:text-base

                  leading-relaxed

                  ${isDark ? "text-gray-300" : "text-gray-200"}
                `}
              >
                Subscribe to the weekly newsletter for all the latest updates
              </p>
            </div>

            {/* ================= FORM ================= */}
            <form
              onSubmit={handleSubscribe}
              className="
                flex
                items-center

                w-full
                sm:w-auto

                min-w-0

                gap-2
                sm:gap-2.5
                md:gap-3
              "
            >
              <InputField
                type="email"
                value={email}
                handleChange={(e) => setEmail(e.target.value)}
                placeholder="Email address..."
                disabled={isSubscribed}
                className={`
                  w-full
                  sm:w-[180px]
                  md:w-[210px]
                  lg:w-[230px]
                  xl:w-[260px]

                  min-w-0

                  !h-[34px]
                  sm:!h-[36px]
                  md:!h-[38px]
                  lg:!h-[40px]

                  !min-h-0

                  !px-2.5
                  sm:!px-3
                  md:!px-3.5

                  !py-0

                  !text-[10px]
                  sm:!text-[11px]
                  md:!text-xs
                  lg:!text-sm

                  !leading-none

                  ${
                    isDark
                      ? "bg-gray-900 text-white border-gray-700"
                      : "bg-[#f5f5f5] text-black"
                  }
                `}
              />

              <Button
                type="submit"
                label={isSubscribed ? "Subscribed" : "Subscribe"}
                variant="danger"
                disabled={isSubscribed}
                className="
                  !w-auto

                  !min-w-[72px]
                  sm:!min-w-[82px]
                  md:!min-w-[92px]
                  lg:!min-w-[100px]
                  xl:!min-w-[110px]

                  !h-[34px]
                  sm:!h-[36px]
                  md:!h-[38px]
                  lg:!h-[40px]

                  !min-h-0

                  !px-2
                  sm:!px-2.5
                  md:!px-3
                  lg:!px-3.5

                  !py-0

                  !mt-0
                  !ml-0

                  !text-[9px]
                  sm:!text-[10px]
                  md:!text-xs
                  lg:!text-sm

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