# LostandFound Webapp using Nodejs and Mysql
Requisites for the project

1. Express
2. Bootstrap
3. body-parser
4. node-mysql
5. popups
6. ejs

Do npm install for all the above packages or npm install from package.json dependencies.

Then you have to install mysql server according to your platform.
After that,
Do the following 
1. Open cmd prompt and type mysql user:root  pass: root
2. Create database mydb;
3. Use mydb;
4. create table mytable1 (email VARCHAR(20), pass VARCHAR(20));
5. create table found (item varchar(20),descr varchar(20),fname
varchar(20),email varchar(20),phone varchar(20),foundon varchar(10));

keep it running.
Now open the nodejs project in another cmd prompt and do 

node app.js

Thanks, 
Athul
