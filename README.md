# NAVIGATE LABS CAPSTONE

https://github.com/user-attachments/assets/7ddbbc4e-6557-45a7-80c3-ee436114f63e

## 🔥 About RoastMyCV

RoastMyCV is my capstone project for the Navigate Labs program. It's an AI-powered resume reviewing application that provides candid, constructive feedback on your CV/resume. This platform helps job seekers improve their resumes by identifying weaknesses, suggesting improvements, and providing industry-specific recommendations to make your application stand out.

## ✨ Features

- **AI-Powered Resume Analysis**: Upload your resume and get instant feedback  
- **Adjustable Intensity**: Control how direct and critical the feedback should be  
- **Industry-Specific Insights**: Receive tailored advice based on your target industry  
- **Interactive Chat Interface**: Discuss your resume improvements with our AI assistant  
- **Visual Resume Score**: Get a quantified evaluation of your resume's strengths and weaknesses  
- **Badge Generator**: Earn achievement badges as you improve your resume  
- **Responsive Design**: Works seamlessly on desktop and mobile devices  
- **User Profiles**: Save your resume history and track improvements over time  

## 🚀 Getting Started

### Prerequisites

- Node.js 16.x or later  
- npm or Bun package manager  

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/roastmycv.git
cd roastmycv

git clone https://github.com/mrdbourke/simple-local-rag.git
cd simple-local-rag
```

### 2. Create Virtual Environment

```bash
python -m venv venv
```

### 3. Activate Environment

**Linux/macOS:**
```bash
source venv/bin/activate
```

**Windows:**
```bash
.env\Scriptsctivate
```

### 4. Install Dependencies

```bash
pip install -r requirements.txt
```

**Note on PyTorch Installation:**  
You may need to install PyTorch with CUDA support manually. For Windows with CUDA 12.1, use:

```bash
pip3 install -U torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121
```

Visit [PyTorch's installation page](https://pytorch.org/get-started/locally/) for other configurations.

### 5. Launch Notebook

**VS Code:**
```bash
code .
```

**Jupyter Notebook:**
```bash
jupyter notebook
```

**Additional Setup Notes:**

- **Access to Gemma Models:** To use the Gemma LLM models, you must first [agree to the terms & conditions](https://huggingface.co/google/gemma-7b-it) on the Hugging Face website. Authorize your local machine via the [Hugging Face CLI](https://huggingface.co/docs/huggingface_hub/en/quick-start#authentication). For Google Colab, add a [Hugging Face token](https://huggingface.co/docs/hub/en/security-tokens) to the "Secrets" tab.

- **Flash Attention 2:** For performance improvements, you can install the Flash Attention 2 package by uncommenting it in the requirements file or installing it separately with `pip install flash-attn`. Note that compilation may take 5 minutes to 3 hours depending on your system. See the [Flash Attention 2 GitHub](https://github.com/Dao-AILab/flash-attention/tree/main) for details and [this thread](https://github.com/Dao-AILab/flash-attention/issues/595) for Windows-specific instructions.

## Understanding RAG (Retrieval Augmented Generation)

RAG combines information retrieval with text generation to enhance the capabilities of large language models. The concept was introduced in the paper [*Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks*](https://arxiv.org/abs/2005.11401).

The RAG process consists of three main components:

- **Retrieval:** Finding relevant information from a source based on a query  
- **Augmentation:** Using the retrieved information to enhance the LLM's input  
- **Generation:** Producing a response using the augmented prompt  

### Benefits of RAG

RAG offers two primary advantages over standard LLM usage:

1. **Reduced Hallucinations:** By grounding LLM responses in retrieved factual information, RAG reduces the likelihood of the model generating plausible but incorrect content.

2. **Domain-Specific Knowledge Integration:** RAG allows LLMs to work with custom, specialized data not included in their training datasets, such as company documentation or domain-specific literature.

> This work offers several positive societal benefits over previous work: the fact that it is more strongly grounded in real factual knowledge (in this case Wikipedia) makes it "hallucinate" less with generations that are more factual, and offers more control and interpretability.

RAG implementation is also typically faster and more resource-efficient than fine-tuning an LLM on specific data.

## Practical Applications of RAG

RAG technology is ideal for scenarios requiring access to specific information not available in an LLM's training data. Examples include:

- **Customer Support Systems:** Process customer queries by retrieving relevant documentation and generating contextualized responses. Companies like Klarna [have implemented such systems](https://www.klarna.com/international/press/klarna-ai-assistant-handles-two-thirds-of-customer-service-chats-in-its-first-month/), saving millions annually on customer support costs.  
- **Email Analysis and Processing:** Extract and summarize relevant information from extensive email chains, creating structured outputs for further processing.  
- **Internal Knowledge Management:** Create interactive systems that can retrieve and present company information in response to employee queries.  
- **Educational Tools:** Enable students to query textbooks and educational materials, receiving contextually relevant answers with citations.  

## Advantages of Local Deployment

Running RAG locally offers several advantages:

- **Privacy:** Sensitive data remains on your hardware, never transmitted to external APIs.  
- **Reliability:** No dependence on external service availability or API queue times.  
- **Cost-Effectiveness:** After initial hardware investment, continued usage has minimal ongoing costs.  

## Key Terminology

| Term | Description |
|------|-------------|
| **Token** | A sub-word piece of text. |
| **Embedding** | A numerical representation (vector) of data that captures semantic meaning. |
| **Embedding Model** | A neural network that converts input data into numerical vectors. |
| **Similarity Search** | The process of finding vectors that are close in high-dimensional space. |
| **Large Language Model (LLM)** | A neural network trained to understand and generate text. |
| **LLM Context Window** | The maximum number of tokens an LLM can process at once. |
| **Prompt** | The input provided to an LLM to elicit a specific response. |

## 🔗 Other Navigate Labs Repositories

- [EXERCEO-AI](https://github.com/sarankumar1325/EXERCEO-AI.git)  
- [NAVIGATELABSAI-ASSIGNMENT-1-PART-3](https://github.com/sarankumar1325/NAVIGATELABSAI-ASSIGNENT-1-PART-3.git)  
- [NAVIGATELABSAI-ASSIGNMENT-1-PART-2](https://github.com/sarankumar1325/NAVIGATELABSAI-ASSIGNMENT-1-PART-2.git)  
- [NAVIGATELABSAI-ASSIGNMENT-1-PART-1](https://github.com/sarankumar1325/NAVIGATELABSAI-ASSIGNMENT-1-PART-1.git)  
- [NAVIGATELABSAI-ASSESSMENT-1](https://github.com/sarankumar1325/NAVIGATELABSAI-ASSESMENT-1.git)  

