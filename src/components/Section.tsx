const Section = ({
  children,
  extraStyles = "",
  changePaddings = "",
}: {
  children: React.ReactNode;
  extraStyles?: string;
  changePaddings?: string;
}) => {
  return (
    <section
      className={
        `px-4 flex flex-col flex-1 ${
          changePaddings ? changePaddings : "min-[1440px]:p-20 "
        } ` +
        // `px-4 ${changePaddings ? changePaddings : "min-[1440px]:p-24"} ` +
        extraStyles
      }
    >
      {children}
    </section>
  );
};

export default Section;
