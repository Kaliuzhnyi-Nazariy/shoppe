import Section from "../../components/Section";

const Terms = () => {
  return (
    <Section extraStyles="mb-18">
      <main className="max-w-4xl mx-auto text-black">
        <header className="border-b border-(--gray) pb-6 mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
            TERMS OF SERVICE
          </h1>
          <p className="text-sm text-(--dark-gray) font-medium">
            Last Updated: <time dateTime="2026-09-24">September 24, 2026</time>
          </p>
        </header>

        <div className="mb-10 text-[15px] md:text-[16px] text-(--dark-gray) bg-(--light-gray) p-5 rounded-lg border border-(--gray)">
          <p>
            Welcome to our online store. These Terms of Service govern your use
            of our website and the conditions under which product sales
            contracts are concluded. Please read the following content carefully
            before placing an order. By accessing the site and making purchases,
            you accept these terms and conditions.
          </p>
        </div>

        <div className="space-y-8 text-[15px] md:text-[16px]">
          <section aria-labelledby="sec-provisions">
            <h2
              id="sec-provisions"
              className="text-xl font-bold mb-3 flex items-center gap-2"
            >
              <span
                className="text-(--accent) text-sm font-mono"
                aria-hidden="true"
              >
                01.
              </span>
              General Provisions and Contact Details
            </h2>
            <p className="text-(--dark-gray)">
              The owner and operator of the online store is a business entity
              operating in accordance with applicable laws. Contact details,
              including the email address and telephone number for customer
              service, are permanently available in the contact section on the
              main page of the service.
            </p>
          </section>

          <section aria-labelledby="sec-accounts">
            <h2
              id="sec-accounts"
              className="text-xl font-bold mb-3 flex items-center gap-2"
            >
              <span
                className="text-(--accent) text-sm font-mono"
                aria-hidden="true"
              >
                02.
              </span>
              Terms of Use and User Accounts
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-(--dark-gray)">
              <li>
                To use the store, a device with internet access and a standard
                web browser are required.
              </li>
              <li>
                The user can make a purchase as a guest or by registering an
                account.
              </li>
              <li>The user is obliged to provide true and up-to-date data.</li>
              <li>
                It is prohibited to provide content of an unlawful nature,
                perform actions that could disrupt the functioning of the
                service, or attempt unauthorized access.
              </li>
            </ul>
          </section>

          <section aria-labelledby="sec-orders">
            <h2
              id="sec-orders"
              className="text-xl font-bold mb-3 flex items-center gap-2"
            >
              <span
                className="text-(--accent) text-sm font-mono"
                aria-hidden="true"
              >
                03.
              </span>
              Products, Prices, and Orders
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-(--dark-gray)">
              <li>
                All product information provided on the website constitutes an
                invitation to conclude a contract.
              </li>
              <li>
                Product prices are listed in the applicable currency of the
                sales market and include due taxes, unless stated otherwise.
              </li>
              <li>
                The seller reserves the right to change prices and to introduce
                or cancel promotions, which does not affect orders already
                placed and paid for.
              </li>
              <li>
                An order is considered placed at the moment of clicking the
                purchase confirmation button. The system sends an automatic
                confirmation of order receipt to the specified email address.
              </li>
            </ul>
          </section>

          <section aria-labelledby="sec-payments">
            <h2
              id="sec-payments"
              className="text-xl font-bold mb-3 flex items-center gap-2"
            >
              <span
                className="text-(--accent) text-sm font-mono"
                aria-hidden="true"
              >
                04.
              </span>
              Payment Methods
            </h2>
            <p className="mb-2 text-(--dark-gray)">
              The store supports standard payment methods, including:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-(--dark-gray)">
              <li>Electronic payments and fast online transfers</li>
              <li>Payment cards (Visa, Mastercard)</li>
              <li>Traditional bank transfer</li>
              <li>Cash on delivery</li>
            </ul>
          </section>

          <section aria-labelledby="sec-delivery">
            <h2
              id="sec-delivery"
              className="text-xl font-bold mb-3 flex items-center gap-2"
            >
              <span
                className="text-(--accent) text-sm font-mono"
                aria-hidden="true"
              >
                05.
              </span>
              Delivery and Shipping Costs
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-(--dark-gray)">
              <li>
                Delivery is carried out within the area specified in the order
                form.
              </li>
              <li>
                Delivery options include courier shipments and pickup at
                designated partner locations.
              </li>
              <li>
                Delivery costs and estimated delivery times are indicated each
                time during the checkout process.
              </li>
            </ul>
          </section>

          <section aria-labelledby="sec-returns">
            <h2
              id="sec-returns"
              className="text-xl font-bold mb-3 flex items-center gap-2"
            >
              <span
                className="text-(--accent) text-sm font-mono"
                aria-hidden="true"
              >
                06.
              </span>
              Right of Withdrawal (Returns)
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-(--dark-gray)">
              <li>
                A customer who is a consumer has the right to withdraw from the
                contract without giving any reason within 14 days from the date
                of taking possession of the goods.
              </li>
              <li>
                To exercise this right, the user must inform the seller by
                sending an unequivocal statement by electronic or traditional
                mail.
              </li>
              <li>
                The reimbursement of payments will be made using the same method
                of payment as used by the consumer, within 14 days of receiving
                the statement.{" "}
                <span className="text-(--error) font-medium">
                  The cost of returning the goods is borne by the buyer.
                </span>
              </li>
            </ul>
          </section>

          <section aria-labelledby="sec-complaints">
            <h2
              id="sec-complaints"
              className="text-xl font-bold mb-3 flex items-center gap-2"
            >
              <span
                className="text-(--accent) text-sm font-mono"
                aria-hidden="true"
              >
                07.
              </span>
              Complaints and Warranties
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-(--dark-gray)">
              <li>
                The seller is obliged to deliver a product free of defects.
              </li>
              <li>
                In the event of physical or legal defects in the product, the
                customer has the right to file a complaint regarding the
                non-conformity of the goods with the contract.
              </li>
              <li>
                Complaints should be submitted in writing or by email to the
                official contact address of the store.
              </li>
              <li>
                The seller will consider the complaint within 14 days of its
                receipt.
              </li>
            </ul>
          </section>

          <section aria-labelledby="sec-property">
            <h2
              id="sec-property"
              className="text-xl font-bold mb-3 flex items-center gap-2"
            >
              <span
                className="text-(--accent) text-sm font-mono"
                aria-hidden="true"
              >
                08.
              </span>
              Intellectual Property
            </h2>
            <p className="text-(--dark-gray)">
              All materials, including texts, photos, graphics, logos, and the
              graphic layout of the website, are the property of the company or
              cooperating entities and are protected by copyright law. Copying
              and using them without consent is prohibited.
            </p>
          </section>

          <section aria-labelledby="sec-privacy">
            <h2
              id="sec-privacy"
              className="text-xl font-bold mb-3 flex items-center gap-2"
            >
              <span
                className="text-(--accent) text-sm font-mono"
                aria-hidden="true"
              >
                09.
              </span>
              Privacy Policy
            </h2>
            <p className="text-(--dark-gray)">
              The rules for processing personal data and using cookies are
              detailed in the Privacy Policy document available on the store's
              website.
            </p>
          </section>
        </div>
      </main>
    </Section>
  );
};

export default Terms;
