import { ArrowRight, Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="pb-7 px-4 min-[1440px]:px-24 text-(--dark-gray) lg:border-t lg:border-t-(--light-gray) lg:pt-13 lg:text-black ">
      <div className="lg:flex lg:flex-row-reverse lg:items-center lg:justify-between">
        <label className="border-b w-full flex items-center lg:w-99">
          <input
            className="flex-1 outline-none border-none placeholder:text-(--dark-gray) text-[14px] py-2 "
            placeholder="Give an email, get the newsletter."
          />
          <ArrowRight className="h-4 w-4" />
        </label>
        <label
          htmlFor="terms"
          className="flex items-center gap-1 text-[12px] mt-3 lg:hidden"
        >
          <input type="checkbox" name="" id="terms" />
          <p className="text-black">
            I agree to the website’s terms and conditions
          </p>
        </label>

        <ul className="mt-10 lg:mt-0 lg:flex lg:items-center lg:gap-10">
          <li>
            <Link to="/contact">CONTACT</Link>
          </li>
          <li>
            <Link to="/terms">TERMS OF SERVICES</Link>
          </li>
          <li>SHIPPING AND RETURNS</li>
        </ul>
      </div>

      <div className="mt-8 flex flex-col gap-9 lg:flex-row-reverse lg:items-center lg:justify-between lg:text-[16px]">
        <div className="flex items-center">
          <p className="text-black lg:hidden">Follow us</p>
          <div className="h-px w-12 bg-black ml-4 lg:hidden"></div>
          <ul className="flex gap-4 ml-2 lg:gap-7.5">
            <li>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                className="hover:text-black focus:text-black transition-colors"
              >
                <Facebook className="size-3 lg:size-4.5" />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                className="hover:text-black focus:text-black transition-colors"
              >
                <Instagram className="size-3 lg:size-4.5" />
              </a>
            </li>
            <li>
              <a
                href="https://x.com/"
                target="_blank"
                className="hover:text-black focus:text-black transition-colors"
              >
                <Twitter className="size-3 lg:size-4.5" />
              </a>
            </li>
          </ul>
        </div>

        <p className="text-[12px] text-gray">
          &copy; 2020 Shelly.{" "}
          <Link to="/terms" className="text-(--dark-gray)">
            Terms of use
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-(--dark-gray)">
            privacy policy.
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
