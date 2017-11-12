DROP TABLE IF EXISTS chat_messages;

CREATE TABLE chat_messages (
    id SERIAL PRIMARY KEY,
    message TEXT,
    author TEXT
);
