# Games With Friends

Written by Andrew Leigh.

Contact me at andrewleigh6@gmail.com

Last updated 07/04/2021

Design spec: https://github.com/AndrewLeigh6/GamesWithFriends/blob/master/docs/spec.md


## Install Instructions

### Prerequisites

To get this working on your PC, you'll need to install Docker. If you want it in dev mode, you'll also need NPM installed. Next, you'll need to get a Steam API key from here: https://steamcommunity.com/dev/apikey. Once you have that, use git to clone or manually download the repository to get the source code, then go into the `api-node` folder and make a new file called `.env`. Open it up and enter `STEAM_API_KEY=yourkeyhere`. Save it, and you should be good to go. 

### Dev Version

1. Make sure you've got Docker up and running.
2. Using the terminal, navigate to the `client` folder and run `npm install`.
3. Navigate back up, and then go into the `api-node` folder, and run `npm install` again.
4. Next, navigate back to the `gameswithfriends` folder and run `docker-compose up --build`. It might crash the first time you run it - don't worry, this is normal. Just hit command or ctrl + C, then try again.
5. Once that's done, open another terminal window, and run `docker ps`. Copy the container ID for gameswithfriends_api, and then run `docker exec -it containerIDhere npm run db:up`.
6. Open up your browser, and you should be able to view the site at localhost:81.

### Prod Version

1. Make sure you've got Docker up and running.
2. Using the terminal, navigate to the `gameswithfriends` folder and run `docker-compose -f docker-compose.build.yml up --build`. It might crash the first time you run it - don't worry, this is normal. Just hit command or ctrl + C, then try again.
3. Once that's done, open another terminal window, and run `docker ps`. Copy the container ID for gameswithfriends_api, and then run `docker exec -it containerIDhere npm run db:up`.
4. Open up your browser, and you should be able to view the site at localhost:81.
