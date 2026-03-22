import { useSelector } from "react-redux";
import { userFirstName, userLastName } from "../../../features/user/selectors";
import { Link } from "react-router";

const Dashboard = () => {
  const userFirstNameValue = useSelector(userFirstName);
  const userLastNameValue = useSelector(userLastName);

  return (
    <>
      <p>
        Hello, {userFirstNameValue} {userLastNameValue && userLastNameValue}
      </p>
      <article className="mt-2">
        From your account dashboard you can view your{" "}
        <Link to="/account/dashboard/orders" className="text-(--accent)">
          recent orders
        </Link>
        , manage your{" "}
        <Link to="/account/dashboard/addresses" className="text-(--accent)">
          shipping and billing addresses
        </Link>
        , and edit your{" "}
        <Link to="/account/dashboard/details" className="text-(--accent)">
          password and account details.
        </Link>
      </article>
    </>
  );
};

export default Dashboard;
