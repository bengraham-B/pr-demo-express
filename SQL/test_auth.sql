CREATE TABLE test_auth (
	id SERIAL PRIMARY KEY,
	user_name VARCHAR(255),
	password_ VARCHAR(255),
	admin_status VARCHAR(255)
)

INSERT INTO test_auth("user_name", "password_", "admin_status") 
    Values ('samt', 'pass', true);