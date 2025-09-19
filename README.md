  <h1 align="center">Ledgerly 💲 - Your Modern Personal Finance Tracker</h1>
  <p align="center">
    A sleek, open-source dashboard to manage your finances, track spending, and gain AI-powered insights.
  </p>
<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google-gemini&logoColor=white" alt="Google Gemini" />
</p>

---

**Ledgerly** is a modern, privacy focused personal finance dashboard designed to help you take control of your financial life. Track your spending, visualize your habits, and gain powerful insights with the help of AI, all while keeping your data securely stored in your own browser.

---

## ✨ Key Features

- 📊 **Comprehensive Dashboard:** Get a bird's eye view of your net balance, income, expenses, and savings rate with dynamic KPI cards.
- 🔄 **Transaction Management:** Easily add, edit, and delete transactions. A powerful, sortable, and filterable data table makes managing your records a breeze.
- 🧠 **AI-Powered Insights:** Leverage the power of Google's Gemini AI to analyze your spending data and receive a summary, key observations, and actionable suggestions.
- 📈 **Visual Analytics:** Understand your financial health with interactive charts for balance over time and spending by category.
- 📱 **Fully Responsive:** Access your financial dashboard on any device, from desktop to mobile, with a UI that adapts to your screen.
- 📥 **Data Import/Export:** Your data is yours. Import existing transactions from a CSV or JSON file, or export your data for backup and peace of mind.
- 📄 **PDF Reports:** Generate detailed PDF summaries of your financial activity for a given period, perfect for record keeping.
- 🎨 **Sleek & Modern UI:** Built with **ShadCN UI** and **Tailwind CSS** for a beautiful, intuitive, and accessible user experience.
- 🔐 **Privacy First:** All your financial data is stored locally in your browser's local storage. It never leaves your device.

---

## 🛠️ Tech Stack & Tools

This project is built with a modern, powerful stack to deliver a high-quality user experience and robust functionality.

| Category          | Tool/Library                        | Purpose                                                                        |
| :---------------- | :---------------------------------- | :----------------------------------------------------------------------------- |
| **Framework**     | 🚀 **Next.js (App Router)**         | For a fast, server rendered React application with great performance and SEO.  |
| **Language**      | 🔷 **TypeScript**                   | To ensure type safety, improve code quality, and make development more robust. |
| **Styling**       | 🎨 **Tailwind CSS** & **ShadCN UI** | For a utility first CSS framework and a set of accessible UI components.       |
| **AI**            | 🧠 **Genkit (Google AI)**           | To integrate Google's Gemini models for generating AI powered insights.        |
| **Charts**        | 📊 **Recharts**                     | For creating beautiful and interactive charts to visualize financial data.     |
| **Forms**         | 📝 **React Hook Form** & **Zod**    | For efficient, scalable form state management and schema-based validation.     |
| **Tables**        | 🗂️ **TanStack Table**               | To build powerful and flexible data tables for displaying transactions.        |
| **PDFs**          | 📄 **jsPDF** & **jspdf-autotable**  | For generating client side PDF reports of financial data.                      |
| **Icons**         | ✨ **Lucide React**                 | For a clean and consistent set of open-source icons.                           |
| **Data Handling** | 💼 **Papa Parse**                   | For fast and reliable in browser CSV parsing.                                  |

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/MuhammadTanveerAbbas/Ledgerly-Dashboard.git
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd Ledgerly-Dashboard
    ```

3.  **Install dependencies:**

    ```bash
    npm install
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result. You can start adding transactions and exploring the dashboard right away!

---

## 📂 Project Structure

Here's an overview of the project's directory structure:

```
src
├── app                 # Next.js App Router pages and layouts
│   ├── dashboard       # Main application dashboard
│   └── page.tsx        # Landing page
├── ai                  # Genkit AI flows and configuration
│   ├── flows           # AI logic for generating insights
│   └── genkit.ts       # Genkit initialization
├── components          # Reusable React components
│   ├── dashboard       # Components specific to the dashboard
│   ├── layout          # Layout components like header/footer
│   └── ui              # ShadCN UI components
├── hooks               # Custom React hooks (useDashboard, useToast)
├── lib                 # Utility functions, types, and static data
└── styles              # Global styles and Tailwind CSS config
```

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  **Fork the Project**
2.  **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3.  **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4.  **Push to the Branch** (`git push origin feature/AmazingFeature`)
5.  **Open a Pull Request**

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Made with ❤️ by [Muhammad Tanveer Abbas](https://github.com/muhammadtanveerabbas)
