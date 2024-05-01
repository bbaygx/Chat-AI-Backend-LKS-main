import prisma from "../lib/prisma.js";
import openai from "../lib/openai.js";
export const getResponseFromHercaAI = async (req, res) => {
  const { message } = req.body;
  const { model } = req.query;
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: message }],
      model: model || "gpt-3.5-turbo",
    });
    const messageText = chatCompletion.choices[0].message.content;
    await prisma.message.create({
      data: {
        question: message,
        answer: messageText,
        user: {
          connect: {
            id: req.user.id,
          },
        },
      },
    });
    res.json({
      message: "AI response",
      data: messageText,
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
      originalMessage: err.message,
    });
  }
};
