import { ArrowRight, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="pb-7">
      <div className="">
        <label
          htmlFor=""
          className="border-b w-full grid grid-cols-[1fr_auto]  items-center py-2"
        >
          <input
            type="text"
            className="outline-none border-none"
            placeholder="Give an email, get the newsletter."
          />
          <ArrowRight className="size-4 " />
        </label>
        <label
          htmlFor="terms"
          className="flex items-center gap-1 text-[12px] mt-3"
        >
          <input type="checkbox" name="" id="terms" />
          <p>I agree to the website’s terms and conditions</p>
        </label>
      </div>
      <div className="mt-10">
        <ul>
          <li>CONTACT</li>
          <li>TERMS OF SERVICES</li>
          <li>SHIPPING AND RETURNS</li>
        </ul>

        <div className="mt-8 flex items-center">
          <p>Follow</p>
          <div className="h-px w-12 bg-black ml-4"></div>
          <ul className="flex gap-4 ml-2">
            <li>
              <a href="https://www.facebook.com/" target="_blank">
                <Facebook className="size-3" />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/" target="_blank">
                <Instagram className="size-3" />
              </a>
            </li>
            <li>
              <a href="https://x.com/" target="_blank">
                <Twitter className="size-3" />
              </a>
            </li>
          </ul>
        </div>

        <p className="text-[12px] text-gray mt-9">
          &copy; 2020 Shelly. Terms of use and privacy policy.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
