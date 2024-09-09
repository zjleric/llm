import { RemoteRunnable } from "@langchain/core/runnables/remote";

const remoteChain = new RemoteRunnable({
  url: "http://localhost:8000/chain/",
});

const result = await remoteChain.invoke({"language": "italian", "text": "hi"});

console.log(result);
