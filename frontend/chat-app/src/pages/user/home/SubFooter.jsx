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
            px-2
            sm:px-4
            md:px-6
            lg:px-10
            py-6
            sm:py-7
            md:py-8
            lg:py-10
          "
        >
          {/* ================= CONTENT ================= */}
          <div
            className="
              grid
              grid-cols-[max-content_minmax(0,1fr)_auto]
              items-center
              gap-2
              sm:gap-4
              md:gap-6
              lg:gap-8
            "
          >
            {/* ================= TITLE ================= */}
            <div className="min-w-0">
              <h2
                className="
                  text-[8px]
                  sm:text-[9px]
                  md:text-xs
                  lg:text-sm
                  font-light
                  tracking-wide
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
                  max-w-[240px]
                  text-[8px]
                  sm:text-[9px]
                  md:text-xs
                  lg:text-sm
                  leading-[1.35]
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
                min-w-0
                gap-1
                sm:gap-1.5
              "
            >
              {/* ================= EMAIL ================= */}
              <InputField
                type="email"
                value={email}
                handleChange={(e) => setEmail(e.target.value)}
                placeholder="Email..."
                disabled={isSubscribed}
                className={`
                  w-[70px]
                  sm:w-[90px]
                  md:w-[120px]
                  lg:w-[170px]

                  min-w-0

                  !h-[28px]
                  sm:!h-[30px]

                  !min-h-0

                  !px-1.5
                  sm:!px-2

                  !py-0

                  !text-[8px]
                  sm:!text-[9px]
                  md:!text-[10px]
                  lg:!text-xs

                  !leading-none

                  ${
                    isDark
                      ? "bg-gray-900 text-white border-gray-700"
                      : "bg-[#f5f5f5] text-black"
                  }
                `}
              />

              {/* ================= SUBSCRIBE ================= */}
              <Button
                type="submit"
                label={isSubscribed ? "Subscribed" : "Subscribe"}
                variant="danger"
                disabled={isSubscribed}
                className="
                  !w-auto

                  !min-w-[58px]
                  sm:!min-w-[68px]
                  md:!min-w-[78px]
                  lg:!min-w-[90px]

                  !h-[28px]
                  sm:!h-[30px]

                  !min-h-0

                  !px-1.5
                  sm:!px-2
                  md:!px-2.5

                  !py-0
                  !mt-0
                  !ml-0

                  !text-[8px]
                  sm:!text-[9px]
                  md:!text-[10px]
                  lg:!text-xs

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