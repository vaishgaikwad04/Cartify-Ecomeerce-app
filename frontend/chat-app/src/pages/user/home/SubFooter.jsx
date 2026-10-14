
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

    if (isSubscribed) return;

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      toast.error("Please enter your email address.");
      return;
    }

    // Validate email
    if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubscribed(true);
    setEmail("");

    toast.success("Subscribed successfully!");
  };

  return (
    <div>
      {/* NEWSLETTER */}
      <section
        className={`
          w-full
          transition-colors duration-300
          ${isDark ? "bg-black text-white" : "bg-[#1f1f21] text-white"}
        `}
      >
        <div
          className="
            w-full max-w-[1700px] mx-auto
            px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10
            py-5 sm:py-6 md:py-6 lg:py-7
          "
        >
          <div
            className="
              grid grid-cols-1
              sm:grid-cols-[auto_minmax(0,1fr)]
              lg:grid-cols-[auto_minmax(220px,1fr)_auto]
              items-center
              gap-x-5 gap-y-4
              sm:gap-x-6 sm:gap-y-4
              md:gap-x-8
              lg:gap-x-8
              xl:gap-x-12
            "
          >
            {/* TITLE */}
            <div className="min-w-0">
              <h2
                className="
                  text-[11px] sm:text-xs lg:text-xs xl:text-sm
                  font-medium tracking-[0.12em]
                  whitespace-nowrap
                "
              >
                NEWSLETTER
              </h2>
            </div>

            {/* DESCRIPTION */}
            <div className="min-w-0">
              <p
                className={`
                  w-full max-w-none lg:max-w-[380px] xl:max-w-[440px]
                  text-[10px] sm:text-[11px] lg:text-xs
                  leading-relaxed
                  ${isDark ? "text-gray-300" : "text-gray-200"}
                `}
              >
                Subscribe to the weekly newsletter for all the latest updates
              </p>
            </div>

            {/* SUBSCRIBE FORM */}
            <form
              onSubmit={handleSubscribe}
              className="
                flex items-center
                w-full min-w-0 gap-1
                sm:col-span-2 sm:justify-self-center sm:w-auto
                lg:col-span-1 lg:justify-self-end
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
                  w-full min-w-0
                  sm:w-[190px]
                  md:w-[220px]
                  lg:w-[190px]
                  xl:w-[220px]
                  !h-[34px] sm:!h-[35px] lg:!h-[36px]
                  !min-h-0
                  !px-2 sm:!px-2.5
                  !py-0
                  !text-[10px] sm:!text-[11px]
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
                  !min-w-[75px] sm:!min-w-[82px] lg:!min-w-[82px] xl:!min-w-[90px]
                  !h-[34px] sm:!h-[35px] lg:!h-[36px]
                  !min-h-0
                  !px-2 sm:!px-2.5
                  !py-0
                  !mt-0 !ml-0
                  !text-[9px] sm:!text-[10px]
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
`