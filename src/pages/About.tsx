import Section from "../components/Section";

const About = () => {
  return (
    <Section
      extraStyles="mt-6 lg:mt-0 text-xs mb-24 lg:text-[16px]"
      changePaddings="lg:pt-24 lg:px-24"
    >
      <div className="lg:w-2xl lg:mx-auto">
        <h3 className="text-xl lg:text-center lg:text-[32px] lg:font-semibold">
          About
        </h3>
        <p className="hidden lg:block text-center mt-6 text-lg">
          Who we are and why we do what we do!
        </p>
        <article className="mt-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
          placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a
          maximus elit ex vitae libero. Sed quis mauris eget
        </article>
        <h5 className="mt-6 text-[16px] lg:text-2xl lg:mt-10">Top trends</h5>
        {/* <img /> */}
        <div className="h-50 w-full rounded-lg bg-(--accent) mt-3 lg:h-75 lg:mt-6 "></div>
        <article className="mt-4 lg:mt-12">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
          placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a
          maximus elit ex vitae libero. Sed quis mauris eget.
        </article>
        <article className="mt-4 lg:mt-6 lg:hidden">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
          placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a
          maximus elit ex vitae libero. Sed quis mauris eget.
        </article>
        <ul className="hidden lg:block list-disc list-inside pl-4 mt-4">
          <li>consectetur adipiscing elit. Aliquam placerat</li>
          <li>Lorem ipsum dolor sit amet consectetur</li>
        </ul>
        <h5 className="mt-6 text-[16px] lg:text-2xl lg:mt-10">
          Produced with care
        </h5>
        {/* <img /> */}
        <div className="h-50 w-full rounded-lg bg-(--accent) mt-3 lg:h-75 lg:mt-6"></div>
        <article className="mt-4 lg:mt-12">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
          placerat, augue a volutpat hendrerit, sapien tortor faucibus augue, a
          maximus elit ex vitae libero. Sed quis mauris eget.
        </article>{" "}
      </div>
    </Section>
  );
};

export default About;
