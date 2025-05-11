
project structure
--------------------
backend-api/
├── controllers/
│   └── userControllers.js
├── db/
│   └── db.js
├── routes/
│   └── userRoutes.js
├── validators/
│   └── userValidator.js
├── .env
├── package.json
├── server.js
└── README.md

<!--  -->
npm install for install package 

<!-- to start server:  -->

npm start


<!-- payload are: -->

<!-- to save user  -->
request method : POST
url : http://localhost:3000/api/user/
payload: 
{
    "name": "Tushar sarin",
    "age": 23,
    "mobile": "8710704094",
    "email": "tusharsarin23@gmail.com",
    "interest": [
        "hockey",
        "music",
        "coding"
    ]
}

<!-- // fetch all user -->
 request method : GET
 url: http://localhost:3000/api/users

 fetch user based on the id
 request method : GET 
 url: http://localhost:3000/api/user/1


<!-- // update user -->
request method : put
url : http://localhost:3000/api/user/1
payload :
{
    "name": "Tushar Sarin",
    "age": 24,
    "mobile": "7610704094",
    "email": "tusharsarin478@gmail.com",
    "interest": [
        "hockey",
        "music",
        "coding"
    ]
}



<!-- delete user -->

request method : DELETE 
 url: http://localhost:3000/api/user/1
