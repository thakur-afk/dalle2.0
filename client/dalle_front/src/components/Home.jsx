import { useEffect, useState } from "react";
import FormField from "./FormField";
import Card from "./Card";
import Loader from "./Loader";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }
  return (
    <h2 className=" mt-5 font-bold text-[#6449ff] text-xl uppercase">
      {title}
    </h2>
  );
};

const Home = () => {
  const [allPosts, setAllPosts] = useState();
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState(null);

  const handleChange = (e) => {
    setSearchText(e.target.value);

    setTimeout(() => {
      const searchResults = allPosts.filter(
        (item) =>
          item.name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.prompt.toLowerCase().includes(searchText.toLowerCase())
      );
      setSearchedResults(searchResults);
    }, 500);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/api/v1/post", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <div className=" flex flex-col gap-2">
        <h1 className=" md:text-5xl  text-xl font-bold">
          The Community Showcase
        </h1>
        <p className="text-[#666e75] md:text-lg text-sm">
          Browse Through a collection of imaginative and visually stunning
          images by DALL-E AI.
        </p>
      </div>
      <div className="mt-4">
        <FormField
          type={"text"}
          name={"search"}
          placeholder={"Search Posts"}
          labelName={"Search Posts"}
          value={searchText}
          handleChange={handleChange}
        />
      </div>
      <div className="mt-4">
        {loading ? (
          <div className=" flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className=" font-medium text-[#666e75] text-xl mb-3">
                Showing result for{" "}
                <span className="text-[#222328]">{searchText}</span>
              </h2>
            )}
            <div className=" grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-1">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title={"No search Results found"}
                />
              ) : (
                <RenderCards data={allPosts} title={"No posts found"} />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
