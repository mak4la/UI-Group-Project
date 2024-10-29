# PageNest

> PageNest is a web application designed to provide users with customizable page templates. This project includes a Node.js and Express backend, making it easy to run locally and set up for development.

## Table of Contents
- [About](#about)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [License](#license)

---

## About
PageNest serves as a ..... This server is built using Node.js and Express, with environment variables configured using `dotenv` 

## Installation

1. **Clone the Repository**
   - Open your terminal and clone the repository to your local machine:
     ```bash
     git clone <repository-url>
     cd PageNest
     ```

2. **Install Dependencies**
   - In the project root directory, install the required dependencies:
     ```bash
     npm install
     ```

3. **Set Up Environment Variables**
   - Create a `.env` file in the root directory to define necessary environment variables. The basic configuration requires:
     ```plaintext
     PORT=5050
     ```

## Usage

1. **Start the Server**
   - Run the following command to start the server:
     ```bash
     npm start
     ```
   - The server should start on `http://localhost:5050` (or the port defined in your `.env` file).

2. **Testing the Server**
   - To test if the server is running correctly, open a browser or use a tool like **Postman** and navigate to:
     ```
     http://localhost:5050
     ```
   - You should see the response: `"Backend is running on Node.js with dotenv!"`

