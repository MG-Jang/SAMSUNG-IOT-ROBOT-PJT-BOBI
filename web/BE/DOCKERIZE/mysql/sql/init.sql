CREATE DATABASE todoList;
CREATE user 'user' identified with mysql_native_password BY 'password';
GRANT ALL PRIVILEGES ON todoList.* TO 'user'@'%';