# Unit1: Databases and Relational Data Model

## Reading

1. Database Fundamentals, IBM. chapter 1 & 2
2. Database design, chapters 1 to 7.

## Types of information models

1. Network Model (CODASYL).
2. Hierarchial Model (IMS).
3. Relational.
4. Entity-Relationship (ER).
5. Extended Relational.
6. Semantic.
7. Object-oriented.
8. Object-relational.
9. semi-structured (XML).

## Career paths with databases

1. data architect.
2. database architect.
3. database administrator (DBA).
4. applications developer.

## Chapter 2: Relational data model

### Basic concepts

#### 1.attributes

- represent column in a table,field in the object.
- data characteristics of the object.
- all attributes hve values.

#### 2. domain

- set of all possible values for an attribute.
- these values `MUST` be `atomic`: 1. non-decomposable. 2. smallest possible unit of dat that can not be
  divided.
- **eg:** domain of Boolean attribute is [true, false].
- the comparison between the values of 2 attributes is only possible if the 2 attributes have the same domain, otherwise, the comparison does not make sense.
- domains a re not explicitly stored in the DB, but they `MUST` be part of the DB definition.
- each attribute definition `MUST` include a reference to its domain definition in the DB definition part.

#### 3. Tuples

- ordered set of values that represent data in the relation.
- represents: row in a table, record in a file.

#### 4. relations

- relations represent tables. each relation has a header and body.
- relation header: fixed set of attributes, represent the head of a table, and each of theses attributes corresponds to a domain.
- relation body: set of tuples represent the table rows, each tuple has value corresponds ot the attribute in the header.
- **relation Degree**: number of attribute in the header, eg. unary, binary, nary...
- **relation cardinality**: number of tuples in the relation = rows count, changes overtime (with adding/removing records).
- **relation instance**: the state of a relation at a specific moment of time.
- **relation properties**:
  - there are no duplicate tuples.
  - tuples are unordered.
  - attributes are unordered.
  - attribute values are atomic.

#### 5. Schemas

- formal description for all DB relations and relationships between them.

#### 6. keys

- keys are identifiers for the tuple.
- used for:
  - enforce rules and constrains on DB.
  - constrains are important for maintaining consistency and correctness of DB.
- DBMS are responsible for maintaining keys.
- **keys types**:
  - candidate keys.
  - primary keys (PK).
  - foreign keys (FK).

##### 6-1 Candidate keys

- unique identifier for the tuples of a relation, that consists of one or more attributes.
- if no candidate keys have been specified, the set of k = (all tuple values), might work as a candidate key if and only if:
  1. K is unique overtime (no other tuple with the same values).
  2. minimality: none of the tuple values can be discarded without destroying the uniqueness property.
- using **Data Definition Language (DDL)** you can specify candidate keys by adding `UNIQUE` keyword to the definition of the attribute.
- a relation can have multiple candidate keys:
  1. one key -> primary key.
  2. other keys -> alternate keys.

##### 6-2 primary keys

- candidate key that has been chosen to represent the relationship.
- must be: 1. unique. 2. not null.
- primary key is an attribute that has no meaning in the real life, but it always exist and unique, thus it can be named:
  1. surrogate key.
  2. artificial key.

##### 6-3 Foreign keys

- an attribute that references a primary key from another relation.
- FK and its correspondents PK (from the other relation) `MUST` have the same domain.

## Relational Data Model Constrains

1. entity integrity constrains.
2. referential integrity constrains.
3. semantic integrity constrains.

### Entity integrity constrains

- no attribute that participates in PK can have `NULL` value.
- in real life: an entity with NULL PK means that this entity does not exist.
- NULL value means on of the following:
  1. absence of value.
  2. undefined value.
  3. value that does not belong to the attribute domain.

### Referential integrity constrains

- for every value of FK in a relation R1, there `MUST` be a tuple from the other relation R2 so that, PK (R2) = FK (R1).
- FK with NULL value, means that the **relationship** between the this tuple and the other relation does not exist.

#### **In Case of deleting / Updating a tuple that has a FK, there are 3 possibilities:**

1. **CASCADE**: the operation cascades to the record of the second relations and affects the tuple that has been referenced with **FK**.
2. **RESTRICTS**: prevent the operation from happening on all tuples with FK that is not NULL, so the operation is rejected.
3. **NULLIFIES**: update the record from the second relation that has been referenced by the FK, set the value that points to the affected tuple to be **NULL**.

