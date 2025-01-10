const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const OpenAI = require('openai');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/create-thread", async (req, res) => {
  try {
    const thread = await openai.beta.threads.create();
    res.json({ threadId: thread.id });
  } catch (error) {
    console.error("Error creating thread:", error.message);
    res.status(500).json({ error: "Failed to create thread" });
  }
});

// Add a message to the thread and get a response
app.post("/send-message", async (req, res) => {
  const { threadId, message } = req.body;

  if (!threadId || !message) {
    return res.status(400).json({ error: "threadId and message are required" });
  }

  try {
    // Add message to the thread
    const userMessage = await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: message,
    });

    // Run the assistant on the thread
    const run = await openai.beta.threads.runs.createAndPoll(threadId, {
      assistant_id: process.env.OPENAI_ASSISTANT_ID,
    });

    if (run.status === "completed") {
      const messages = await openai.beta.threads.messages.list(run.thread_id);
      const assistantResponse = messages.data
        .filter((msg) => msg.role === "assistant")
        .map((msg) => msg.content[0]?.text?.value || "")
        .join("\n");

      res.json({ response: assistantResponse });
    } else {
      res.status(500).json({ error: "Run did not complete successfully", status: run.status });
    }
  } catch (error) {
    console.error("Error sending message:", error.message);
    res.status(500).json({ error: "Failed to send message" });
  }
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
