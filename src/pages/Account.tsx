import AccountAuth from "../components/Account/AccountAuth";
import Section from "../components/Section";

const Account = () => {
  return (
    <Section extraStyles="mt-6 flex flex-col items-center mb-20.5">
      <h3 className="text-xl font-semibold lg:text-[33px]">My account</h3>

      <AccountAuth />
    </Section>
  );
};

export default Account;
