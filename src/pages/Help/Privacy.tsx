import Section from "../../components/Section";

const Privacy = () => {
  return (
    <Section
      extraStyles="mt-6 lg:mt-0 text-xs mb-24 lg:text-[16px]"
      changePaddings="lg:pt-24 lg:px-24"
    >
      <div className="lg:w-2xl lg:mx-auto">
        <h3 className="text-xl lg:text-center lg:text-[32px] lg:font-semibold">
          Privacy Policy
        </h3>
        <article className="mt-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
          placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a
          maximus elit ex vitae libero. Sed quis mauris eget arcu facilisis
          consequat sed eu felis. Nunc sed porta augue. Morbi porta tempor odio,
          in molestie diam bibendum sed.
        </article>

        <h5 className="mt-6 text-[16px] lg:text-2xl lg:mt-10">Security</h5>
        <article className="mt-3 lg:mt-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
          placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a
          maximus elit ex vitae libero. Sed quis mauris eget .
        </article>

        <h5 className="mt-6 text-[16px] lg:text-2xl lg:mt-10">Cookies</h5>
        <ul className="list-disc list-inside pl-2.5 mt-3 lg:mt-6">
          <li>
            Duis rutrum dictum libero quis rutrum. Etiam sed neque aliquam,
            sollicitudin ante a, gravida arcume
          </li>
          <li>
            Nam fringilla molestie velit, eget pellentesque risus scelerisque
          </li>
        </ul>
      </div>
    </Section>
  );
};

export default Privacy;
