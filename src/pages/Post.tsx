import { Facebook, Instagram, Twitter } from "lucide-react";
import Section from "../components/Section";
import { useEffect } from "react";

interface Post {
  title: string;
  author: string;
  date: string;
  article: string;
}

const Post = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const post: Post = {
    title: "Fast Fashion, And Faster Fashion",
    author: "ANNY JOHNSON",
    date: "October 8,2020",
    article: `Lorem ipsum dolor sit amet consectetur adipisicing elit.Eveniet, illum ? Animi fugit pariatur quis alias quidem blanditiis minima, magni soluta repudiandae dolor placeat ex nisi ipsum deleniti, in obcaecati ducimus!
    
    Facilis voluptas consequatur placeat! Quibusdam, non tenetur fugit earum quae facilis distinctio error blanditiis dolore, suscipit ex veniam? Voluptatibus, porro molestiae. Sint voluptatum corporis labore quasi eligendi. Quisquam, quod. Asperiores!
`,
  };

  return (
    <Section extraStyles="mt-6 mb-24 text-xs">
      <h3 className="text-xl font-semibold lg:text-[32px] text-center">
        {post.title}
      </h3>
      <p className="mt-2 text-(--dark-gray) text-center">
        by <span className="text-black">{post.author}</span> - {post.date}
      </p>
      <div className="w-full h-48 rounded-lg bg-(--accent) mt-6"></div>
      <article className="whitespace-pre-line mt-4">{post.article}</article>
      <div className="w-full h-48 rounded-lg bg-(--accent) mt-6"></div>
      <h5 className="text-[16px] mt-3">Top trends</h5>
      <p className="mt-3">
        Lorem ipsum dolor sit amet, consectetur adipisce elit. Aliquam placerat,
        augue.
      </p>
      <ul className="mt-4 list-disc list-inside flex flex-col gap-2">
        <li>consectetur adipiscing elit. Aliquam placerat</li>
        <li>Lorem ipsum dolor sit amet consectetur</li>
      </ul>

      <div className="mt-12 flex items-center gap-2">
        <p>Tags</p>
        <span className="w-16 h-px bg-black"></span>
        <p className="text-(--dark-gray)">Fashion, Style, Season</p>
      </div>

      <div className="mt-12 flex items-center gap-2">
        <p>Share</p>
        <span className="w-16 h-px bg-black"></span>
        <ul className="flex items-center gap-3">
          <li>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              className="hover:text-black focus:text-black transition-colors"
            >
              <Facebook className="size-3 lg:size-4.5" />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              className="hover:text-black focus:text-black transition-colors"
            >
              <Instagram className="size-3 lg:size-4.5" />
            </a>
          </li>
          <li>
            <a
              href="https://x.com/"
              target="_blank"
              className="hover:text-black focus:text-black transition-colors"
            >
              <Twitter className="size-3 lg:size-4.5" />
            </a>
          </li>
        </ul>
      </div>
    </Section>
  );
};

export default Post;
