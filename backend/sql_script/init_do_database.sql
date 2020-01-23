CREATE DATABASE to_do CHARACTER SET utf8mb4 COLLATE utf8mb4_polish_ci;
use `to_do`;
CREATE TABLE users (
id INT, 

email VARCHAR(150) NOT NULL, 
password VARCHAR(255) NOT NULL,
created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks(
id INT ,
user_id INT,
status ENUM('to_do', 'in_progress', 'done'),
description VARCHAR(1000) NOT NULL,
created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP

);
ALTER TABLE `users` ADD PRIMARY KEY (`id`);
ALTER TABLE `tasks` ADD PRIMARY KEY (`id`);
ALTER TABLE `tasks` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `users` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE tasks
ADD FOREIGN KEY (user_id) REFERENCES users(id);
