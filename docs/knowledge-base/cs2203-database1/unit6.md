# Unit 6: Querying the Database using SQL

- [Unit 6: Querying the Database using SQL](#unit-6-querying-the-database-using-sql)
  - [Useful Definitions](#useful-definitions)
  - [SELECT statement](#select-statement)
  - [Cartesian Product](#cartesian-product)
    - [Example: Cartesian product](#example-cartesian-product)
      - [cartesian product of 3 tables](#cartesian-product-of-3-tables)
  - [WHERE Clause](#where-clause)
  - [BETWEEN Operator](#between-operator)
  - [IN operator](#in-operator)
  - [LIKE operator](#like-operator)
    - [ESCAPE Clause](#escape-clause)
  - [NULL operator](#null-operator)
  - [AND, OR, NOT Operators](#and-or-not-operators)
  - [ORDER BY clause](#order-by-clause)
  - [aggregate functions](#aggregate-functions)
  - [COUNT() aggregate function](#count-aggregate-function)
  - [SUM() aggregate function](#sum-aggregate-function)
  - [AVG() aggregate function](#avg-aggregate-function)
  - [MIN() and MAX() aggregate functions](#min-and-max-aggregate-functions)
  - [GROUP BY clause](#group-by-clause)
  - [HAVING clause](#having-clause)
  - [SQL JOINS](#sql-joins)
  - [self join](#self-join)
  - [nested SELECT statements (sub-queries)](#nested-select-statements-sub-queries)
  - [linked SELECT statements (correlated sub-query)](#linked-select-statements-correlated-sub-query)
  - [EXISTS operator](#exists-operator)
  - [ANY, ALL operators](#any-all-operators)
  - [UNION clause](#union-clause)
  - [References](#references)

## Useful Definitions

-   projection in a SQL statement: selecting a subset of the whole attribute set of a relation. eg. selecting only ID of a full table (select subset of columns).
-   **scalar expressions**: simple calculations can be performed on **NUMERIC** type column values.
-   **predicate**: logical expression that can either be true or false.
-   **synonyms**: permanent aliases for table names, different from the normal table name aliases which only lasts while the query is being executed. available in **ORACLE**.

## SELECT statement

-   most complex statement of ANSI/ISO SQL.
-   has 6 different clauses.
-   2 required information: COLUMN_NAME and TABLE_NAME.

![select statement anatomy](https://i.imgur.com/DuvjPgN.png)

-   the six clauses are:

    1. DISTINCT : eliminate the duplicate rows form the query, useful to know values in the table regardless of how many times they have appeared, opposite is **ALL**.
    2. FROM
    3. WHERE
    4. ORDER BY
    5. GROUP BY
    6. HAVING: eliminate part of the results depending on a condition.

-   field_expression (in the image above) can be:

    1. field name eg. ID. (field names (columns) in SQL are limited to 24 characters length).
    2. ANSI aggregate function as: SUM(), AVG(), MIN(), MAX(), COUNT().

-   when using \* in SELECT statement, columns in the result appear in the order they defined in the table.
-   when specifying the column to select, the column will appear in the result in the order that specified in the statement.
-   select statement allows you to use **scalar expressions and constant string** to specify column names.
-   scalar expressions allow for dynamic or calculated column names, but the column **MUST** have numeric type or it will throw an error.

  <center>
      <img src="https://i.imgur.com/82FO0Vm.png"/>
      <p>scalar expressions in select statements</p>
  </center>
  
-   lateral strings will appear for each row, they can be enclosed in single or double quotes.

  <center>
    <img src="https://i.imgur.com/vcl78kB.png" />
    <p>constant (lateral) strings in the select statements</p>
  </center>

---

## Cartesian Product

-   when you specify more than one table in the FROM clause, this will produce the cartesian product of the result.
-   for every row from the left set, a new row **matching every single row of the right set** will be generated.
-   if we have 2 rows in the left set, and 3 rows in the right set, the final result will contain 6 rows as in the example below.
-   The cartesian product is not limited to 2 tables, but this can grow quickly with adding more .
-   this is not very useful in real-life, but good for science or AI purposes.

### Example: Cartesian product

<center>
    <img src="https://i.imgur.com/4N0QMkh.png">
    <p>we have 4 cars in the cars table</p>
</center>

<center>
    <img src="https://i.imgur.com/jGLTd48.png">
    <p>and 2 rows in the sale table</p>
</center>

when we execute `SELECT YEAR, Tax FROM cars, sale;` we got a result of 8 rows, where every YEAR from cars appears in a row with every Tax from sale

<center>
    <img src="https://i.imgur.com/O7OD8jj.png">
    <p>Notice that YEAR 1983 appears twice one with Tax 1.298 and one with Tax 1.656. and the same is true for **EVERY YEAR**.</p>
</center>

#### cartesian product of 3 tables

<center>
    <img src="https://i.imgur.com/3uNBEij.png"  />
    <p>Notice how the final results gone up to 48 row, although we have 4, 2, 4 rows in every table respectively.</p>
</center>

---

## WHERE Clause

-   lets you specify **predicate** that tells SQL which rows should appear on the results.
-   when processing a query with a predicate, DBMS goes through all the rows and evaluate the condition to true or false, this process can be **speed up using indexes**.
-   operators allowed in WHERE clause include: **\>, <, =,<=, \>=, <>**, <> means **not equal**.
-   mathematical operators of WHERE clause can work on **NUMERIC, CHAR** types.
-   those operators can be used in CHAR based column types, the operating system matters in this case where it uses **ASCII** or **EBCDIC** system. it is also case sensitive.
-   in **ASCII**, uppercase chars known has **lower** values than lowercase chars.

<center>
    <img src="https://i.imgur.com/WDG12Lp.png" />
    <p>using comparison operators with CHAR based values </p>
</center>

---

## BETWEEN Operator

-   known as **range test operator** and allows to define a predicate in the form of a range.
-   the BETWEEN range test determines the lower boundary of the range, and should be followed by **AND** to specify the upper boundary of the range.
-   value of BETWEEN should be **lower than** the value of AND.
-   upper and lower boundaries are **inclusive**.

<center>
    <img src="https://i.imgur.com/IpZbk30.png" />
    <p>using between operator in NUMERIC and CHAR based columns. </p>
</center>

-   between does not add functionality to SQL, as it can be rephrased using WHERE, AND operators, aas shown in the photo below

<center>
    <img src="https://i.imgur.com/2ixAM1q.png" />
    <p>rephrase BETWEEN operator to use AND. </p>
</center>

---

## IN operator

-   know as **set membership test operator**.
-   returns true when the value is in the provided set.
-   set values must be comma separated in between parentheses.
-   IN operator can be rephrased using **OR** operator.

<center>
    <img src="https://i.imgur.com/kRUpps8.png" />
    <p>IN operator, and rephrase of IN using OR operator</p>
</center>

---

## LIKE operator

-   known as **pattern matching test operator**.
-   uses characters like **%, \_** as wildcard characters.
-   useful when you don't know the exact word that you are searching for.
-   \_ indicates **one valid character**, while % indicates **multiple chars**.
-   \_ and % can be combined.

<center>
    <img src="https://i.imgur.com/Ab5F2UC.png"
    <p>using % and _ as wild characters in **LIKE** operator</p>
</center>

### ESCAPE Clause

-   if % or \_ are part of the string you need to use **ESCAPE** clause when using LIKE operator.
-   you need to define a char (mostly $) before the char that you want to escape, and then add that char to **ESCAPE** clause.
-   ESCAPE clause is not widely supported.

<center>
    <img src="https://i.imgur.com/1YSSng5.png" />
    <p>using ESCAPE clause with LIKE operator so \_ and % can be treated as normal letters</p>
</center>

---

## NULL operator

-   known as **value test operator**.
-   checks if a value has **been set** or not, empty string and 0 are **NOT NULL**.
-   checks for NULL in unknown column will return all rows in the table or throws an error(depending on SQL and DBMS versions).
-   works as `column = NULL` or `column IS NULL`.
-   the opposite statement would be `column <> NULL` or `column IS NOT NULL`.

<center>
    <img src="https://i.imgur.com/jsY17U9.png" />
    <p>using NULL, IS NULL, NOT NULL, IS NOT NULL operators.</p>
    <p>Note that `column <p> NULL` and `column != NULL` did not work on this version of SQL. </p>
</center>

---

## AND, OR, NOT Operators

-   known as **Logical operators**
-   logical operator links multiple predicates within a single WHERE clause.
-   you can group expressions by using parentheses.

---

## ORDER BY clause

-   by default SQL orders the results **arbitrarily** depending on the order in which the rows have been found which in turn depends on **the location of these rows on the disk and the location of the objects representing these rows in `server's memory`**.
-   you can use ORDER BY clause with **column name** to order on.
-   you can use more than one column name, then SQL will ORDER BY will use first column as primary ordering column, the second column as secondary and so on.
-   ANSI/ISO standards requires the columns that you ORDER BY to appear in the results, so they have to be included in the SELECT statement.
-   you can always use the column index (starts from 1) instead of the column name as:

```sql
    SELECT ID, NAME FROM T ORDER BY NAME DESC;
    -- is equal to this statement
    SELECT ID, NAME FROM T ORDER BY 2 DESC; -- 2 is the index of column NAME in the select statement, ID has index 1
```

---

## aggregate functions

-   5 functions that can be used to summarize data in tables as they operate on the table data and generate a single value as output.
-   **COUNT()**: number of rows or columns the query selects, no rows are returned except the count.
-   **SUM()**.
-   **AVG()**.
-   **MIN()**.
-   **MAX()**.
-   you **can NOT** nest the aggregate functions, or mix regular columns and aggregate functions in the same query.

---

## COUNT() aggregate function

-   it has 2 types:
    1. counts **and lists** the number of all **non-NULL** values in a particular column, using **DISTINCT keyword before the columns name**.
    2. counts and displays the number of rows that would be retrieved by the query.

```sql
    SELECT COUNT(DEPT_NO) FROM STUDENTS; -- 16
    -- count the rows, second type. will return the number of all rows that has DEPT_NO in them

     SELECT COUNT(DISTINCT DEPT_NO) FROM STUDENTS; -- 5
    -- count the occurrence of each DEPT_NO, it happens that we have 5 different departments.
    -- null values for DEPT_NO are ignored.
    -- each DEPT_NO might be occurred more than once, but it only appears in the count for once.
    -- this is useful to count `how many different departments that we have that are assigned to students`

    SELECT COUNT(*) FROM STUDENTS;
    -- count all rows, including null and duplicate rows.
```

---

## SUM() aggregate function

-   calculates the total of the values in a NUMERIC type column.
-   it take the name of the column, or the name of the column in a scalar expression as an argument.
-   results of SUM() sometimes has greater precision than the column itself.

```sql
    SELECT SUM(PRICE) FROM ITEMS; -- name of the column
    SELECT SUM(PRICE + (PRICE * 0.2)) FROM ITEMS; -- name of the column in a scalar expression
```

---

## AVG() aggregate function

-   calculates the average **or arithmetic mean** of the values in a NUMERIC type column, adding all values then divide by the number of rows.

```sql
    SELECT AVG(PRICE) FROM ITEMS; -- average of all rows = sum / count (all rows)
    SELECT AVG(PRICE) FROM ITEMS WHERE ITEM_ID = 5; -- average of selected set of rows = sum / count (selected rows)
```

---

## MIN() and MAX() aggregate functions

-   MIN() returns the smallest value in a column. it can work on **NUMERIC, STRING, and non-ANSI types (such date and time)** column types.
-   MAX() is the opposite, but works on the same column types.
-   both allow the use of scalar expressions and column name as arguments.

```sql
    SELECT MIN(JOIN_DATE) FROM T; -- 01-01-2020
    SELECT MAX(JOIN_DATE) FROM T; -- 01-01-2022

    SELECT MIN(MARK) FROM EXAMS; -- 18
    SELECT MAX(100 - MARK) FROM EXAMS; -- 82, as 100-18
```

---

## GROUP BY clause

-   allows to split the values in a column into **subsets**, then apply the aggregate functions on those subsets might be very useful.
-   we can group by single column or **multiple columns**.

```sql
    SELECT STUDENT_NO, AVG(MARK) FROM EXAMS GROUP BY STUDENT_NO; -- results https://i.imgur.com/AmLRt9k.png
    -- this query splits up all exams into sets by STUDENT_NO, then calculates the AVG of the marks in each set.
    -- so it is calculating the average score for each student in all exams.
    -- we can get an equal query as:
     SELECT STUDENT_NO, AVG(MARK) FROM EXAMS WHERE STUDENT_NO = 1; -- then use a query for each student id.


     SELECT SUB_NAME, DEP_NO, CREDITS, MAX(PASS) FROM STUDENTS GROUP BY DEP_NO, CREDITS;
     -- results https://i.imgur.com/RUxPVet.png
     -- we got split sets into combinations of all DEP_NO and CREDITS.
```

---

## HAVING clause

-   you **can NOT use aggregate functions in the `WHERE` clause**, so you can NOT use WHERE clause to eliminate the results that don't interest you.

<center>
    <img src="https://i.imgur.com/i51TeSW.png" />
</center>

-   HAVING clause allows for filtering the results that are produced by the **aggregate functions and GROUP BY**.
-   it accepts only **one single value**

```sql
    SELECT STUDENT_NO, AVG(MARK) FROM EXAMS
        GROUP BY STUDENT_NO
        HAVING AVG(MARK) > 65;
```

---

## SQL JOINS

-   **JOIN** is the ability to retrieve data from several different related tables, that's the power of rational databases.
-   the tables to be joined should be named in the **FROM clause** as comma separated.
-   the relationships between tables should be defined in the **predicate or WHERE clause**.
-   if the columns are **unique between all the tables int he join**, we don't have to prefix the column name by the table name. but it is good practice to always use `tableName.columnName` notation in the join statement.
-   we don't care about how SQL will actually do the join, DBMS will take care of that. the results are what important to us.
-   when processing the JOIN, SQL will look up **all possible combinations of the rows in the join tables**, then evaluate them and decide to add each row to the results or not. and the steps are:
    1. construct a list of all possible row combinations from the tables in the JOIN.
    2. check if the predicate is true for **each combination of rows**.
    3. if the predicate is true, that row will be added to the results.
    4. once all possible rows have been checked, the results will be returned by the query.

---

## self join

-   joining 2 copies of the same table.
-   data retrieved by self-join can not be retrieved by any other query.
-   we can use table name aliases to distinguish the 2 copies from each other.

```sql
SELECT L.SURNAME, R.SURNAME, L.DEPT_NO
    FROM LECTURERS L, LECTURERS R -- USING table name aliases to reference tables
    WHERE L.DEPT_NO = R.DEPT_NO -- predicate
    AND L.SURNAME <> R.SURNAME ; -- <> means not-equals (!=), eliminate so duplicate records.
```

---

## nested SELECT statements (sub-queries)

-   the results of a query becomes part of the predicate of another query **(WHERE clause or HAVING clause)**.
-   DBMS will execute the sub-query first, then the results of the sub-query is being populated into the predicate.
-   when using `=` in a predicate with sub-query:

    1.  make sure that sub-query returns only single value like: **selecting one column, a result of an aggregate function**, and the type of the sub-query result should be the same of the predicate column. example: <https://i.imgur.com/aG4Ran4.png>
    2.  we have to make sure that the sub-query also returns a value and not just empty. example <https://i.imgur.com/OVkRjxd.png>
    3.  aggregate functions are allowed unless they are using **GROUP BY, HAVING**, even if the GROUP BY, or HAVING returned one value it will be rejected, because they are **returning a set -even if it has one item-**.

```sql
SELECT * FROM EXAMS WHERE
    STUDENT_NO =
                (SELECT STUDENT_NO FROM STUDENTS WHERE NAME = 'AHMAD' AND LASTNAME = 'ALI' ); -- SUB-QUERY, executed first


SELECT SURNAME, PAY FROM LECTURERS
    WHERE PAY <
            (SELECT AVG(PAY) FROM LECTURERS); -- aggregate function that returns a single value.
-- GET  ALL lecturers that are getting paid less than average.

```

-   the sub-query should always appear **after** the comparison operator on the predicate, adding the sub-query before the operator will throw an error. example <https://i.imgur.com/79k1fOk.png>

-   if the sub-query returns a set, you can use the **IN operator**

```sql
SELECT * FROM EXAMS WHERE
STUDENT_NO IN
            (SELECT STUDENT_NO FROM STUDENTS WHERE DEPT_NO = 1);
-- sub-query returns a set, so we used `IN` operator
```

-   ANSI/ISO standards don't have a limit on the level of query nesting, but practically it is very low.

---

## linked SELECT statements (correlated sub-query)

-   another method of extracting data of multiple tables by linking them through a sub-query.
-   **correlated sub-query**: is a sub-query that refers to columns of the main table in the main query.
-   example here <https://i.imgur.com/6h8mvh9.png>

```sql
    SELECT * FROM EXAMS WHERE SUB_NO IN -- candidate row
        (SELECT SUB_NO FROM SUBJECTS
            WHERE SUBJECTS.PASS < EXAMS.MARK -- SUB-QUERY  referencing main table `exams`
            -- this referred to as `outer reference`.
        );
    -- this query selects all successful exams:
    --      - for each row in exams it loops through all rows in subject.
    --      - and gets all SUBJECT_NO where this exam.mark is considered successful.
    --      - it lastly compare the SUBJECT_NO of this exam with the retrieved successful SUBJECT_NO(s)
```

-   correlated sub-query is executed **once for each row** of the outer table.
-   **outer reference**: sub-query (correlated sub-query) that reference a column from the **outer (main) table**.
-   **candidate row**: the current outer query for which the sub-query is being executed.
-   detailed example on correlated sub-query here: <https://i.imgur.com/WdiL1eD.png>

---

## EXISTS operator

-   similar to **IN operator**.
-   **MUST have sub-query** as its argument.
-   returns `true` if the sub-query finds **any value**, `false` if no values returned by the sub-query.

````sql
SELECT * FROM SUBJECTS
    WHERE EXISTS
        (
            SELECT * FROM SUBJECTS WHERE PASS > 75 -- will be executed once (not correlated)
        );
-- retrieves ```all rows``` in the SUBJECTS table, if there exists ```one subject``` with pass > 75.


SELECT DISTINCT A.STUDENT_NO FROM EXAMS A
    WHERE EXISTS (
        SELECT * FROM EXAMS B WHERE
            B.STUDENT_NO = A.STUDENT_NO AND B.SUB_NO <> A.SUB_NO -- WILL executed foreach outer row (correlated)
    );
-- retrieves all students that have taken more than one exam in different subjects.


SELECT DISTINCT A.STUDENT_NO, S.SURNAME FROM EXAMS A, STUDENTS S
    WHERE EXISTS (
        SELECT * FROM EXAMS B WHERE
            B.STUDENT_NO = A.STUDENT_NO AND B.SUB_NO <> A.SUB_NO
            AND B.STUDENT_NO = S.STUDENT_NO
    );
-- same as the previous query, but we joined the students and exam tables to retrieve student name.
````

---

## ANY, ALL operators

-   MUST be used in sub-queries
-   ANY = SOME, can be used interchangeably. similar to **IN operator**.
-   ANY (SOME) returns true if any of the values returned by **the sub-query** equals the outer query column value used in the predicate.
-   ALL returns true if all the values returned by the sub-query matches the predicate of the main query.

```sql
SELECT SURNAME, INITIAL, DEPT_NO FROM LECTURERS A WHERE
    A.DEPT_NO = ANY (
        SELECT B.DEPT_NO FROM DEPARTMENTS B WHERE BUDGET > 3000
    );
-- retrieves THE NAMES OF the lecturers who work in department that has budget > 3000


SELECT SURNAME, INITIAL, DEPT_NO FROM LECTURERS A WHERE
    A.DEPT_NO <> ALL (
        SELECT B.DEPT_NO FROM DEPARTMENTS B WHERE BUDGET > 3000
    );
```

---

## UNION clause

-   allows to **combine** the output of two or more individual queries.
-   these queries can be **independent** from each other.
-   example here: <https://i.imgur.com/p1CYwC3.png>
-   restrictions on UNION operations:

    1. all columns selected by each SELECT statement must be compatible.
    2. each query must select the same number of columns and each corresponding columns must be of the same type.
    3. each corresponding columns must have the same **NOT NULL** feature.
    4. UNION clause can NOT be used in sub-queries.
    5. the individual SELECT statement in the UNION **can NOT** use aggregate functions.
    6. the individual SELECT statement in the UNION **can NOT** use ORDER BY clause.

-   UNION eliminates the duplicate rows from final results **by default**.
-   you can use **UNION ALL** to include duplicate rows in the final results.
-   although you can not use ORDER BY on the individual select statements, you can use it on the UNION as whole

```sql
SELECT SURNAME, DEPT_NO FROM LECTURERS WHERE  DEPT_NO =  (
        SELECT DEPT_NO FROM DEPARTMENTS WHERE DEPT_NAME = 'ENGINEERING'
    )
UNION
SELECT SURNAME, DEPT_NO FROM STUDENTS WHERE  DEPT_NO =  (
        SELECT DEPT_NO FROM DEPARTMENTS WHERE DEPT_NAME = 'ENGINEERING'
    )
ORDER BY 1; -- name of columns can not be used since the UNION does not retrieve column names
 -- ORDER BY  is applied on the outer UNION level and can not be applied on the individual select statements
```

---

## References

-   [1] Din, A. I. (2006). Structured Query Language (SQL): A practical introduction. NCC Blackwell. chapter 4. Retrieved from <http://www.managedtime.com/freesqlbook.php>.
