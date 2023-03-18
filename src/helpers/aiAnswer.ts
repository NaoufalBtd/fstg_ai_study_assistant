import { PineconeClient } from "@pinecone-database/pinecone";
import { OpenAI } from "langchain";

import { VectorDBQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "langchain/embeddings";
import { PineconeStore } from "langchain/vectorstores";

const aiAnswer = async (message: string) => {
  try {
    const pinecone = new PineconeClient();
    await pinecone.init({
      apiKey: process.env.PINECONE_API_KEY,
      environment: process.env.PINECONE_API_ENV,
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
    return response.text;
  } catch (error) {
    console.error(error);
    return "";
  }
};

export default aiAnswer;
