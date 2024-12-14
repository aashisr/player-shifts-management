CREATE DATABASE IF NOT EXISTS player_shifts_management;
CREATE USER 'admin'@'%' IDENTIFIED BY 'strongPassword';
GRANT ALL PRIVILEGES ON player_shifts_management.* TO 'user'@'%';
FLUSH PRIVILEGES;