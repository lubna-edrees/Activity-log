# Unit 7: Database Programming

## Table of contents

- [Unit 7: Database Programming](#unit-7-database-programming)
  - [Table of contents](#table-of-contents)
  - [objectives](#objectives)
  - [SQL in applications](#sql-in-applications)
  - [transactions](#transactions)
  - [Embedded SQL](#embedded-sql)
  - [static SQL](#static-sql)
    - [SQL communications area, SQLCODE and SQLSTATE](#sql-communications-area-sqlcode-and-sqlstate)
    - [pre-compiling of embedded SQL](#pre-compiling-of-embedded-sql)
  - [dynamic SQL](#dynamic-sql)
  - [Static vs. dynamic SQL](#static-vs-dynamic-sql)
  - [Database APIs](#database-apis)
  - [ODBC and the IBM Data Server CLI driver](#odbc-and-the-ibm-data-server-cli-driver)
  - [pureQuery Client Optimizer](#purequery-client-optimizer)
  - [References](#references)

## objectives

-   The concept of transaction
-   Working with embedded SQL
-   The differences between static and dynamic SQL
-   Database APIs like ODBC, CLI and JDBC
-   An introduction to pureQuery

---

## SQL in applications

-   **host language**: a programming language that you embed SQL commands in, like c, c++, java..
-   some techniques allow to use the API of the database itself to execute SQL, like: ODBC, CLI, JDBC.

---

## transactions

-   **transaction** is a unit of work or a set of database operations which all they need to be executed successfully in order to call the transaction successful.
-   at the end of a transaction you can **commit or roll back** to maintain data integrity.

---

## Embedded SQL

-   embed SQL commands inside a high-level programming language.
-   compiling these applications needs 2 steps:
    -   pre-compilation: the DBMS will provide a pre-compiler compatible with the programming language that will compile embedded SQL into the DBMS run-time API calls.
    -   normal compilation of the host language where the pre-compiled code get linked to the host language development tools.
-   in c, c++, COBOL the statement initializer `EXEC SQL` is used to identify embedded SQL, as:

```c++
EXEC SQL UPDATE employee.details SET emp_desig = 'Mgr' WHERE emp_desig = 'Asst Mgr';
```

-   in java, applications with embedded SQL called **SQLJ** and the statement initializer is `#sql`, as:

```java
#sql { UPDATE employee.details SET emp_desig = 'Mgr' WHERE emp_desig = 'Asst Mgr'};
```

---

## static SQL

-   Static SQL applications are designed for scenarios where the applications need to issue the same SQL statements every time it interacts with the database
-   An embedded SQL application where the syntax of the SQL is fully known beforehand and where the SQL statements are hard-coded within the source code of the application is known as a **static embedded SQL application**.
-   The only input(s) that can be fed to the SQL statements from the application are the actual data values that need to be inserted into the table or the predicate values of the SQL statements. These input values are provided to the SQL statements using **host variables**.
-   **host variables** are programming language variables that should only be used for static SQL processing. These host variables need to be declared in the application prior to using them.
-   a good practice is to append the host variable names with ‘\_hv’ to differentiate them from other variables as well as from column names

### SQL communications area, SQLCODE and SQLSTATE

-   **The SQL Communications Area (SQLCA)** is a data structure that is used as a communication medium between the database server and its clients. The SQLCA data structure comprises of a number of variables that are updated at the end of each SQL execution
-   **SQLCODE** is one such variable in SQLCA which is set to 0 (zero) after every successful SQL execution. If the SQL statement completes with a warning, it is set with a positive, non-zero value; and if the SQL statement returns an error, it is set with a negative value. it correspond to either hardware-specific or operating system-specific issues;
-   **SQLSTATE** is another variable in SQLCA which stores a return code as a string that also indicates the outcome of the most recently executed SQL statement. However, SQLSTATE provides a more generic message that is standardized across different database vendor products.

### pre-compiling of embedded SQL

-   The pre-compiler checks for SQL statements within the source code, replaces them with equivalent runtime APIs supported by the host language and re-writes the entire output (with commented SQL statements) into a new file which can then be compiled and linked using the host language development tools.
-   pre-compiler performs the following tasks:

    -   It validates the SQL syntax for each coded SQL statement and ensures that appropriate data types are used for host variables by comparing them with their respective column types. It also determines the data conversion methods to be used while fetching or inserting the data into the database.
    -   It evaluates references to database objects, creates **access plans** for them and stores them in a **package** in the database. An access plan of an SQL statement is the most optimized path to data objects that the SQL statement will reference
    -   each application is **bound** to its respective package residing on the database. so that every time the application is run, the access plan for the corresponding SQL statement is fetched from the package and used. This makes SQL execution very fast in the database, since the most optimized way of accessing the required database objects is already known in advance.

-   we could **redefine static SQL statements** to be the ones whose access plan can be determined and known in advance and stored in the database for faster execution. Thus for an SQL statement to be embedded statically in an application, **its syntax must be known at pre-compile time**.

<center>
    <img src="https://i.imgur.com/PCTXRvn.png" />
    <p>[source: \[1\] ](#references) </p>
</center>

---

## dynamic SQL

-   Dynamic SQL statements include parameters whose values are not known until runtime, when they are supplied as input to the application.
-   the **access plans** for dynamic SQL queries can only be generated at **runtime**.
-   **parameter marker** is the question mark (?) used in a statement,used in place of predicate values.
-   statements with parameter markers need **access plan before they get executed**, so we **prepare** the statement to get the access plan.
-   the exact SQL that needs to be issued is generated only at **execution time** where we have to replace the marker with an **actual value** to the predicate.
-   applications with dynamic SQL contains **some static SQL statements** needed for **statement preparation, cursor declarations, and so on**. This would mean that such applications would also **require pre-compilation**.
-   If there is a way to replace all such static SQL statements by equivalent APIs, the pre-compilation/SQL translation of the application **would not be required at all**.

---

## Static vs. dynamic SQL

1.  Unlike static SQL statements, access plans for dynamic statements are generated only at runtime; hence, dynamic statements need to be prepared in the application.
2.  The time taken to generate an access plan at runtime makes dynamic SQL applications a little **slower** than static SQL. However, they offer much more flexibility to application developers and hence, are **more robust** than static SQL applications.
3.  Sometimes a dynamic SQL statement performs better than its static SQL counterpart, because it is able to exploit the latest statistics available in the database at the time of execution. The access plan generated for a static SQL statement is stored in advance and may become outdated in case certain database statistics change, which is not the case with dynamic SQL
4.  whenever the application is modified or upgraded, If the static SQL part of the application is modified, then regeneration of access plans would be needed. This means pre-compilation of the application and rebinding of packages would have to be done again. In the case of dynamic SQL execution, since the access plans are generated at runtime, pre-compilation and rebinding is not needed.

---

## Database APIs

-   a **connection to the database is required** while pre-compiling the embedded SQL application, since in order to generate access plans, statistics information from the database catalog is required.
-   **Database APIs** are a set of APIs exposed by database vendors pertaining to different programming languages like C, C++, Java and so on, which gives application developers a mechanism to interact with the database from within the application by just calling these SQL callable interfaces.
-   **database connectivity driver** is tThe intermediate layer between the application and the database server, which makes this interaction possible.
-   The database vendors themselves provide these **drivers** and once the driver libraries are linked with the source code libraries, the application source code can be easily compiled and then executed.
-   Applications can now be developed **independently** of target databases, without the need for database connection at the compilation phase.

---

## ODBC and the IBM Data Server CLI driver

> _CLI here means Call level Interface._

-   the X/Open Company and the SQL Access Group jointly developed a specification for a **callable SQL interface** referred to as the **X/Open** Call Level Interface. which accepted as part of the ISO Call Level Interface International Standard in **1995**.
-   Microsoft developed a callable SQL interface called **Open Database Connectivity (ODBC)**.
-   The IBM Data Server CLI driver is the **DB2 Call level Interface** which is based on the Microsoft® ODBC specifications, and the International Standard for SQL/CLI.
-   The **DB2 CLI** is a C and C++ is an API for relational database access that uses function calls to pass dynamic SQL statements as function arguments, means that there would be no need for any static EXEC SQL statements in the application.

```java
SQLCHAR *stmt = (SQLCHAR *)"UPDATE employee.details SET emp_id = ? WHERE emp_name = ? ";
/* prepare the statement */
int rc = SQLPrepare(hstmt, stmt, SQL_NTS);
```

-   IBM CLI offers other callable interfaces like SQLConnect(), SQLFetch(), SQLExecute, and so on.
-   The ODBC specifications also includes an operating environment, where database specific ODBC Drivers are **dynamically loaded at runtime** by a driver manager based on the data source (database name) provided on the **connect request**.

<center>
    <img src="https://i.imgur.com/zGuJjXY.png" />
    <p>[source: \[1\] ](#references) </p>
</center>

-   **Java Database Connectivity (JDBC)**: it is an SQL application programming interface similar to ODBC and CLI, but for Java applications.
-   **pureQuery**: is a platform offered to Java developers that exploits the advantages of dynamic SQL without having to bother about preparation and object mapping overheads.

```java
//The name, country, street and province are variables which would be populated at runtime using user inputs.
String sqlSel = "select “+name+”, ” +country+”, “+street+”, “+province+”, “+zip+” from CUSTOMER where Customer = ?";
Data data = DataFactory.getData (con);
//execute the Select and get the list of customer
List<Customer> customerList = data.queryList (sqlSel, Customer.class, "custCountry");
// pureQuery API queryList will execute the sqlSel statement with the predicate value “custCountry”
// and return the query results into cutomerList.
```

---

## pureQuery Client Optimizer

Using the pureQuery Client Optimizer, the following steps need to be undertaken:

-   When the dynamic application is first run, the pureQuery Client Optimizer captures the different SQL statements issued from an application into a **pureQueryXml** capture .
-   The captured SQL statements in the XML file are then **divided into packages**, by running the command line tool **Configure**.
-   Using the **staticBinder**, these **packages are then created on the database server** and the application is bound to these packages.
-   Finally, the execution mode of the application needs to be set to **static**, which allows some of the SQL statements to run in static mode.

each SQL issued from the application is **matched** with the SQL statements captured in the capture file. As soon as a match is found, the corresponding package details are fetched from the capture file and since the SQL is already bound to the corresponding package at the database server, the statement can be run statically.

Each new SQL, which does not find a match, stills runs in dynamic execution mode.

---

## References

-   [1] Sharma, N., Perniu, L., Chong, R. F., Iyer, A., Nandan, C., Mitea, A. C., Nonvinkere, M., & Danubianu, M. (2010). Databases fundamentals. chapter 7.
