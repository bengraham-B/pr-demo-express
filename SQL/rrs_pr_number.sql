CREATE TABLE rrs_pr_number (
    id SERIAL PRIMARY KEY,
    pr_number INT,
    employee_name VARCHAR(255),
    supplier VARCHAR(255),
    project_code VARCHAR(255),
    note VARCHAR(255),
    date_ DATE

);

INSERT INTO 
rrs_pr_number 
    ("pr_number", "employee_name", "supplier", "project_code", "note", "date_")
    
VALUES 
    (81000, 'Initial PR', 'Initial PR', 'Initial PR', 'Initial PR', CURRENT_DATE);


