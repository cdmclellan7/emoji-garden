# Emoji Garden 🍅

The Emoji Garden is a Pomodoro Timer that can be used to track your working or studying time.

1. Plant a seed that takes 25 minutes to grow and produce a tomato.
2. Harvest a tomato to start a 5 minute break.

I created this project because I find the pomodoro method very helpful, but I wanted to make the experience more fun. I also wanted a way to track how much time I've spent on a project. Using emojis to visualize how much time I've spent working on something helps motivate me to keep going. I hope you enjoy it as well! 🍅

## Local Setup

To run the Emoji Garden locally:

1. clone the repo
```
git clone git@github.com:cdmclellan7/emoji-garden.git
cd emoji-garden
```

2. install dependencies
```
npm i
```
3.  create a .env file and add your postgres database connection url 
```
DATABASE_URL=your-connection-url
```
4. run scripts to create the database tables
```
npm run db-create-all-tables
```
5. start the development server and go to localhost:3000 in your browser to start planing emojis!
```
npm run dev
```

## Tech Stack

This is a full-stack app with a Node.js/Express API and PostgreSQL database on the backend. 

The frontend uses Embedded JavaScript (EJS) as the template engine. 

User authentication is handled by Passport.js with encryption by the bcrypt package.

## Project Status

This project is [deployed to Heroku here.](https://emoji-garden-timer.herokuapp.com/)

## Project Goals

- Refactor the frontend, possibly with React to help manage UI state
- Write more integration tests for the API
- Allow users to create more than one garden.
- Make different "themes" for the gardens. (Example: flower emojis garden, vegetable emojis garden, animal emojis zoo, etc.)
- Allow multiple users use the same garden simultaneously to facilitate teamwork. 
