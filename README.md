# Creative Hub AI Chat (Disbot)

A world-class, Discord-inspired chat application featuring real-time AI assistance for summarization, tone improvement, and translation, built with React 19 and the Google Gemini API.

## 🚀 Features

- **Discord-inspired UI**: Multi-server and multi-channel navigation with a familiar aesthetic.
- **AI-Powered Tools**: 
  - **Summarization**: Instantly condense long conversations into key bullet points.
  - **Tone Improvement**: Refine your messages to be more professional or friendly.
  - **Translation**: Translate text into other languages (e.g., Spanish/French) seamlessly.
- **Dynamic Theming**: Support for both Dark and Light modes with a toggleable FAB.
- **Responsive Design**: Optimized for desktop and mobile viewing.

## 🛠️ Tech Stack

- **Framework**: React 19 (via ESM imports)
- **Styling**: Tailwind CSS
- **AI Engine**: [Google Gemini API](https://ai.google.dev/) (`@google/genai`)
- **Icons**: Material Symbols Outlined
- **Fonts**: Spline Sans

## 📦 GitHub 部署指南 (GitHub Deployment Guide)

要把此專案上傳到您的 GitHub 儲存庫 `https://github.com/karsontsang23/disbot`，請在終端機中執行以下指令：

To upload this project to your repository, run the following commands in your terminal:

1. **初始化 Git (Initialize Git)**:
   ```bash
   git init
   ```

2. **添加檔案 (Add Files)**:
   ```bash
   git add .
   ```

3. **提交變更 (Commit Changes)**:
   ```bash
   git commit -m "feat: initial discord-style ai chat with gemini integration"
   ```

4. **設定主分支 (Set Main Branch)**:
   ```bash
   git branch -M main
   ```

5. **連結遠端儲存庫 (Link Remote Repository)**:
   ```bash
   git remote add origin https://github.com/karsontsang23/disbot.git
   ```

6. **上傳至 GitHub (Push to GitHub)**:
   ```bash
   git push -u origin main
   ```

## 🔑 配置 (Configuration)

本專案需要 **Gemini API Key** 才能運行 AI 功能。
The project requires a Gemini API Key to function. 

- API Key 應透過環境變數 `process.env.API_KEY` 提供。
- 在本地開發時，請確保您的環境中已設置此變數。

## 📄 授權 (License)

MIT License. Feel free to use and modify for your own creative projects.
