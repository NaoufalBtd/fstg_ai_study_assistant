import { PineconeClient } from "@pinecone-database/pinecone";
import { OpenAI } from "langchain";
import { NextApiRequest, NextApiResponse } from "next";

import { VectorDBQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings";
import { PineconeStore } from "langchain/vectorstores";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { message } = req.body;
  try {
    const pinecone = new PineconeClient();
    await pinecone.init({
      apiKey: "4e4ffb8f-607d-4063-9a74-ee335eb3e671",
      environment: "us-east1-gcp",
    });

    const index = pinecone.Index("fstg");
    const vectorStore = await PineconeStore.fromExistingIndex(
      index,
      new OpenAIEmbeddings()
    );
    vectorStore.similaritySearch;
    const model = new OpenAI({ temperature: 0.5 });
    const chain = VectorDBQAChain.fromLLM(model, vectorStore);

    const response = await chain.call({
      query: message,
    });

    res.json({ text: response.text });
  } catch (error) {
    console.error(error);
    res.end();
  }
}
