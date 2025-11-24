# NeoNewsTech

## Description

A basic web application designed to deliver the latest news in the tech and gaming sectors. The core functionality involves fetching articles using the **NewsAPI**, storing them in a PostgreSQL database, and generating a concise summary for each article to maximize user efficiency.

---

## Tech Stack

* **Frontend:** Angular, TypeScript, SCSS
* **Backend:** Nest.js, TypeScript, Node.js
* **Database:** PostgreSQL
* **API:** [NewsAPI](https://newsapi.org/)

---

## Local Installation

### Requirements
* Node.js version **25.1.0**
* npm version **11.0.0**

Copy the git repository locally:
    ```
    git clone https://github.com/leo-christophe/NeoNewsTech
    ```

### Back-end (Nest.js)

1.  Host a database with PostgreSQL (Ensure a database named `[POSTGRES_DB]` is created).
2.  Create the tables with the script `db_creation.sql` in the root folder of the git repo.
3.  Go in the backend folder:
    ```bash
    cd NeoNewsTech/backend
    ```
4.  Get a NewsAPI API Key on the official website.
5.  Create a `.env` file in the root of the back-end folder with the following parameters:
    ```env
    NEWS_API_KEY=*** # News API Key
    POSTGRES_HOST=localhost
    POSTGRES_PORT=5432
    POSTGRES_USER=***
    POSTGRES_PASSWORD=***
    POSTGRES_DB=neonewstech # Example database name
    PORT=3000
    ```
6.  Install dependencies:
    ```bash
    npm install
    ```
7.  Start the application in development mode:
    ```bash
    npm run start:dev
    ```
8.  Once the server is running, navigate to `http://localhost:3000/news` in your browser. This will trigger the fetching of the latest news from the NewsAPI and save them to your database.
9.  The news articles are now stored in your PostgreSQL database.

### Front-end (Angular)

1.  Follow the steps to setup Angular on your PC: https://v17.angular.io/guide/setup-local. Your console should have no error when doing the `ng` command.
2.  Go in the frontend folder:
    ```bash
    cd NeoNewsTech/frontend
    ```
3.  *Skip this part* Create a `.env` file and paste the following code:
    ```env
    ``` 
4.  Install dependencies:
    ```bash
    npm install
    ```
5.  Start the app:
    ```bash
    ng serve
    ```
6.  It should be started and visible on `localhost:4200`. 
7.  If the backend is also running, news should be appearing in the frontend. 
---

## Back-end Scripts

* `npm run start:dev`: Starts the application in watch mode (recommended for development).
* `npm run start:prod`: Builds and starts the application for production use.
* `npm run test`: Runs the unit tests.

---

## Roadmap

* **Build the Frontend:** Complete the Angular application to provide a user-friendly website.
* **AI Summarization:** Integrate a Large Language Model (LLM) service to generate custom, concise summaries for all fetched articles.
* **User Management:** Implement account creation, login, and user profiles.
* **Newsletter Service:** Add functionality for sending scheduled email newsletters to registered users.

---

## Contributing

I am currently not open to external contributions as this is a personal, learning-focused project.

---

## Support

For any questions or bug reporting, please open an issue in the GitHub repository.

---

## Project Status

**(19/11/2025) Currently developing full-time.**
