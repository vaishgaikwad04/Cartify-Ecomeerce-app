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
          <div
            className="
              grid
              grid-cols-3
              md:grid-cols-3

              items-center

              gap-4
              sm:gap-5
              md:gap-6
              lg:gap-8
            "
          >
            {/* ================= TITLE ================= */}
            <div>
              <h2
                className="
                  text-xs
                  sm:text-sm
                  md:text-md
                  lg:text-lg

                  font-light
                  tracking-wide
                "
              >
                NEWSLETTER
              </h2>
            </div>

            {/* ================= DESCRIPTION ================= */}
            <div>
              <p
                className={`
                  max-w-[240px]

                  text-xs
                  sm:text-xs
                  md:text-sm

                  leading-5
                  sm:leading-5

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
    flex-col
    sm:flex-row
    items-stretch
    w-full
    max-w-[390px]
  "
            >
              {/* EMAIL */}
              <InputField
                type="email"
                value={email}
                handleChange={(e) => setEmail(e.target.value)}
                placeholder="Email..."
                disabled={isSubscribed}
                className={`
      !h-[30px]
      !min-h-[30px]
      !px-2
      !py-0
      !text-[11px]
      !leading-none

      ${
        isDark
          ? "bg-gray-900 text-white border-gray-700"
          : "bg-[#f5f5f5] text-black"
      }
    `}
              />

              {/* SUBSCRIBE */}
              <Button
                type="submit"
                label={isSubscribed ? "Subscribed" : "Subscribe"}
                variant="danger"
                disabled={isSubscribed}
                className="
      !w-full
      sm:!w-auto

      !min-w-[75px]
      !h-[30px]
      !min-h-[30px]

      !px-2
      !py-0
      !mt-0
      !ml-0
      sm:!ml-1

      !text-[10px]
      sm:!text-[11px]
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
