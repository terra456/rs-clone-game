create TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR (50) NOT NULL,
  password VARCHAR (50),
  avatar VARCHAR (255),
  settings VARCHAR,
  lastLevel smallint,
  totalScore int,
  date timestamp
);

create TABLE wins (
  id SERIAL PRIMARY KEY,
  user_id int,
  date VARCHAR (50),
  level smallint,
  dificulty VARCHAR (50),
  score int,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

create TABLE saved (
  id SERIAL PRIMARY KEY,
  user_id int,
  name  VARCHAR (50) NOT NULL,
  date VARCHAR (50),
  level smallint,
  dificulty VARCHAR (50),
  score int,
  state VARCHAR,
  FOREIGN KEY (user_id) REFERENCES users (id)
);