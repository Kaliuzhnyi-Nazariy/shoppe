import { useSearchParams } from "react-router";
import Preview from "./Preview";

const PostsList = () => {
  const [params] = useSearchParams();

  const chosenCategory = params.get("category");
  const search = params.get("searchBlog");

  const posts: {
    category: string;
    date: string;
    title: string;
    article: string;
    id: string;
  }[] = [
    {
      category: "fashion",
      date: "October 8, 2020",
      title: "Top Trends From Spring",
      article: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni delectus a quod necessitatibus quam, eligendi odit commodi laborum, minus architecto nam asperiores error itaque blanditiis ullam vel provident. Natus, delectus!`,
      id: "1",
    },
    {
      category: "season",
      date: "October 8, 2020",
      title: "Top Trends From Spring",
      article: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni delectus a quod necessitatibus quam, eligendi odit commodi laborum, minus architecto nam asperiores error itaque blanditiis ullam vel provident. Natus, delectus!`,
      id: "2",
    },
    {
      category: "style",
      date: "October 8, 2020",
      title: "Top Trends From Spring",
      article: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni delectus a quod necessitatibus quam, eligendi odit commodi laborum, minus architecto nam asperiores error itaque blanditiis ullam vel provident. Natus, delectus!`,
      id: "3",
    },
  ];

  let filteredPosts;

  if (chosenCategory) {
    if (search) {
      filteredPosts = posts.filter(
        (p) =>
          p.category === chosenCategory &&
          (p.title.includes(search) || p.article.includes(search)),
      );
    } else {
      filteredPosts = posts.filter((p) => p.category === chosenCategory);
    }
  } else {
    if (search) {
      filteredPosts = posts.filter(
        (p) => p.title.includes(search) || p.article.includes(search),
      );
    } else {
      filteredPosts = posts;
    }
  }

  return (
    <>
      {filteredPosts.length > 0 ? (
        <ul className="flex flex-col gap-10 lg:grid lg:grid-cols-2 lg:gap-x-12 lg:gap-y-16">
          {filteredPosts.map((p) => {
            return (
              <Preview
                id={p.id}
                article={p.article}
                category={p.category}
                date={p.date}
                title={p.title}
                key={p.id}
              />
            );
          })}
        </ul>
      ) : (
        <div className="flex-1 flex grow text-center items-center justify-center">
          <p>No blog post found</p>
        </div>
      )}
    </>
  );
};

export default PostsList;
