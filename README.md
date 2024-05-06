# Installation

> Note: Make sure you have Node.js version `16.9.0` installed.

- Clone this repository using

```shell
  git clone https://github.com/Kuzmenko-OA-GroupBWT/commisions_task.git
```

- Navigate to the project directory

```shell
 cd commisions_task
```

- Install dependencies using `npm install`
- Copy the `.env.example` file and rename it to `.env` using the following command:

```shell
 cp .env.example .env
```

- Set up the `COMMISSION_FEE_CONFIG_API_URL` variable in your `.env` file.

### `.env` example

```dotenv
COMMISSION_FEE_CONFIG_API_URL=https://developers.com/tasks/api
```

# Usage

To run the project in development mode, use the command:

```shell
npm run start
```