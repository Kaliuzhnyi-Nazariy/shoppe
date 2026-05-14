import Filters from "../components/Blog/Filters";
import PostsList from "../components/Blog/PostsList";
import Section from "../components/Section";

const Blog = () => {
  return (
    <Section extraStyles="mt-6 text-xs mb-24 ">
      <h3 className="text-xl font-semibold lg:text-[32px]">Blog</h3>
      <div className="mt-10 lg:flex lg:gap-10">
        <Filters />
        <PostsList />
      </div>
    </Section>
  );
};

export default Blog;
