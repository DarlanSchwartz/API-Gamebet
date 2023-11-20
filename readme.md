# API Gamebet
This is a Web Service built for learning purposes. This was made with JavaScript/TypeScript ecosystem using Node.js with Express.js for the server, Prisma with PostgreSQL for the database, Joi for runtime validations, Jest with Supertest and Faker for automated tests, ESLint and Prettier for code patterns.

## Deploy URL

Render deploy URL: https://api-gamebet.onrender.com

### Requirements to use all that it is to be used

- [postgresSQL v15 +](https://www.postgresql.org/)
- [node.js v18 +](https://nodejs.org/en) 
- [docker](https://docker.io/)

# Usage 

### Clone and install

```bash
git clone https://github.com/DarlanSchwartz/API-Gamebet.git
```

```bash
cd API-Gamebet
```

```bash
npm install
```

- Create a [.env](./.env) file at the root of the project folder.

This [env.example](./.env.example) file contains some field that you have to fill up with the correct information.

```bash
# Split your database url like this one into these variables below
# postgresql://postgres:postgres@localhost:2022/gamebet?schema=public

NODE_ENV=development
POSTGRES_USERNAME=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_HOST=localhost
POSTGRES_PORT=2022
POSTGRES_DATABASE=gamebet
DATABASE_URL=postgresql://${POSTGRES_USERNAME}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DATABASE}?schema=public
```

### Run

- Development mode -> auto-reloads when a file in the app is modified using nodemon to "watch" modified files.

```bash
npm run dev
```

- Start command, this will look for the "dist" folder to start, this dist folder will only appear when you build/transpile the app to javascript.

```bash
npm start
```

- Build command, this will transpile the app to javascript.

```bash
npm run build
```
### Running with Docker

1.  Make sure that the docker service/software is running in your pc.

- Build command
1. Run when you need to test a new feature at the docker container, this command will rebuilt the container with the latest changes you have made into your code. Do not forget you have to make changes to the [init.sql](./src/docker/postgres/init.sql) file with your new migration so the database is created with whatever changes you have made.

```bash
docker-compose build
```

- Start command. This will run the database and API in the container at ports API:5000, Database: 2022

```bash
docker-compose up
```

- Close command

```bash
docker-compose down
```

## Routes

- **POST** `/participants`
    - Creates a participant with a specific initial balance.
    - Input: participant's name and initial balance.
        
        ```tsx
        {
        	name: string;
        	balance: number; // represented in cents, e.g., R$ 10.00 -> 1000
        }
        ```
        
    - Output: created participant object.
        
        ```tsx
        {
        	id: number;
        	createdAt: string;
        	updatedAt: string;
        	name: string;
        	balance: number; // represented in cents, e.g., R$ 10.00 -> 1000
        }
        ```
        
- **POST** `/games`
    - Creates a new game with an initial score of 0x0 and marked as unfinished.
    - Input: home team name and away team name.
        
        ```tsx
        {
        	homeTeamName: string;
        	awayTeamName: string;
        }
        ```
        
    - Output: the created game object.
        
        ```tsx
        {
        	id: number;
        	createdAt: string;
        	updatedAt: string;
        	homeTeamName: string;
        	awayTeamName: string;
        	homeTeamScore: number; // initially 0
        	awayTeamScore: number; // initially 0
        	isFinished: boolean; // initially false
        }
        ```
        
- **POST** `/bets`
    - Registers a participant's bet on a specific game. The bet amount should be immediately deducted from the participant's balance.
    - Input:
        
        ```tsx
        { 
        	homeTeamScore: number;
        	awayTeamScore: number; 
        	amountBet: number; // represented in cents, e.g., R$ 10.00 -> 1000
        	gameId: number; 
        	participantId: number;
        }
        ```
        
    - Output: the created bet object.
        
        ```tsx
        {
        	id: number;
        	createdAt: string;
        	updatedAt: string;
        	homeTeamScore: number;
        	awayTeamScore: number;
        	amountBet: number; // represented in cents, e.g., R$ 10.00 -> 1000
        	gameId: number; 
        	participantId: number;
        	status: string; // can be PENDING, WON, or LOST
        	amountWon: number || null; // null when the bet is still PENDING; number if the bet is already WON or LOST, with the won amount represented in cents
        }
        ```
        
- **POST** `/games/:id/finish`
    - Finishes a game and consequently updates all bets associated with it, calculating the amount won in each one and updating the balances of winning participants.
    - Input: final score of the game.
        
        ```tsx
        {
        	homeTeamScore: number;
        	awayTeamScore: number;
        }
        ```
        
    - Output: the updated game object.
        
        ```tsx
        {
        	id: number;
        	createdAt: string;
        	updatedAt: string;
        	homeTeamName: string;
        	awayTeamName: string;
        	homeTeamScore: number;
        	awayTeamScore: number;
        	isFinished: boolean;
        }
        ```
        
- **GET** `/participants`
    - Returns all participants and their respective balances.
    - Output: an array of all participants.
        
        ```tsx
        [
        	{
        		id: number;
        		createdAt: string;
        		updatedAt: string;
        		name: string;
        		balance: number; // represented in cents, e.g., R$ 10.00 -> 1000
        	}, 
        	{...}
        ]
        ```
        
- **GET** `/games`
    - Returns all registered games.
    - Output: an array of all games.
        
        ```tsx
        [
        	{
        		id: number;
        		createdAt: string;
        		updatedAt: string;
        		homeTeamName: string;
        		awayTeamName: string;
        		homeTeamScore: number;
        		awayTeamScore: number;
        		isFinished: boolean;
        	},
        	{...}
        ]
        ```
        
- **GET** `/games/:id`
    - Returns the data of a game along with the bets associated with it.
    - Output: the game object containing an array of bets made on it.
        
        ```tsx
        {
        	id: number;
        	createdAt: string;
        	updatedAt: string;
        	homeTeamName: string;
        	awayTeamName: string;
        	homeTeamScore: number;
        	awayTeamScore: number;
        	isFinished: boolean;
        	bets: {
        		id: number;
        		createdAt: string;
        		updatedAt: string;
        		homeTeamScore: number;
        		awayTeamScore: number;
        		amountBet: number; // represented in cents, e.g., R$ 10.00 -> 1000
        		gameId: number; 
        		participantId: number;
        		status: string; // can be PENDING, WON, or LOST
        		amountWon: number || null; // null when the bet is still PENDING; number if the bet is already WON or LOST, with the won amount represented in cents
        	}[]
        }
        ```
