import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import InputField from "../../../components/ui/InputField";
import { ThemeContext } from "../../../context/ThemeContext";
import toast from "react-hot-toast";

const SubFooter = () => {
  const navigate = useNavigate();
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
      {/* BRANDS */}

      {/* ...your existing brands section... */}

      {/* NEWSLETTER */}
      <section
        className={`
          transition-colors duration-300
          ${isDark ? "bg-black text-white" : "bg-[#1f1f21] text-white"}
        `}
      >
        <div className="max-w-[1800px] mx-auto px-8 py-24">
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-10 items-center">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-light tracking-wide">
              NEWSLETTER
            </h2>

            <p
              className={`
                w-[200px]
                whitespace-normal
                break-words
                text-base
                leading-7
                ${isDark ? "text-gray-300" : "text-gray-200"}
              `}
            >
              Subscribe to the weekly newsletter for all the latest updates
            </p>

            <form
              onSubmit={handleSubscribe}
              className="flex flex-col md:flex-row h-auto md:h-[60px] w-full max-w-md shrink-1"
            >
              <InputField
                type="email"
                value={email}
                handleChange={(e) => setEmail(e.target.value)}
                placeholder="Email..."
                disabled={isSubscribed}
                className={`
                  flex-1 px-6 outline-none
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
                className="mt-1 ml-1"
              />
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubFooter;
