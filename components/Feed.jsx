"use client";

import { useState, useEffect } from "react";

import PromptCard from "@components/PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState(posts);

  const handleSearchChange = (e) => {
    const lowerSearchText = e.target.value?.toLowerCase();
    setSearchText(lowerSearchText);
    const filtering = posts.filter((post) => {
      return post.creator?.username?.toLowerCase().includes(searchText) || post.prompt?.toLowerCase().includes(searchText) || post.tag?.toLowerCase().includes(searchText);
    });

    setFilteredPosts(filtering);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
      console.log(posts);
    };
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input type="text" placeholder="Search for a tag or a username" value={searchText} onChange={handleSearchChange} required className="search_input peer" />
      </form>

      <PromptCardList data={!searchText ? posts : filteredPosts} handleTagClick={(tag) => setSearchText(tag)} />
    </section>
  );
};

export default Feed;
