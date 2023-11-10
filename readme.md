### It contains the following libraries as default dependencies:

- [prisma](https://www.npmjs.com/package/prisma)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [joi](https://www.npmjs.com/package/joi)
- [@joi/date](https://www.npmjs.com/package/@joi/date)
- [dayjs](https://www.npmjs.com/package/dayjs)
- [express](https://www.npmjs.com/package/express)
- [express-async-errors](https://www.npmjs.com/package/express-async-errors)
- [http-status](https://www.npmjs.com/package/http-status)
- [cors](https://www.npmjs.com/package/cors)
### Dev dependencies
- [ts-none](https://www.npmjs.com/package/ts-node)
- [tsc-alias](https://www.npmjs.com/package/tsc-alias)
- [tsconfig-paths](https://www.npmjs.com/package/tsconfig-paths)
- [typescript](https://www.npmjs.com/package/typescript)
- [nodemon](https://www.npmjs.com/package/nodemon)
- [typescript-transform-paths](https://www.npmjs.com/package/typescript-transform-paths)
### Type dev dependencies
- [@types/cors](https://www.npmjs.com/package/@types/cors)
- [@types/express](https://www.npmjs.com/package/@types/express)
- [@types/node](https://www.npmjs.com/package/@types/node)
- [@types/pg](https://www.npmjs.com/package/@types/pg)
- [@types/joi](https://www.npmjs.com/package/@types/joi)


### Requirements to use all that it is to be used

- [postgresSQL](https://www.postgresql.org/)
- [node.js](https://nodejs.org/en)
- [docker](https://docker.io/)

# Usage 

### Default

- Development mode -> auto-reloads when a file in the app is modified using nodemon to "watch" modified files.

```bash
npm run dev
```

- Start command, this will look for the "dist" folder to start, this dist folder will only appear when you build/transpile the app to "normal" javascript.

```bash
npm start
```

- Build command

```bash
npm run build
```
### Docker

1.  Make sure that the docker service/software is running in your pc.

- Build command
1. Run when you need to test a new feature at the docker container, this command will rebuilt the container with the latest changes you have made into your code.

```bash
docker-compose build
```

- Start command.

```bash
docker-compose up
```

- Close command

```bash
docker-compose down
```


This [env](./.env.example) file contains some field that you have to fill up with the correct data.

```javascript
"postgresql://postgres:postgres@localhost:2022/gamebet?schema=public"
```

## This template has some example routes as following:

1. Create a Post

```bash
/new-post
```
- Body to send
```javascript
  {
    "name": "PostName",
    "writerId": 69,
    "likeCount": 420,
    "content": "post content here",
    "createdAt": "2023-09-15T03:00:00.000Z"
  }
```
- Response status code 200
```bash
```
2. Get all posts Response status code 200


```bash
/posts -> queries : ?limit=10 -- ?name=PostName
```
- Response status code 200

```javascript
[
  {
    "id": 69,
    "name": "PostName",
    "writerid": 420,
    "likecount": 6969,
    "content": "post content here",
    "createdat": "2023-09-15T03:00:00.000Z"
  }
]
```

3. Like a post


```bash
/like-post/:id

example: /like-post/69
```
- Response -> Status code 204
```javascript
```

4. Delete a post


```bash
/remove-post/:id

example: /remove-post/420
```
- Response -> Status code 204
```javascript
```

5. Update a post


```bash
/update-post/:id

example: /update-post/420
```
- Body to send
```javascript

  {
    "name": "Xurulipas",
    "writerId": 69,
    "likeCount": 69420,
    "content": "xablau",
    "createdAt": "2023-09-15T03:00:00.000Z"
  }
```
- Response -> Status code 204
```javascript
```

# How to deploy on render

- Leave Root Directory empty

- Build command

```bash
npm install && npm run build
```

- Start Command


```bash
npm start
```

<img src="./prints (delete me)/print-render-commands.PNG">

## Enviormental Variables

- Insert the same ones that you have on the [Env example file](./.env.example)


<img src="./prints (delete me)/print-env.PNG">

## Sucess

- If you have followed along everything will be a sucess and you should see the same as the image below:

<img src="./prints (delete me)/print-deploy-sucess.PNG">