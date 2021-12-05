# Unit 4: Introduction to SQL

## table of contents

- [Unit 4: Introduction to SQL](#unit-4-introduction-to-sql)
  - [table of contents](#table-of-contents)
  - [Introduction [\[1\]](#references)](#introduction-1)
  - [useful definitions](#useful-definitions)
  - [History of SQL](#history-of-sql)
  - [Defining a relational database schema in SQL](#defining-a-relational-database-schema-in-sql)
  - [Data manipulation with SQL](#data-manipulation-with-sql)
    - [SQL joins](#sql-joins)
  - [Union, intersection, and difference operations](#union-intersection-and-difference-operations)
  - [Relational operators](#relational-operators)
    - [grouping operators](#grouping-operators)
    - [Aggregation operators](#aggregation-operators)
    - [HAVING Clause](#having-clause)
  - [Sub-queries](#sub-queries)
    - [Sub-queries returning a scalar value](#sub-queries-returning-a-scalar-value)
    - [Sub-queries returning vector values](#sub-queries-returning-vector-values)
    - [Correlated sub-query](#correlated-sub-query)
    - [Sub-query in FROM Clauses](#sub-query-in-from-clauses)
  - [map OOP concepts to relational database concepts](#map-oop-concepts-to-relational-database-concepts)
  - [A rough guide to SQL [\[2\]](#references)](#a-rough-guide-to-sql-2)
  - [SQL Standards Support [\[3\]](#references)](#sql-standards-support-3)
  - [Short Guide to Data Types](#short-guide-to-data-types)
  - [References](#references)

## Introduction [\[1\]](#references)

there 3 categories of statements in the SQL language:

1. **Data Definition Language (DDL)**: used to create,alter, manipulate the objects within the DB.
2. **Data Manipulation Language (DML)**: used to read and manipulate data within the DB. most used in applications.
3. **Data Control Language (DCL)**: used to control access to the data within the DB. concerns about the security of the database.

## useful definitions

- **Authentication**: a user is who they say they are because they have the appropriate password.
- **Authorization**: restricts what a valid user **(authenticated user)** has access to and what kind of access they have.

## History of SQL

- created by Don Chamberlin and Ray Boyce from IBM in the 1970's as part of the System R project which meant to provide a practical implementation to Codd's relational model.
- SQL was adopted as a standard language in 1986 by the American National Standards Institute (ANSI) and by the International Standards Organization (ISO) in 1987.

## Defining a relational database schema in SQL

- SQL represents the **physical data model** of the schema **(conceptual data model)**
- A table whose column values depend on the values of other tables is called **dependant**, or child table
- and a table that is being referenced is called the **base** or parent table
- Referential integrity can be defined during table definition or after the table has been created
- define foregin key syntax

```sql
  Syntax 1:
  CREATE TABLE DEPENDANT_TABLE
  (ID INTEGER REFERENCES BASE_TABLE(UNIQUE_OR_PRIMARY_KEY), NAME VARCHAR(9));


  Syntax 2:
  CREATE TABLE DEPENDANT_TABLE
  (ID INTEGER, NAME VARCHAR(9),
  CONSTRAINT constraint_name FOREIGN KEY (ID) REFERENCES BASE_TABLE(UNIQUE_OR_PRIMARY_KEY)
  );



  Syntax 3:
  CREATE TABLE DEPENDANT_TABLE
  (ID INTEGER, NAME VARCHAR(9) );

  ALTER TABLE DEPENDANT_TABLE ADD CONSTRAINT constraint_name FOREIGN KEY (ID)
   REFERENCES BASE_TABLE(UNIQUE_OR_PRIMARY_KEY)
   ON DELETE <delete_action_type>
   ON UPDATE <update_action_type>;
```

- A delete action type can be a `CASCADE`, `SET NULL`, `NO ACTION`, or `RESTRICT`. An update action type can be a `NO ACTION`, or `RESTRICT`
- create a table with schema

```sql
  create schema mySchema
  create table mySchema.myTable (col1 integer)
```

- **view**: is a virtual table derived from one or more tables or other views. It is virtual because it does not contain any data, but a definition of a table based on the result of a SELECT statement.
- Views allow you to hide data or limit access to a select number of columns; therefore, they can also be used for security purposes.

```sql
    CREATE VIEW MYVIEW AS SELECT LASTNAME, HIREDATE FROM EMPLOYEE
    SELECT * FROM MYVIEW
```

- other database objects: 1. indexes 2. functions 3. procedures 4. triggers 5. ..etc
- rename DB object:

```sql
    RENAME <object type> <object name> to <new name>
    ALTER TABLE <table name> RENAME COLUMN <column name> TO <new name>
```

---

## Data manipulation with SQL

- A SELECT statement returns its result set in no particular order
- executing the same SELECT statement multiple times will generate same rows but in different order, adding **ORDER BY clause** will return the same order every times

```sql
    SELECT col1 FROM myTable ORDER BY col1 DESC
```

- **cursor**: is a result set holding the result of a SELECT statement. The syntax to declare, open, fetch, and close

```sql
    DECLARE <cursor name> CURSOR [WITH RETURN <return target>]
        <SELECT statement>;
    OPEN <cursor name>;
    FETCH <cursor name> INTO <variables>;
    CLOSE <cursor name>;
```

- Rather than returning all the rows of an SQL statement to an application at once, a cursor allows the application to process rows one at a time. Using FETCH statements within a loop in the application, developers can navigate through each row pointed by the cursor and apply some logic to the row or based on the row contents.
- For example, the following code snippet sums all the salaries of employees using a cursor

```sql
    DECLARE p_sum INTEGER;
    DECLARE p_sal INTEGER;
    DECLARE c CURSOR FOR SELECT SALARY FROM EMPLOYEE;
    DECLARE SQLSTATE CHAR(5) DEFAULT '00000';
    SET p_sum = 0;

    OPEN c;
    FETCH FROM c INTO p_sal;
    WHILE(SQLSTATE = '00000') DO
        SET p_sum = p_sum + p_sal;
        FETCH FROM c INTO p_sal;
    END WHILE;
    CLOSE c;
```

- copy the results of a table into another table, you need to be careful for the attributes order though:

```sql
    insert into myTable (select * from myTable2)
```

- delete statement:

```sql
DELETE FROM myTable WHERE col1 > 1000
```

- update statement:

```sql
    UPDATE myTable
        SET col1 = -1, col2 = ‘a’, col3 = ‘2010-01-01’
        WHERE col4 = ‘0’;
```

### SQL joins

1. inner joins: Equi-join, Natural join, Cross join
2. outer joins: Left outer join, Right outer join, Full outer join

| type              | definitions                                                                                                                                                                                                                                                                        |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Equal join (equi) | two tables are joined based on the equality of specified columns                                                                                                                                                                                                                   |
| natural join      | improved version of an equi-join where the joining column does not require specification. The system automatically selects the column with same name in the tables and applies the equality operation on it and remove all duplicate attributes. ambiguous, not liked by most DBs. |
| cross join        | Cartesian product of the tables to be joined                                                                                                                                                                                                                                       |
| left outer join   | the result set is a union of the results of an equi-join, including any non-matching rows from the LEFT table                                                                                                                                                                      |
| right outer join  | the union of results of an equi-join, including any non-matching rows from the RIGHT table.                                                                                                                                                                                        |
| full outer join   | the result set is the union of results of an equi- join, including any non-matching rows of the LEFT and the RIGHT table.                                                                                                                                                          |

examples:

```sql
    -- Example 1 (equi join):
    SELECT * FROM student, enrollment WHERE student.enrollment_no=enrollment.enrollment_no

    -- Example 2 (equi join):
    SELECT * FROM student INNER JOIN enrollment
        ON student.enrollment_no=enrollment.enrollment_no

    -- example 3 (natural join):
    SELECT * FROM STUDENT NATURAL JOIN ENROLLMENT

    -- Example 4 (cross join):
    SELECT * FROM STUDENT, ENROLLMENT

    -- Example 5 (left outer join):
    SELECT * FROM STUDENT
        LEFT OUTER JOIN ENROLLMENT
        ON STUDENT.ENROLLMENT_NO = ENROLLMENT_NO

    -- Example 6 (right outer join):
    SELECT * FROM STUDENT
        RIGHT OUTER JOIN ENROLLMENT
        ON STUDENT.ENROLLMENT_NO = ENROLLMENT_NO

    -- Example 7 (full outer join ):
    SELECT * FROM STUDENT
        FULL OUTER JOIN ENROLLMENT
        ON STUDENT.ENROLLMENT_NO = ENROLLMENT_NO

```

![types of outer join](https://i.imgur.com/CwfNL73.png)

---

## Union, intersection, and difference operations

| operation           | definition                                                                                                      |
| ------------------- | --------------------------------------------------------------------------------------------------------------- |
| union               | join two data sets having the same column definitions and in the same order. removes any duplicate rows.        |
| intersection        | returns a result set common to both data sets                                                                   |
| difference (EXCEPT) | returns the result set that exists only in the `RIGHT or First` table as `A EXCEPT B = A MINUS [A INTERSECT B]` |

examples

```sql
    -- Example 1 (union):
    SELECT * FROM student_table_a
        UNION
        SELECT * from student_table_b

     -- Example 2 (union with duplicates):
    SELECT * FROM student_table_a
        UNION ALL     -- duplicate rows will stay in the result
        SELECT * from student_table_b

    -- Example 3 (intersection):
    select * from student_table_a
        INTERSECT
        select * from student_table_b

    -- Example 4 (intersection with duplicates):
    select * from student_table_a
        INTERSECT ALL  -- duplicate rows will stay in the result
        select * from student_table_b
```

---

## Relational operators

- Basic mathematical operations like ‘+’, ‘-‘, ‘\*’ and ‘/’
- Logical operators like ‘AND’, ‘OR’ and ‘NOT’
- String manipulation operators like ‘CONCATENATE’, ‘LENGTH’, ‘SUBSTRING’
- Comparative operators like ‘=’, ‘<’, ‘>’, ‘>=’, ‘<=’ and ‘!=’
- Grouping and aggregate operators
- Other miscellaneous operations like DISTINCT

### grouping operators

- perform operations on two or more rows of data, and provide a summarized output result set

```sql
select course_enrolled, count(*)
    from students_enrollment
    group by course_enrolled
```

and the result from the above statement:

| COURSE_ENROLLED | STUDENT_COUNT |
| --------------- | ------------- |
| English         | 10            |
| Maths           | 20            |
| Physics         | 40            |

### Aggregation operators

- Operators, which perform on two or more tuples or rows, and return a scalar result set, are called aggregate operators.
- Examples include: `COUNT, SUM, AVERAGE, MINIMUM, MAXIMUM`, and so on.

### HAVING Clause

- can be used only with a GROUP BY clause to filter the desired rows in grouped data.
- basically, it is a `WHERE` clause but for `Grouped data`, since the `WHERE` clause can not work on grouped sets.

---

## Sub-queries

- When a query is applied within a query, the outer query is referred to as the main query or parent query and the internal query is referred as the sub-query or inner query
- sub query may return a scalar value, single or multiple tuples, or a NULL data set
- Sub-queries are executed first, and then the parent query is executed utilizing data returned by the sub-queries.

### Sub-queries returning a scalar value

- Scalar values represent a single value of any attribute or entity, for example Name, Age.
- The example below returns a list of students who are the youngest among all students.
- The sub-query “SELECT min(age) FROM students” returns a scalar value that indicates the minimum age among all students.
- The parent query returns a list of all students whose age is equal to the value returned by the sub-query.

```sql
  SELECT name FROM students_enrollment
    WHERE age = ( SELECT min(age) FROM students );
```

### Sub-queries returning vector values

- When a sub-query returns a data set that represents multiple values for a column (like a list of names) or array of values for multiple columns (like Name, age and date of birth for all students), then the sub-query is said to be returning vector values.
- the example will get a list of students who are enrolled in courses offered by the computer science department:

```sql
  SELECT name FROM students
    WHERE course_enrolled IN
      (
        SELECT distinct course_name
        FROM courses
        WHERE department_name = ‘Computer Science’
      )
```

- sub-query returns a list of all courses that are offered in the “Computer Science” department and the outer query lists all students enrolled in the courses of the sub-query result set.

### Correlated sub-query

- When a sub-query is executed for each row of the parent table, instead of once then the sub-query is referred to as a correlated sub-query.
- the example below searches for a list of students with who have been awarded maximum marks in each department.
- For each row on the LEFT table, the sub-query finds max(marks) for the department of the current row and if the values of marks in the current row is equal to the sub-query result set, then it is added to the outer query result set.

```sql
  SELECT dept, name, marks
    FROM final_result a WHERE marks =
      (
        SELECT max(marks) FROM final_result WHERE dept = a.dept
      )
```

### Sub-query in FROM Clauses

- A sub-query can be used in a FROM clause as well.

```sql
  SELECT dept, max_marks, min_marks, avg_marks
    FROM
      (
        SELECT dept,
        max(marks) as max_marks,
        min(marks) as min_marks,
        avg(marks) as avg_marks
        FROM final_result GROUP BY dept
      )
    WHERE (max_marks – min_marks) > 50 and avg_marks < 50
```

- The above query uses a sub-query in the FROM clause. The sub-query returns maximum, minimum and average marks for each department. The outer query uses this data and filters the data further by adding filter conditions in the WHERE clause of the outer query

## map OOP concepts to relational database concepts

- **Object-relational mapping (ORM)** libraries such as `Hibernate`, `pureQuery` are popular to provide a framework for this mapping between the object-oriented world and the relational world.

![MAP OOP concepts to relational database concepts](https://i.imgur.com/M0CMmOO.png)

- The table below shows the correspondence between conceptual, logical and physical model concepts

![The table below shows the correspondence between conceptual, logical and physical model concepts](https://i.imgur.com/sahsaW2.png)

---

---

## A rough guide to SQL [\[2\]](#references)

- data stored in the DB in a way that can not be read by humans that's why we need DBMS.
- in early days of DBs the **network and hierarchy** data models were the most popular.
- SQL is a relational database language, but **it is not a DBMS**, instead it is a **way to communicate** with the DBMS.
- SQL is **non procedural** database language, which means that when executing a a SQL command you don't need to run,compile a program for each query or define the location of data, DBMS will take care of that.
- **interactive SQL** can be run in the command line and output results to the console.
- **programmatic SQL** where SQL commands are embedded in a host language (COBOL, C.SQL).
- SQL needs a host language cause it is **not a complete programming language**, it has no branching or looping functionalities, so it relays on the host language to allow this.
- **VIEWS** are virtual tables, creating a view will create a new table in the database based on `select` statement provided when creating the view.
- the view then gets updated when any updates happen on the original table(s).
- when a new DB is created it is owned by the user who created it and have all privileges over it.

## SQL Standards Support [\[3\]](#references)

| SQL SECTION                      | COMMANDS                                                                                                      |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Data Definition Language (DDL)   | CREATE, ALTER, DROP, GRANT, REVOKE, COMMENT ON, EXPLAIN REFERENCES, DECLARE                                   |
| Data Manipulation Language (DML) | INSERT, UPDATE, DELETE, TRUNCATE, MERGE                                                                       |
| Data Query Language (DQL)        | SELECT, VALUES, WITH, EXPLAIN PLAN                                                                            |
| General operations on DB         | BACKUP, PERFORM, SCRIPS, CHECKPOINT, SHUTDOWN                                                                 |
| transaction statements           | START TRANSACTION, SET TRANSACTION, COMMIT, ROLLBACK, SAVEPOINT, RELEASE SAVEPOINT, LOCK, CONNECT, DISCONNECT |

## Short Guide to Data Types

- **Numeric** types **TINYINT, SMALLINT, INTEGER and BIGINT** with fixed binary precision, **NUMERIC and DECIMAL** are types with user-defined decimal precision. **DOUBLE** type is a 64-bit.
- **BOOLEAN** type is for logical values and can hold **TRUE, FALSE or UNKNOWN**.
- **Character string** types are **CHAR(L), VARCHAR(L) and CLOB**,

| type                                  | comments                                                                                                        |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| TINYINT, SMALLINT, INTEGER and BIGINT | fixed binary precision                                                                                          |
| NUMERIC and DECIMAL                   | user-defined decimal precision                                                                                  |
| DOUBLE                                | 64-bit                                                                                                          |
| CHAR(L)                               | fixed length strings, if you provide shorter strings, spaces will be added. if no L provided its a single char  |
| VARCHAR(L)                            | general strings, performance issues appear for long strings with this type, avoid in large strings (> 10\* KB). |
| CLOB                                  | for large strings, avoid for short strings                                                                      |
| LONGCHAR                              | a synonym for a long VARCHAR and can be used without specifying the size                                        |
| BINARY(L)                             | fixed length strings such as UUID, e pads short binary strings with zero bytes, if no L it is a single byte     |
| VARBINARY(L)                          | general binary strings                                                                                          |
| BLOB(L)                               | for large binary objects                                                                                        |
| LONGVARBINARY                         | used as VARBINARY without specifying the size, can be mapped to BLOB instead.                                   |
| BIT(L) and BITVARYING(L)              | avoid use without specifying L, use BOOLEAN for single bit.                                                     |
| UUID                                  | stored as BINARY. UUID and BINARY strings, can be used to insert or to compare.                                 |
| DATE, TIME, and TIMESTAMP, TIME ZONE  |                                                                                                                 |
| INTERVAL                              | used with datetime, not widely supported                                                                        |
| OTHER                                 | storage of json objects, if object is large, serialize and save as BLOB.                                        |
| ARRAY                                 | support all types **except OTHER, BLOB**                                                                        |

## References

- [1] Sharma, N., Perniu, L., Chong, R. F., Iyer, A., Nandan, C., Mitea, A. C., Nonvinkere, M., & Danubianu, M. (2010). Databases fundamentals. chapter 5.
- [2] Din, A. I. (2006). Structured Query Language (SQL): A practical introduction. NCC Blackwell. chapters 1 & 2. Retrieved from <http://www.managedtime.com/freesqlbook.php>.
- [3] Simpson, B., Toussi, F, & The HSQL Development Group. (2019, June 2). HyperSQL user guide. Chapter 2. Retrieved from <http://hsqldb.org/doc/2.0/guide/sqlgeneral-chapt.html>
