from langchain_ollama.llms import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from flask import Flask, jsonify, request
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

MODEL_ID = 'qwen2-math:1.5b'

# 1. Create prompt template
system_template = "Solve the following Math Problem:"
prompt_template = ChatPromptTemplate.from_messages([
    ('system', system_template),
    ('user', '{text}')
])

# 2. Create model
model = OllamaLLM(model=MODEL_ID)

# 3. Create parser
parser = StrOutputParser()

# 4. Create chain
chain = prompt_template | model | parser


# 5. Adding chain route
@app.route('/', methods=['POST'])
def post():
    data = request.data.decode('utf-8')
    response = {"message": chain.invoke({'text': data})}
    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True)
    app.run(host='localhost', port=8000)