-- Create the table
CREATE TABLE TabelaMea (
    Id INT PRIMARY KEY IDENTITY(1,1), -- Primary key with auto-increment
    Name NVARCHAR(100) NOT NULL,      -- Name column with a maximum length of 100 characters
    Value NVARCHAR(100) NOT NULL      -- Value column with a maximum length of 100 characters
);

-- Insert test data
INSERT INTO TabelaMea (Name, Value) VALUES ('TestName1', 'TestValue1');
INSERT INTO TabelaMea (Name, Value) VALUES ('TestName2', 'TestValue2');
INSERT INTO TabelaMea (Name, Value) VALUES ('TestName3', 'TestValue3');
INSERT INTO TabelaMea (Name, Value) VALUES ('TestName4', 'TestValue4');
INSERT INTO TabelaMea (Name, Value) VALUES ('TestName5', 'TestValue5');
