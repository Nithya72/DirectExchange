drop database if exists DirectExchange;
create database DirectExchange;
use DirectExchange;

CREATE TABLE `DirectExchange`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL,
  `nickname` VARCHAR(45) NOT NULL,
  `password` VARCHAR(100) NULL,
  `registrationType` VARCHAR(45) NOT NULL,
  `emailVerified` TINYINT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `nickname_UNIQUE` (`nickname` ASC) VISIBLE
  );

CREATE TABLE exchange_offer (
  offer_id int NOT NULL AUTO_INCREMENT,
  src_country varchar(30) NOT NULL,
  src_currency varchar(3) NOT NULL,
  remit_amount integer NOT NULL,
  dest_country varchar(20) NOT NULL,
  dest_currency varchar(3) NOT NULL,
  exchange_rate integer,
  final_amount integer,
  exp_date date,
  counter_offer_flag boolean default true,
  split_offer_flag boolean default true,
  user_id integer,
  PRIMARY KEY (offer_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE counter_offer (
  counter_offer_id INT NOT NULL AUTO_INCREMENT,
  sender_user_id integer NOT NULL,
  sender_offer_id integer NOT NULL,
  counter_offer_amount integer,
  receiver_user_id integer NOT NULL,
  receiver_offer_id integer NOT NULL,
  receiver_initial_amount integer NOT NULL,
  PRIMARY KEY (counter_offer_id),
  FOREIGN KEY (sender_offer_id) references exchange_offer(offer_id) ON DELETE CASCADE,
  FOREIGN KEY (receiver_offer_id) references exchange_offer(offer_id) ON DELETE CASCADE
  --   foreign key sender_user_id, receiver user_id
  );


insert into exchange_offer (src_country, src_currency, remit_amount, dest_country, dest_currency, final_amount, exchange_rate, exp_date, counter_offer_flag, split_offer_flag, user_id)
values ('United States','USD','1000','India','INR', '74000', '74', '2020-12-31', true, true, 1);

insert into exchange_offer (src_country, src_currency, remit_amount, dest_country, dest_currency, final_amount, exchange_rate, exp_date, counter_offer_flag, split_offer_flag, user_id)
values ('United States','USD','1000','India','INR', '74000', '74', '2020-10-31', true, true, 1);

insert into exchange_offer (src_country, src_currency, remit_amount, dest_country, dest_currency, final_amount, exchange_rate, exp_date, counter_offer_flag, split_offer_flag, user_id)
values ('United States','USD','1014','India','INR', '75000', '74', '2020-12-14', true, true, 1);

insert into exchange_offer (src_country, src_currency, remit_amount, dest_country, dest_currency, final_amount, exchange_rate, exp_date, counter_offer_flag, split_offer_flag, user_id)
values ('United States','USD','500','India','INR', '37000', '74', '2020-12-31', true, true, 1);

insert into exchange_offer (src_country, src_currency, remit_amount, dest_country, dest_currency, final_amount, exchange_rate, exp_date, counter_offer_flag, split_offer_flag, user_id)
values ('United States','USD','1000','India','INR', '74000', '74', '2020-11-30', true, false, 2);

insert into exchange_offer (src_country, src_currency, remit_amount, dest_country, dest_currency, final_amount, exchange_rate, exp_date, counter_offer_flag, split_offer_flag, user_id)
values ('United States','USD','1000','India','INR', '74000', '74', '2020-12-31', false, true, 2);

insert into exchange_offer (src_country, src_currency, remit_amount, dest_country, dest_currency, final_amount, exchange_rate, exp_date, counter_offer_flag, split_offer_flag, user_id)
values ('India','INR','75000','United States','USD','1014', '74', '2020-12-31', false, true, 3);

insert into exchange_offer (src_country, src_currency, remit_amount, dest_country, dest_currency, final_amount, exchange_rate, exp_date, counter_offer_flag, split_offer_flag, user_id)
values ('India','INR','74000','United States','USD','1000', '74', '2020-09-30', true, true, 6);

insert into exchange_offer (src_country, src_currency, remit_amount, dest_country, dest_currency, final_amount, exchange_rate, exp_date, counter_offer_flag, split_offer_flag, user_id)
values ('India','INR','74000','United States','USD','1000', '74', '2020-12-14', true, true, 6);

insert into exchange_offer (src_country, src_currency, remit_amount, dest_country, dest_currency, final_amount, exchange_rate, exp_date, counter_offer_flag, split_offer_flag, user_id)
values ('India','INR','75000','United States','USD','1014', '74', '2020-12-31', true, true, 7);

insert into exchange_offer (src_country, src_currency, remit_amount, dest_country, dest_currency, final_amount, exchange_rate, exp_date, counter_offer_flag, split_offer_flag, user_id)
values ('India','INR','44400','United States','USD','600', '74', '2020-12-31', true, true, 4);

insert into exchange_offer (src_country, src_currency, remit_amount, dest_country, dest_currency, final_amount, exchange_rate, exp_date, counter_offer_flag, split_offer_flag, user_id)
values ('India','INR','81400','United States','USD','1100', '74', '2020-12-31', true, true, 9);

insert into exchange_offer (src_country, src_currency, remit_amount, dest_country, dest_currency, final_amount, exchange_rate, exp_date, counter_offer_flag, split_offer_flag, user_id)
values ('India','INR','79994','United States','USD','1081', '74', '2020-09-30', true, true, 8);

insert into exchange_offer (src_country, src_currency, remit_amount, dest_country, dest_currency, final_amount, exchange_rate, exp_date, counter_offer_flag, split_offer_flag, user_id)
values ('India','INR','29600','United States','USD','400', '74', '2020-12-31', true, true, 5);

insert into exchange_offer (src_country, src_currency, remit_amount, dest_country, dest_currency, final_amount, exchange_rate, exp_date, counter_offer_flag, split_offer_flag, user_id)
values ('India','INR','37000','United States','USD','500', '74', '2020-12-31', true, true, 6);

insert into exchange_offer (src_country, src_currency, remit_amount, dest_country, dest_currency, final_amount, exchange_rate, exp_date, counter_offer_flag, split_offer_flag, user_id)
values ('India','INR','7000','United States','USD','100', '74', '2020-12-31', true, true, 10);