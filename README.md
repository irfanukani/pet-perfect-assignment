## Steps to Run :

1. Requirements -> Docker , NodeJs, TypeScript
2. Install Dependencies -> npm install OR yarn
3. First create one .env File in Root of the folder (Example is given in .env.example)
4. Now, Start the Local Instance of Postgres using docker-compose up command
5. Now, run -> npx prisma migrate
6. Now, run -> npx prisma generate 
7. You're ready to seed the database now!! Run -> ts-node ./seed.ts
8. Now start backend Api using -> ts-node server.ts

For any Queries : irfanukani2@gmail.com (email) , https://linkdein.com/irfanukani (linkedin)

Postman Collection Link : https://drive.google.com/file/d/1muasfD6mXB3pFDYSxXO6JO2H72FK813Y/view?usp=share_link

Architechture :

!["Image ER"](https://i.imgur.com/fWYoc5k.png)
