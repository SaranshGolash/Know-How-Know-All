CREATE TABLE users (
	user_id SERIAL PRIMARY KEY,
	full_name VARCHAR(255) NOT NULL,
	email VARCHAR(255) UNIQUE NOT NULL,
	password_hash VARCHAR(255) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

CREATE TABLE purchases (
    purchase_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    course_title VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_status VARCHAR(50) DEFAULT 'completed',
    purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE users ADD COLUMN xp_points INT DEFAULT 0;
ALTER TABLE users ADD COLUMN current_streak INT DEFAULT 0;