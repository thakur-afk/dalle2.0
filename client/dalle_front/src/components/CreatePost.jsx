import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormField from "./FormField";
import { preview } from "../assets";
import Loader from "./Loader";
import { getRandomPrompt } from "../utils/index.js";

const CreatePost = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [generatingImage, setGeneratingImage] = useState(false);
  const [form, setForm] = useState({
    photo: "",
    name: "",
    prompt: "",
  });

  async function generateImage() {
    if (form.prompt) {
      try {
        setGeneratingImage(true);

        const response = await fetch(
          "https://dalle-backend-gu1c.onrender.com/api/v1/dalle",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: form.prompt }),
          }
        );

        const data = await response.json();
        setForm({
          ...form,
          photo: `data:image/jpeg;base64,${data.photo}`,
        });
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImage(false);
      }
    } else {
      alert("please enter promt");
    }
  }

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch(
          "https://dalle-backend-gu1c.onrender.com/api/v1/post",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          }
        );
        await response.json();
        navigate("/");
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("please enter prompt and generate image");
    }
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <div className=" flex flex-col gap-1">
          <h1 className=" md:text-5xl  text-xl font-bold">Create</h1>
          <p className="text-[#666e75] md:text-lg text-sm">
            Search and create a collection of imaginative and visually stunning
            images by DALL-E AI.
          </p>
        </div>
        <form
          className="mt-4 max-w-3xl flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-4">
            <FormField
              type={"text"}
              name={"name"}
              placeholder={"John Smith"}
              labelName={"Name"}
              value={form.name}
              handleChange={handleChange}
            />
            <FormField
              type={"text"}
              name={"prompt"}
              labelName={"Prompt"}
              placeholder={"A rider in the beach with bike"}
              supriseMe={"yes"}
              value={form.prompt}
              handleSupriseMe={handleSurpriseMe}
              handleChange={handleChange}
            />
            <div className=" relative bg-gray-50 border-gray-300 text-sm rounded-lg  w-64 h-64 p-3 flex justify-center items-center">
              {form.photo ? (
                <img
                  src={form.photo}
                  alt={form.prompt}
                  className="w-full h-full object-contain"
                />
              ) : (
                <img
                  src={preview}
                  alt="preview"
                  className=" w-9/12 object-contain opacity-40"
                />
              )}
              {generatingImage && (
                <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                  <Loader />
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <button
              type="button"
              onClick={generateImage}
              className=" bg-green-700 px-5 py-2 rounded-md text-white"
            >
              {generatingImage ? "Generating..." : "Generate"}
            </button>
            <button
              type="submit"
              className=" bg-blue-700 text-white rounded-md px-5 py-2 "
            >
              {loading ? "Loading...." : "Share with the Community"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
