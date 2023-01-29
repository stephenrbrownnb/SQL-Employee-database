INSERT INTO department (name)
VALUES ( "Guest Services"),
       ( "Food and Beverage"),
       ( "Retail, Rental, and Repair"),
       ( "Outside Operations");

 INSERT INTO role (title, salary, department_id)  
Values ( 'Customer Service', 30000, 1),
       ( 'Server',20000, 2),
       ( 'Cashier', 30000, 3),
       ( 'Groomer', 60000, 4),
       ( 'Manager', 80000, 1);

INSERT INTO employee (first_name, last_name, role_id,manager_id)
Values  ('Jane', 'Doe', '2', null ),
        ('Jessy', 'Buck','5', null),
        ('Sue', 'Kidd', '3', null ),
        ('Bill', 'Nye', '4', null);
         
