# Habit Tracker 

## _Getting better 21 days at a time_
 
Habit tracker is not just any boring habit building it. It is  unique in such a way that it gamefies the process of habit builing by encouraging you to unlock pieces of a puzzle. The pieces of the puzzle are made available to be unlocked day by day. The user then unlocks a piece by entering the quanta of work that he/she did on that day. 
This app also allows a qualitative estimation of how good you are doing by prompting the user to provide the minimum amount units of work that has to be done for a particular activity so as to be considered succesful or not. The success of a task on a particular day can be qualitatively infered by the opacity of the tile.
As the habit deadline is achieved one can see the overall effort invested in the tasak. If the image is not clear, then there is always scope to improve but if you get a clear image then you have achieved a level of discipline that many people aspire to achieve

## Features

- Create new habits based on timeline comfortable to you
- Gamefied approach to doing mundane things
- Personalize your experience with using custom images that motivate you
- Understand how much of the daily target you have achieved
- Introspect on overall consistency and committment to a task
- Track multiple habits
- Gain strength by looking at your past successes in terms of awards earned

## Tech

Our App uses a number of open source projects to work properly:

- Node.js
- Express.js
- Bootstrap
- HTML/CSS
- MongoDB
- Docker

And of course HabitBuilder is itself is open source with a [public repository](https://github.com/k-bosko/HabitBuilder) on GitHub.

## Installation
##### Setting up the the DB
For the database HabitBuilder uses MongoDB in the backend. To set it up run the following commands

```sh
docker run --name mongodb -d -p 27017:27017 -v YOUR_LOCAL_DIR:/data/db mongo
```
Using this method, you will be able to connect to your MongoDB instance on mongodb://localhost:27017. You can try it with Compass, MongoDB’s GUI to visualize and analyze your data.
Don't forget to shut down the docker instnace after use.
##### Setting up the server
HabitBuilder requires [Node.js](https://nodejs.org/) v10+ to run.
Install the dependencies and devDependencies and start the server.

```sh
cd HabitBuilder
npm i
```
##### Running the project
Run the following command from the root directory of the project to spin up the project's server
```sh
npm run start
```
Open up a browser and navigate to ```http://localhost:3000/```
**Enjoy!**
## License

MIT
**Free Software, Hell Yeah!**


Created with ♥️ by Katerina Bosko & Anshul Mathew
