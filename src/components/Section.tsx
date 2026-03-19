const Section = ({
  children,
  extraStyles = "",
}: {
  children: React.ReactNode;
  extraStyles?: string;
}) => {
  return <section className={"px-4 " + extraStyles}>{children}</section>;
};

export default Section;
