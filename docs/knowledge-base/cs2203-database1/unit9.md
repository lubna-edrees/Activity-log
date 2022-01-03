# Unit 9: Data integrity, Views

## table of contents

- [Unit 9: Data integrity, Views](#unit-9-data-integrity-views)
  - [table of contents](#table-of-contents)
  - [Data integrity](#data-integrity)
    - [NOT NULL columns](#not-null-columns)
    - [data validity](#data-validity)
    - [table (Entity) integrity](#table-entity-integrity)
    - [referential integrity](#referential-integrity)
  - [SQL TRIGGERS](#sql-triggers)
  - [VIEWS](#views)
    - [updating VIEWS](#updating-views)
  - [database security](#database-security)
  - [transactions](#transactions)
  - [deadlock problem](#deadlock-problem)
  - [DBMS catalog](#dbms-catalog)
  - [LABEL, COMMENT command](#label-comment-command)
  - [References](#references)

## Data integrity

-   ensure that all new data are compatible with the existing relationships.
-   divided into 4 categories:
    1. NOT NULL columns: some columns must have values.
    2. data validity: ensures that the right values are inserted in columns.
    3. table integrity
    4. referential integrity.

### NOT NULL columns

-   checks apply to all INSERT / UPDATE statements.

### data validity

-   DBMS check that data type matches column type by default.
-   ORACLE has data validity checking built into its **data entry form package**.
-   it can also be at the application level.

### table (Entity) integrity

-   primary key must be unique within a table.

### referential integrity

-   all child rows must have a parent.
-   the foreign key (child) which references a primary key (parent) from other table, when a changes happens on the parent side, this change should be populated to all its children.
-   example <https://i.imgur.com/iBBBxfX.png>
-   when defining a foreign key, if you don't define the column then it will be **assumed to be the primary key**.
-   when defining the foreign key, you can choose what will happen when the parent get changed or deleted:
    1. prevent delete operation on the parent: <https://i.imgur.com/SDHoCTt.png>
    2. cascade changes to the children: <https://i.imgur.com/jKVLlYt.png>
    3. set children to NULL: <https://i.imgur.com/qIVPWUS.png>

---

## SQL TRIGGERS

-   **trigger**: is a set of operations that the DBMS must execute whenever there is a change in the content of a table.

```sql
CREATE TRIGGER UPDATE_BUDGET
    ON DEPARTMENTS
    FOR UPDATE
    AS UPDATE DEPARTMENTS
        SET PREVIOUS_BUDGET = BUDGET
        FROM DEPARTMENTS, INSERTED
        WHERE DEPARTMENTS.DEPT_NO = INSERTED.DEPT_NO
-- CREATES  a trigger to save the old budget values into previous_budget column whenever
-- departments table gets updated.
```

---

## VIEWS

-   the content of views are retrieved from other tables.
-   benefits of views:

    1. database security. restrict users access to only parts of a table.
    2. data integrity. insert data into a view and validate it **before inserting in the actual table**.
    3. shield form change. when the actual table structure change, the VIEW remains constant.
    4. easier querying. save repetitive complex queries into a VIEW, and access it easily.

-   **UNION** are not allowed in VIEW, since view can only have one query.

<center>
    <img src="https://i.imgur.com/gV4KLLD.png">
</center>

-   **VERTICAL VIEW** : the view has access to few columns of **all table rows**.
-   **HORIZONTAL VIEW**: the view have access to **all columns** of a few table rows.
-   you can always mix horizontal and vertical VIEWS.

```sql
CREATE VIEW FRESHMEN AS SELECT * FROM STUDENTS WHERE STUDENTS.YEAR = 1; -- vertical view

CREATE VIEW FRESHMEN AS SELECT NAME, SURNAME FROM STUDENTS; -- HORIZONTAL VIEW

CREATE VIEW FRESHMEN AS SELECT NAME, SURNAME FROM STUDENTS WHERE STUDENTS.YEAR = 1;
-- MIXED HORIZONTAL, VERTICAL VIEW

SELECT * FROM FRESHMEN; -- QUERYING A VIEW, ``DO QUERY ON A QUERY``
```

-   JOIN a VIEW to a base table is completely legal.
-   VIEWS can be used with sub-queries.

### updating VIEWS

-   updating data through a view can represent some issues.
-   unlike base tables, VIEWS allow you to use aggregate functions in CREATE VIEW statements, **these fields can not be updated later**.
-   for a VIEW to be updatable:

    1. the VIEW should specify one base table.
    2. VIEW should not have aggregate functions on its definition.
    3. VIEW should not use GROUP BY, or HAVING.
    4. VIEW should not use DISTINCT.
    5. VIEW should select only simple columns. scalar expressions or string constants are not allowed.
    6. VIEW must include all columns from the base table with **NOT NULL** modifier.

-   **WITH CHECK OPTION** is a modifier that can be added to the CREATE VIEW statement, and it will instruct SQL to check INSERT/UPDATE operations on the VIEW against the VIEW predicate. if the values in the INSERT/UPDATE conflict with the VIEW predicate, the operation will be rejected.
-   it is a good practice to use **WITH CHECK OPTION modifier in updatable VIEWS**.
-   removal of a VIEW will npt affect the base table.

---

## database security

-   ANSI/ISO standards define four privileges: SELECT, INSERT, UPDATE, DELETE.
-   table owner can GRANT/REVOKE access to other users.

<center>
    <img src="https://i.imgur.com/lO5Lphc.png">
    <p>GRANT statement</p>
</center>

<center>
    <img src="https://i.imgur.com/tesqiNk.png">
    <p>REVOKE statement</p>
</center>

-   you can use VIEWS to limit users access to columns in a table, the user must have SELECT privileges on the base table.
-   GRANT UPDATE allows you to specify individual columns that the granted user is allowed to update.
-   **WITH GRANT OPTION** modifier can be added to the GRANT statement allowing the grantee to grant privileges to other users
-   REVOKE only allows you to revoke privileges from users that you have granted, and it cascades down the chain to any users they have given privileges

```sql
GRANT ALL PRIVILEGES ON TABLE_NAME TO PUBLIC; -- GRANT ALL PRIVILEGES TO ALL USERS
GRANT UPDATE (COLUMN1) ON TABLE_NAME TO USER1; -- ALLOW USER1 TO UPDATE ONLY COLUMN1
```

---

## transactions

-   once a transaction started, it can only be ended by COMMIT, ROLLBACK, program termination, or system crash.
-   problems that can be faced with multiple users updating sam DB (concurrency control):

    1. lost update problem: 2 transactions happens at the same time, one is failed and rollback to its previous value overwriting the update of the successful transaction.
    2. temporary update problem: 2 transactions started at the same time, one makes a **temporary update** then fail and roll back, then that temporary update is saved by the 2nd transaction as its rollback point, if 2nd transaction fails, it will rollback to that temporary value.
    3. incorrect summary problem: a read operation that reads a **temporary value** set by another transaction, this information and everything generated based on it is wrong.

-   **data lock** can solve the previous issues.
-   2 types of data locks:
    1. **share locks**: allows **multiple** transactions to access te locked data, **but NOT modify it**. in **read operations**.
    2. **exclusive locks**: allows **one** transaction at a time, all other transactions are locked from it. in **update operations**.

---

## deadlock problem

-   happens when you have 2 transactions that updates the **same 2 (or more) tables**, 1st transactions might start updating t1 first and locks it. 2nd transaction might start updating t2 first and locks it. now both tables are locked to both transactions and **none of them can continue**.
-   when a deadlock is happen, **DBMS will arbitrarily kill one of the transactions** and roll it back, while the other one will continue.
-   deadlock example <https://i.imgur.com/WzN6QIW.png>

---

## DBMS catalog

-   **DBMS catalog** are tables created by the DBMS itself, DBMS does not allow modifying theses tables but users can query them.
-   DBMS uses these tables to track tables, columns, views, users, authorization-ids, and privileges.
-   system catalog is not in ANSI/ISO standards, so every commercial vendor implemented it in a different way.
-   in IBM o2 it, there is a db called **SYSIBM** that holds system catalog.
-   in ORACLE MYSQL this DB is called **information_schema**.

---

## LABEL, COMMENT command

-   label command allows to add comments to tables, views, or columns in a table.
-   comment command allows to add long description to tables and views only.

```sql
LABEL ON TABLE EXAMS IS 'holds information about all user exams taken';
LABEL ON COLUMN EXAMS.MARK IS 'the final results of the exam'.

COMMENT ON EXAMS (
    MARK IS 'the final mark',
    DATE IS 'the date the exam taken'
);
```

---

## References

-   [1] Din, A. I. (2006). Structured Query Language (SQL): A practical introduction. NCC Blackwell. chapters 6 & 7. Retrieved from <http://www.managedtime.com/freesqlbook.php>.
