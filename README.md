# LostandFound Webapp using Nodejs and Mysql
## Prerequisites for the project

- Express
- Bootstrap
- Body-parser
- Node-mysql
- Popups
- Ejs
- Cookie-parser

Do ```npm install``` for all the above packages or npm install from package.json dependencies.

Then you have to install mysql server according to your platform.
After that,
Do the following 

1. Open cmd prompt and type mysql user:root  pass: root
2. ```create database mydb;```
3. ```use mydb;```
4. ```create table mytable1 (email VARCHAR(20), pass VARCHAR(20),sid VARCHAR(20));```
5. ```create table found (no int auto_increment,item varchar(20),descr varchar(200),fname varchar(20),email varchar(20),phone varchar(20),foundon varchar(10), primary key(no));```

Now start the server by executing on console ```node app.js```.

Your Webapp is now Live at localhost:3000  :+1:


## Table Schema
###### mytable1
email | pass | sid
----- | ---- | ---
hello@gmail.com | password | A5hsUHs4

###### found
no | item | descr(description) | fname | email | phone | foundon
-- | ---- | ------------------ | ----- | ----- | ----- | -------
1 | Phone | Samsung S8 plus Gold | Antony | antony12@gmail.com | 8574622164 | 12-10-2017

