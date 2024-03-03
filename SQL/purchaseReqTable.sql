CREATE TABLE rrs_pr_number (
    id SERIAL PRIMARY KEY,
    pr_number INT,
    employee_name VARCHAR(255),
	employee_id INT,
    supplier VARCHAR(255),
    project_code VARCHAR(255),
    note TEXT,
    date_ VARCHAR(255)
);

INSERT INTO rrs_pr_number ("pr_number", "employee_name", "employee_id","project_code", "supplier", "note", "date_") VALUES (81000, 'BenG', 1, 'OTX', 'Webb', 'Cables, resitors and 85mm cables for project', '4 Dec 2023');

-- CREATE TABLE temp_user (
--     id SERIAL PRIMARY KEY,
--     employee_name VARCHAR(255),
-- 	employee_password VARCHAR(255)
-- );

-- INSERT INTO temp_user ("employee_name", "employee_password") VALUES ('BenG', "", 'OTX', 'Webb', 'Cables, resitors and 85mm cables for project', '4 Dec 2023');