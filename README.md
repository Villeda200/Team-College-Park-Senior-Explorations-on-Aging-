# Team-College-Park-Senior-Explorations-on-Aging-

1. SQL Database Setup (Forward Engineering from .mwb File)
1.1 Forward Engineering with .mwb File
Open the .mwb File:
Launch MySQL Workbench.
Go to File > Open Model, and select your .mwb file.
Verify the Schema:
Check the table structures, relationships, and constraints in the model to ensure everything is correctly defined.
Forward Engineer the Schema:
Go to Database > Forward Engineer.
Follow these steps in the wizard:
Select Connection: Choose your target MySQL server and connect.
Select Options: Ensure options like "Generate DROP Statements" and "Export Inserts" are checked if needed.
Target Database: You can either use an existing database or allow the tool to create a new one as defined in the model.
Review SQL Script: The system generates SQL commands to create the schema.
Execute the Script: Click Next to execute the script on the server.
Verify the Database:
Open the Schemas tab in Workbench to confirm that the database and its tables have been created.
1.2 Importing Data into Tables
You can now proceed with importing CSV data into the tables, as described in the earlier section:
Use the LOAD DATA INFILE command or the Table Data Import Wizard in Workbench.
1.3 View and Query Creation
Create Views:
CREATE VIEW your_view_name AS
SELECT column1, column2 
FROM your_table_name
WHERE condition;
Write Queries: 
SELECT * FROM your_table_name WHERE column_name = 'value';

2. SQL Shell Setup
2.1 Install MySQL Server
Download and install MySQL Server from MySQL Downloads
“MySQL Installer provides an easy to use, wizard-based installation experience for all your MySQL software needs. MySQL 5.7 - 8.0 installers includes the latest of versions of: 
MySQL Server
MySQL Router
MySQL Shell
MySQL Workbench and sample models
Sample Databases
Documentation


During installation, set the root user password.
2.2 Configure SQL Shell
Open a terminal or command prompt.
Use the mysql command to connect to the server:
mysql -u root -p
3. VSCode Environment Setup
3.1 Install VSCode
Download and install Visual Studio Code.
3.2 Install Necessary Extensions
Install the following extensions via the Extensions Marketplace:
Node.js Extension Pack for backend development.
MySQL for database management.
3.3 Install Node.js and npm
Download and install Node.js.
Verify installation:
node -v
npm -v
4. Cloning the GitHub Repository
4.1 Clone the Repository Open a terminal in your project directory.
Clone the repository:
git clone <insert clone URL here>
https://github.com/Villeda200/Team-College-Park-Senior-Explorations-on-Aging-.git 
Navigate to the project folder:
cd Team-College-Park-Senior-Explorations-on-Aging-
4.2 Install Project Dependencies
Open the terminal in VSCode.
Run the following commands to install required packages
cd backend
Npm install
cd ..
cd client
npm install
4.3 Using Knex in index.js
Knex Initialization:
Initialize Knex in the index.js file:

const db = knex({
    client: "mysql2",
    connection: {
        host: "localhost",
        user: "root",
        password: "your_password",
        database: `your_database_name`,
    },
});
Making Knex Available to Routes:
You include middleware to attach the db object to req, so it’s accessible in route handlers:
app.use((req, res, next) => {
    req.db = db;
    next();
});
Routing:
You serve static files and define routes (like /organizations) with access to db through req.db.
Exporting the db Object:
You export the db object at the end, allowing for reusability in other parts of the app:
module.exports = db;


Access the App:
In the terminal Open a browser and go to:
http://localhost:{PORT}
5. Connecting MySQL Database to VSCode Using MySQL Shell
5.1 Install the MySQL Shell Extension
Open VSCode and go to the Extensions Marketplace 
Search for "MySQL Shell for VSCode" and click Install.
Restart VSCode to ensure the extension is activated properly.

5.2 Set Up MySQL Shell for VSCode
Open the Command Palette (Ctrl+Shift+P or Cmd+Shift+P).
Search for "MySQL Shell: Add Connection" and select it.
Fill in the connection details:
Connection Name: A friendly name for your connection (e.g., MyLocalDB).
Host: localhost (or the IP address of your MySQL server).
Port: Default is 3306.
User: root (or another MySQL user).
Password: Your MySQL user’s password.
Schema: The database name you want to connect to (optional).
Save the connection.

5.3 Connecting to the Database
Open the MySQL Shell panel by clicking the MySQL icon in the VSCode activity bar.
Under Connections, find the one you just created.
Click the connection name to establish a session with the MySQL database.

5.4 Troubleshooting
If the extension fails to connect:
Verify your MySQL server is running and accepting connections.
Double-check your connection details, such as username, password, and host.
Ensure that the MySQL Shell (mysqlsh) is installed and added to your system’s PATH.




