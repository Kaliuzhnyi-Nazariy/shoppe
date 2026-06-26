import { useNavigate } from "react-router";
import Section from "../../components/Section";
import StyledButton from "../../components/StyledButton";

const Failed = () => {
  const navigate = useNavigate();

  return (
    <Section extraStyles="flex flex-col items-center justify-center flex-1 bg-(--gray) md:bg-white">
      <div className="w-70 p-4 flex flex-col items-center justify-center gap-4 bg-white rounded-sm md:w-3/5 md:h-full">
        <h1>Payment failed!</h1>
        <p>Don't worry! Try one more time!</p>
        <StyledButton
          text="Back to checkout"
          fn={() => navigate("/checkout")}
        />
      </div>
    </Section>
  );
};

export default Failed;
