import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// GET (Read)
export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const prompts = await Prompt.findById(params.id).populate("creator");

    if (!prompts) return new Response("Prompt not found", { status: 404 });

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch", { status: 500 });
  }
};

// PATCH (Update)
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) return new Response("Prompt not found", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update", { status: 500 });
  }
};

// DELETE (Delete)
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);

    await Prompt.findByIdAndRemove(params.id);

    return new Response("Prompt deleted", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete", { status: 500 });
  }
};
