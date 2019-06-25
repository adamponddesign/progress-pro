# Progress Pro (Full-Stack Web App)
## ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) General Assembly Project 3


### Timeframe
7 days

### Technologies, frameworks and packages
* JavaScript (ES6)
* Python
* React
* Webpack
* PostgreSQL
* Flask
* React-charts
* Ajax
* HTML5
* Bulma
* SCSS
* GitHub
* Insomnia

### Project brief
* Build a full-stack application, making your own back-end and front-end.  
* Use a Python Flask API to serve your data from a PostgreSQL database.  
* Consume your API with a separate front-end built with React.
* Be a complete product with multiple database relationships and CRUD functionality for at least a couple of models.

This was a solo project.  
The application is deployed via Git on Heroku and can be found here: [Progress Pro](http://progress-pro.herokuapp.com/)

### App overview
Progress Pro is a gym training application.  
Users can create an account then create personalised gym programmes containing chosen exercises on chosen days.

![Programme Page](https://user-images.githubusercontent.com/47188720/60123146-a87dc900-977e-11e9-8342-68656aabad5e.png)

Each programme is then stored on the user homepage, with specific buttons to train on a particular day.

![Programme Image](https://user-images.githubusercontent.com/47188720/60120286-65b8f280-9778-11e9-8f56-dbaf2f8145c4.png)

The train page for each specific day contains the exercises and also the weight which was lifted in the last session for reference.  
Users have the option to increase or decrease the weight before saving the session.

![Train Page](https://user-images.githubusercontent.com/47188720/60120482-c9432000-9778-11e9-8fb7-986f8f6f2c5a.png)

On save the workout date and weights are added to the database.

The results section of the app allows users to view their progress for each exercise in the programme over time.

![Results Page](https://user-images.githubusercontent.com/47188720/60120696-5b4b2880-9779-11e9-899a-5e77caeace1c.png)





### Development process

I wire-framed each page out before starting to code.

![Wireframe](https://user-images.githubusercontent.com/47188720/60120988-0360f180-977a-11e9-9db4-a54bfb6f6f1c.png)

I also made sure I had a good understanding of the database relationships.

![DB relationships](https://user-images.githubusercontent.com/47188720/60121023-15429480-977a-11e9-9adf-bb3d6719b15e.png)


Although I ultimately knew wanted to display my results data using graphs, I set myself the goal of viewing the data in a text list format first.


### Wins
My knowledge of array methods (particularly **.map**) improved during this project and I was pleased with the way I was able to manipulate my data into the correct format required by the React-charts plugin.

![Code Snippet 1](https://user-images.githubusercontent.com/47188720/60122298-ccd8a600-977c-11e9-9754-151441a9db59.png)

I was also pleased with functionality I managed to achieve on the 'train page'.
If a user has already entered a weight on the current day then the plus, minus, and submit buttons become disabled.

![Code Snippet 2](https://user-images.githubusercontent.com/47188720/60122370-f4c80980-977c-11e9-9a43-3382beaa96df.png)

![Code Snippet 3](https://user-images.githubusercontent.com/47188720/60122343-e4b02a00-977c-11e9-863e-569f7d7e9296.png)





### Challenges
I initially struggled to grasp SQL database relationships and how they affected my code.
I also had some issues with getting the page to re-render when certain aspects had been changed.






### Future enhancements
* **Body Weight Tracking** - Users body weight entries with tracking   
* **Images** - User body images to see physical results
* **GIFs** - Short GIFs added to ‘train’ page to demonstrate good form when carrying out the exercise
