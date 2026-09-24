
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
    if (!/\S+@\S+\.\S+/.test(email)) {
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

            px-4
            sm:px-6
            md:px-8
            lg:px-10

            py-7
            sm:py-8
            md:py-10
            lg:py-12
          "
        >
          {/* ================= CONTENT ================= */}
          <div
            className="
              grid
              grid-cols-3
              items-center

              gap-3
              sm:gap-4
              md:gap-6
              lg:gap-8
            "
          >
            {/* ================= TITLE ================= */}
            <div className="min-w-0">
              <h2
                className="
                  text-[10px]
                  sm:text-xs
                  md:text-sm
                  lg:text-lg

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

                  text-[9px]
                  sm:text-[10px]
                  md:text-xs
                  lg:text-sm

                  leading-relaxed

                  ${
                    isDark
                      ? "text-gray-300"
                      : "text-gray-200"
                  }
                `}
              >
                Subscribe to the weekly newsletter for all the latest
                updates
              </p>
            </div>

            {/* ================= FORM ================= */}
            <form
              onSubmit={handleSubscribe}
              className="
                flex
                flex-row
                items-center

                w-full
                min-w-0
                max-w-[390px]

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
                  w-full
                  min-w-0

                  !h-[30px]
                  !min-h-[30px]

                  !px-2
                  !py-0

                  !text-[9px]
                  sm:!text-[10px]
                  md:!text-[11px]

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
                  !min-w-[65px]
                  sm:!min-w-[75px]

                  !h-[30px]
                  !min-h-[30px]

                  !px-2
                  sm:!px-2.5

                  !py-0

                  !mt-0
                  !ml-0

                  !text-[9px]
                  sm:!text-[10px]
                  md:!text-[11px]

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
