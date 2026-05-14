import Preview from "./Preview";

const PostsList = () => {
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
      category: "fashion",
      date: "October 8, 2020",
      title: "Top Trends From Spring",
      article: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni delectus a quod necessitatibus quam, eligendi odit commodi laborum, minus architecto nam asperiores error itaque blanditiis ullam vel provident. Natus, delectus!`,
      id: "2",
    },
    {
      category: "fashion",
      date: "October 8, 2020",
      title: "Top Trends From Spring",
      article: `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni delectus a quod necessitatibus quam, eligendi odit commodi laborum, minus architecto nam asperiores error itaque blanditiis ullam vel provident. Natus, delectus!`,
      id: "3",
    },
  ];

  return (
    <ul className="flex flex-col gap-10 lg:grid lg:grid-cols-2 lg:gap-x-12 lg:gap-y-16">
      {posts.map((p) => {
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
  );
};

export default PostsList;
