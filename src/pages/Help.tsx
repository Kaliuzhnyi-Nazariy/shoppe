import { FileCheckCorner, Lock, Package, RotateCcw } from "lucide-react";
import Section from "../components/Section";
import { Link, useNavigate } from "react-router";
import StyledButton from "../components/StyledButton";

const LinkComponent = ({
  link,
  icon: Icon,
  text,
}: {
  link: string;
  icon: React.ElementType;
  text: string;
}) => {
  return (
    <Link
      to={link}
      className="flex items-center gap-4 w-screen py-5 hover:bg-(--light-gray) focus:bg-(--light-gray) border-b border-b-(--light-gray) hover:-mx-4 focus:-mx-4 hover:px-4 focus:px-4"
    >
      <Icon className="size-4" />
      <p>{text}</p>
    </Link>
  );
};

const Help = () => {
  const navigate = useNavigate();

  const redirect = () => {
    navigate("/");
  };

  return (
    <Section extraStyles="mt-6 mb-24 text-xs">
      <h3 className="text-xl">Help</h3>
      <ul className="mt-9">
        <li className="">
          <LinkComponent
            link="/"
            icon={FileCheckCorner}
            text="Terms of Service"
          />
        </li>
        <li>
          <LinkComponent link="/" icon={Package} text="Shipping" />
        </li>
        <li>
          <LinkComponent link="/" icon={Lock} text="Privacy Policy" />
        </li>
        <li>
          <LinkComponent link="/" icon={RotateCcw} text="Retun & Exchanges" />
        </li>
      </ul>
      <StyledButton
        text="Contact"
        extraStyles="mt-10 w-full py-1.5"
        btnType="button"
        type="secondary"
        fn={redirect}
      />
    </Section>
  );
};

export default Help;
