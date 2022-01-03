# Unit 5: DDL and DML Commands

- [Unit 5: DDL and DML Commands](#unit-5-ddl-and-dml-commands)
  - [Tables in SQL](#tables-in-sql)
    - [Database security (DCL)](#database-security-dcl)
  - [ANSI/ISO standards for DDL, DML](#ansiiso-standards-for-ddl-dml)
  - [Structure of SQL database](#structure-of-sql-database)
    - [single database architecture](#single-database-architecture)
    - [Multi database architecture](#multi-database-architecture)
  - [CREATE TABLE command](#create-table-command)
  - [Column and table modifiers](#column-and-table-modifiers)
    - [NOT NULL modifier](#not-null-modifier)
    - [UNIQUE modifier](#unique-modifier)
    - [INDEX modifier](#index-modifier)
    - [PRIMARY KEY modifier](#primary-key-modifier)
    - [FOREIGN KEY modifier](#foreign-key-modifier)
    - [DEFAULT modifier](#default-modifier)
    - [CHECK modifier](#check-modifier)
  - [INDEXes](#indexes)
  - [ALTER TABLE command](#alter-table-command)
  - [DROP TABLE command](#drop-table-command)
  - [INSERT command](#insert-command)
  - [UPDATE command](#update-command)
  - [DELETE command](#delete-command)
  - [References](#references)

---

## Tables in SQL

1. **Base Tables**: normal tables created by `CREATE TABLE` command, database object whose structure and data are both stored on the disk.
2. **Virtual Tables (Views)**: tables whose contents are driven from other **base tables**, only views structure is stored on the disk.

SQL DML can work on VIEWS as they do on BASE TABLES, but when modifying a VIEW, the data in its base tables still untouched.

-   a VIEW can be thought as **stored SELECT statement**.

### Database security (DCL)

-   VIEWS can be used to prevent access to sensitive information.
-   **GRANT, REVOKE** statements can also be used.

---

## ANSI/ISO standards for DDL, DML

-   The ANSI/ISO standards separates DDL from DML and assumes that RDBMS will not accept any DDL statements after the DB has been created.
-   commercial RDBMS allow you to execute any DDL statements at anytime with no separation between DDL and DML.
-   ANSI/ISO standards does not have `ALTER TABLE` or `DROP TABLE` commands.
-   ANSI/ISO standards force organizations to perform strict analysis process before creating the system, then the changes to the DB after that is not tolerated.

---

## Structure of SQL database

### single database architecture

-   ANSI/ISO standards specifies that the database schema consists of single large database with tables that owned by various users.
-   the ownership of tables **sub-classifies** them into different **virtual database groups**.
-   this called **single database architecture** and it is used by **Oracle, IBM DB2**.
-   disadvantages:
    -   over the time, tables will become very big and bulky.
    -   performing db adminstration tasks become very complex. eg: backups, performance analysis.

### Multi database architecture

-   tables are organized into several distinct databases.
-   used in **Sybase, SQL server, Ingres**.
-   disadvantages:
    -   maintaining foreign key references to keys in another databases becomes more complicated with time.

---

## CREATE TABLE command

<center>
  <img src="https://i.imgur.com/u9bzU8J.png" />
  <p>create table command. </p>
</center>

modifiers in the select statement:

1. **UNIQUE, INDEX**: both will create an index for this column.
2. **NOT NULL**.
3. **PUBLIC**: create a public table that can be accessed by any user of this DB.

---

## Column and table modifiers

-   modifiers can be applied to a COLUMN, or to **a group of columns at the TABLE level**.

### NOT NULL modifier

-   can be used on **a single column**.
-   prevent inserting NULL (empty) values for this column.
-   usually used for primary keys.

### UNIQUE modifier

-   prevent inserting new rows if there is a single row that has the same value(s) for this column(s).
-   makes sense only with **NOT NULL** columns.

### INDEX modifier

-   INDEX modifier is not part of ANSI/ISO standards but it is common in commercial databases.
-   creates an index based on the values stored in this column which speeds up the querying process.
-   most SQL systems will **create an index** for columns that are specified as **UNIQUE**.
-   index maintenance is taken care by the DBMS.

### PRIMARY KEY modifier

-   relatively new feature in SQL.
-   formally define a primary key.
-   column must be **NOT NULL** before apply PRIMARY KEY modifier.

### FOREIGN KEY modifier

-   define a reference for a PRIMARY KEY from another table.
-   syntax as `FOREIGN KEY (:column_name) REFERENCES (:other_table_name[.:primary_key_name])`

### DEFAULT modifier

-   define a value to be given to the column in case of supplying NULL.

### CHECK modifier

-   make custom validation on data before inserting it to the table.
-   syntax: `CREDITS NUMERIC(2) CHECK (CREDITS > 0 AND CREDITS <= 10)`
-   example ensures that all CREDITS inserted must be between 1 and 10.
-   it can also be applied at the table level to check combination of a **group of columns**,as in the example below

```sql
  CREATE TABLE Lecturers (
    ID NOT NULL PRIMARY KEY,
    Pay DECIMAL(6),
    Grade CHAR,
    CHECK ( Pay < 100000 OR Grade <= 'B' ) -- ensures that pay > 100000 only allowed if Grade is A or B.
  );
```

---

## INDEXes

-   index is a database object created and maintained by the DBMS.
-   speeds up querying process by keeping a **stored list of values** which the DBMS can search through.
-   **UNIQUE** modifier will always create an index for this column.
-   example of indexing table by city:

| CITY  | MEMORY LOCATION |
| :---: | :-------------: |
|  LDN  |   00124557887   |
|  LDN  |   00124478345   |
|  ...  |      ....       |
| PARIS |  001244533456   |
|  ...  |      ....       |

-   so all occurrences of LDN are sequentially listed **(ordered by city name)** in the index with their **memory location on the DISK** so the DBMS can quickly resolve the location of the row.

index disadvantages

1. use additional disk spae.
2. the write operations on this table become slower wince the DBMS needs to populate these changes to all indexes.

syntax:

```sql
  CREATE INDEX :index_name ON :table_name (:column_name);
  DROP INDEX :index_name;
```

---

## ALTER TABLE command

change the structure of a table:

-   **ADD** clause to add new columns.
-   **MODIFY** clause to modify existing columns.
-   **DROP** clause to drop existing columns.

<center>
  <img src="https://i.imgur.com/ZN13rXF.png" />
  <p>alter table command</p>
</center>

notes:

-   MODIFY clause can only allows changing **UNIQUE, NOT NULL** status of a column, to make more changes you need to **DROP the column and ADD a new one with the same name**.
-   ALTER table that is already populated with data is a risky process and can be a source of errors, for **fundamental** changes to a table with data, the best solution is to **CREATE a new table with the new structure and POPULATE it with the data from the old table**.
-   ALTER table needs all privileges to work.

---

## DROP TABLE command

before dropping a table, make sure that:

1. no files in the system query this table.
2. no references of this table in other tables as foreign keys.
3. no other VIEWS that are querying this table.

---

## INSERT command

-   you can insert single or multiple rows at once using the INSERT command.
-   INSERT syntax

```sql
INSERT INTO :table_name [(...:column_names)] VALUES (...:values), [, (...:values)*];
```

you can also insert multiple rows selected using SELECT statement as the example below:

```sql
INSERT INTO :table_name [(...:column_names)] {SELECT STATEMENT};
INSERT INTO ELITE_EXAMS (MARK, STUDENT) SELECT MARK, STUDENT_NO FROM EXAMS WHERE MARK  >= 80;

-- USING SUB-QUERIES
INSERT INTO LOW_BUDGET SELECT * FROM STUDENTS WHERE DEPT_NO IN
      (SELECT DEPT_NO FROM DEPARTMENTS WHERE BUDGET < 1000);
```

NOTES:

-   when using sub-queries in the INSERT statement, the SUB-QUERY **must NOT** make any reference to the table that it is **INSERTing in**.

---

## UPDATE command

-   update the values in a row.
-   needs 3 things: 1.table name. 2. updated column names. 3. updated values.
-   scalar expressions can be used in the SET clause.
-   examples:

```sql
UPDATE LECTURERS SET PAY = PAY * 1.1; --  increases the pay of all rows by 10%.

-- USING SUB-QUERIES
UPDATE EXAMS SET MARK = MARK + 4 WHERE SUB_NO = ANY (
    SELECT SUB_NO FROM SUBJECTS WHERE DEPT_NO = 1 -- sub-query
  ) ; -- increase exam marks by 4 in all subjects that belongs to department 1.

UPDATE EXAMS SET MARK = MARK + 4 WHERE SUB_NO = ANY (
    SELECT SUB_NO FROM SUBJECTS WHERE DEPT_NO =  (-- sub-query
      SELECT DEPT_NO FROM DEPARTMENTS WHERE DEPT_NAME = 'ENGINEERING' --  second-sub-query
    )
  ) ; -- increase exam marks by 4 in all subjects that belongs to the department of ENGINEERING.
```

---

## DELETE command

-   remove several or single row.
-   removes the entire row and **NOT part of it**.
-   if used **without predicate**, it will delete all rows in the table.
-   syntax:

```sql
DELETE FROM STUDENTS WHERE SURNAME = 'ALI' AND YEAR = 3;

-- BEST PRACTICE:  always delete using primary key, check row first using SELECT statement and grab its ID.
--                 then delete using that ID.
SELECT ID FROM STUDENTS WHERE SURNAME = 'ALI' AND YEAR = 3; // 16
DELETE FROM STUDENTS WHERE ID = 16;

```

---

## References

-   [2] Din, A. I. (2006). Structured Query Language (SQL): A practical introduction. NCC Blackwell. chapters 3 & 5. Retrieved from <http://www.managedtime.com/freesqlbook.php>.
