CREATE DATABASE bobi;
CREATE user 'pjt_bobi' identified with mysql_native_password BY 'mysql989312bobi#';
GRANT ALL PRIVILEGES ON bobi.* TO 'pjt_bobi'@'%';