import { useSelector } from "react-redux";
import DetailsForm from "../../components/Dashboard/DetailsForm";
import { userPasswordSet } from "../../../features/user/selectors";
import SetPasswordBlock from "./SetPasswordBlock";

const AccountDetails = () => {
  const isUserPasswordSet = useSelector(userPasswordSet);
  return <>{!isUserPasswordSet ? <SetPasswordBlock /> : <DetailsForm />}</>;
};

export default AccountDetails;
