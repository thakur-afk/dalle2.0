import { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { logo } from "./assets";
import { Home, CreatePost } from "./components";

function App() {
  return (
    <>
      <BrowserRouter>
        <header>
          <div className="flex w-full justify-between p-5 border-b border-b-[#e6ebf4]">
            <div>
              <Link to={"/"}>
                <img src={logo} className=" w-24" />
              </Link>
            </div>
            <div>
              <Link to={"create-post"}>
                <button className=" bg-blue-500 text-white px-1 rounded-md cursor-pointer text-lg">
                  Create
                </button>
              </Link>
            </div>
          </div>
        </header>
        <main className="px-4 py-8 sm:p-6 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)] ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-post" element={<CreatePost />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
