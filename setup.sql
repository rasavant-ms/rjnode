CREATE USER rjnode WITH PASSWORD='yCEYaA83ZFgzgvuks8hZ'

EXECUTE sp_addrolemember db_datareader, "rjnode"
EXECUTE sp_addrolemember db_datawriter, "rjnode"

CREATE TABLE users
(
    id INT IDENTITY PRIMARY KEY,
    name NVARCHAR(255),
    email NVARCHAR(255)
);
