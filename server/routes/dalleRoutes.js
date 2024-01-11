import express from "express";
import * as dotenv from "dotenv";

import fetch from "node-fetch";

dotenv.config();

const router = express.Router();

router.route("/").get((req, res) => {
  res.send("Hello from dalle clone");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const url = "https://api.getimg.ai/v1/stable-diffusion/text-to-image";
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Bearer ${process.env.GETIMG_API_KEY}`,
      },
      body: JSON.stringify({
        model: "stable-diffusion-v1-5",
        prompt: prompt,
        negative_prompt: "Disfigured, cartoon, blurry",
        width: 512,
        height: 512,
        steps: 25,
        guidance: 7.5,
        seed: 0,
        scheduler: "dpmsolver++",
        output_format: "jpeg",
      }),
    };

    const image = await fetch(url, options)
      .then((res) => res.json())
      .then((json) => json.image);
    // console.log(image);

    res.status(200).json({ photo: image });
  } catch (error) {
    console.log(error);
    res.status(500).send(error?.response?.data.error.message);
  }
});

export default router;