### Semantic integrity constrains

- includes:
  1. domain constrains.
  2. null constrains.
  3. unique constrains.
  4. check constrains.

#### domain constrains

- all values of an attribute **MUST** belong to its domain.
- domain constrains include:
  1. **Format constrains**: all values must match a specific pattern, **eg.** regex, 6 digits...
  2. **Range Constrains**: all values must be in a specific range, **eg.** number of employees in one department can not exceed the number of employees in the whole company.

#### NULL constrains

- value can not be null.
- `DEFAULT` keyword can be used to give the a attribute a default value in the case of NULL.

#### UNIQUE constrains

- no 2 tuples can have the same value for this attribute.
- NULL is a valid unique value.

#### check constrains

- a condition in a relation data that always checked when the data is manipulated.
- when defining the check constrains you can add instructions that can be executed when the check fails, and if these instructions are not provided, the operation will be rejected.

## Relational Algebra

- set of operators to manipulate relations.
- each operator takes one or more relations as **INPUT** and returns a new relation as **OUTPUT**.
- operators are divided into:

| traditional          | -------------- | special    |
| :------------------- | -------------- | :--------- |
| 1. union             |                | 1. select  |
| 2. intersection      |                | 2. project |
| 3. difference        |                | 3. join    |
| 4. cartesian product |                | 4. divide  |

### 1. UNION

| operator              | definition of results                                                              | characteristics                                      |
| --------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------- |
| **UNION**             | - R1 UNION R2 = set of all tuples that belongs to R1, **or** R2,**or** both        | 1. associative. 2. commutative                       |
|                       |                                                                                    | 3. R1, R2 must be union-compatible                   |
|                       |                                                                                    | -                                                    |
| **INTERSECTION**      | - R1 INTERSECT R2 = set of tuples that belong to **Both** relations.               | same as UNION                                        |
|                       |                                                                                    | -                                                    |
| **DIFFERENCE**        | - R1 DIFF R2 = all tuples that belongs to R1, **AND NOT** belong to R2.            | 1. R1, R2 must be union-compatible                   |
|                       |                                                                                    | -                                                    |
| **CARTESIAN PRODUCT** | - R1 **times** R2 = set of all tuples where each tuple of the output results       | 1. R1, R2 must be union-compatible                   |
|                       | from a concatenation operation between one tuple from R1, and correspondents       |                                                      |
|                       | tuple from R2.                                                                     |                                                      |
|                       | - if R1 si of degree n, R2 of degree m => result is of degree `n+m`                |                                                      |
|                       |                                                                                    | -                                                    |
| **SELECTION**         | - takes one relation **AND** one condition as input                                | 1. result degree is same as input relation           |
|                       | - selects all tuples from the relation that satisfies the input condition.         | 2. result cardinality is less or equal to the input. |
|                       |                                                                                    | -                                                    |
| **PROJECTION**        | - takes one relation **AND** list of attributes as input.                          |                                                      |
|                       | - returns subset of tuples of a relation with duplicate tuples are eliminated.     |                                                      |
|                       |                                                                                    | -                                                    |
| **JOIN**              | - concatenates 2 relations based on a joining condition or predicate.              |                                                      |
|                       | - **theta-join**: join result `MUST` must includes 2 identical attributes          |                                                      |
|                       | (one from each relation),                                                          |                                                      |
|                       | when one attribute is eliminated, it is **natural join**.                          |                                                      |
|                       | when some tuples of 2 relations don't have matching tuple => **outer join**        |                                                      |
|                       | **left outer join**: result includes all tuples of R but not all tuples of L       |                                                      |
|                       | **right outer join**: result includes all tuples of L but not all tuples of R      |
|                       | **full outer join**: result includes all tuples of R **AND ALL** tuples of L       |                                                      |
|                       |                                                                                    | -                                                    |
| **DIVISION**          | - divides a relation R1 (degree n+m), and relation R2 degree(m) result of degree n |                                                      |
|                       | - the attribute we divide on should be on the same domain.                         |                                                      |
|                       | - we divide on the attribute (n+i) from R1, and i from R2.                         |                                                      |
|                       | - results contains the tuples of R2 that belongs to R1.                            |                                                      |
|                       | - result cardinality equals cardinality of R2.                                     |                                                      |
