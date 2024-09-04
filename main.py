from langchain_ollama.llms import OllamaLLM

model_id = 'qwen2-math:1.5b'

model = OllamaLLM(model=model_id)

result = model.invoke("What is 1+1?")

print(result)