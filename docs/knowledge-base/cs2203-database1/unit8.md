# Unit 8: Database Development Process

## table of contents

- [Unit 8: Database Development Process](#unit-8-database-development-process)
  - [table of contents](#table-of-contents)
  - [definitions](#definitions)
  - [waterfall lifecycle](#waterfall-lifecycle)
  - [Database Life Cycle](#database-life-cycle)
    - [1. requirements gathering](#1-requirements-gathering)
    - [2. Analysis](#2-analysis)
    - [3. Logical Design](#3-logical-design)
    - [4. Implementation](#4-implementation)
    - [5. Realizing the Design](#5-realizing-the-design)
    - [6. Populating the Database](#6-populating-the-database)
  - [References](#references)

---

## definitions

-   **software development life cycle (SDLC)**: the collection of steps or phases in the product development, each step (phase) focuses on one aspect of the development.
-   **Database application development**: is the process of obtaining real-world requirements, analyzing requirements,
    designing the data and functions of the system, and then implementing the operations in the system.
-   **Flexing**: capture the simultaneous ideas of bending something for a different purpose and weakening aspects of it as it is bent.
-   **Bulk Load**: The transfer of large quantities of existing data into a database, one table at a time, **some DBMS facilities to postpone constraint checking until the end of the bulk loading**.

---

## waterfall lifecycle

-   strict sequence of steps where the output of one step is the input to the next and all of one step has to be completed before moving onto the next.

<center>
    <img src="https://i.imgur.com/1J0mseg.png" />
</center>

seeps of waterfall model:

1. Establishing requirements involves consultation with, and agreement among, stakeholders about what they want
   from a system, expressed as a statement of requirements.
2. Analysis starts by considering the statement of requirements and finishes by producing a system specification. The
   specification is a formal representation of what a system should do, expressed in terms that are independent of
   how it may be realized.
3. Design begins with a system specification, produces design documents and provides a detailed description of how the system should be conducted.
4. Implementation is the construction of a computer system according to a given design document and taking into
   account the environment in which the system will be operating (e.g., specific hardware or software available for
   the development). Implementation may be staged, usually with an initial system that can be validated and tested
   before a final system is released for use.
5. Testing compares the implemented system against the design documents and requirements specification and
   produces an acceptance report or, more usually, a list of errors and bugs that require a review of the analysis,
   design and implementation processes to correct (testing is usually the task that leads to the waterfall model
   iterating through the life cycle).
6. Maintenance involves dealing with changes in the requirements or the implementation environment, bug fixing or
   porting of the system to new environments (e.g., migrating a system from a standalone PC to a UNIX workstation
   or a networked environment). Since maintenance involves the analysis of the changes required, design of a
   solution, implementation and testing of that solution over the lifetime of a maintained software system, the
   waterfall life cycle will be repeatedly revisited.

---

## Database Life Cycle

1. We can separate the development of a database – that is, specification and creation of a schema to define data in a
   database – from the user processes that make use of the database.
2. We can use the three-schema architecture as a basis for distinguishing the activities associated with a schema.
3. We can represent the constraints to enforce the semantics of the data once within a database, rather than within
   every user process that uses the data.

<center>
    <img src="https://i.imgur.com/VwrSMQ6.png" />
    <p>database life cycle [source \[1\]](#references) </p>
</center>

```js
requirements  > conceptual data model > logical data model  > physical data model > testing
```

### 1. requirements gathering

-   interview the customer to get as much as info as you can.
-   required agreement among all of the users about the information that will be stored in the DB.
-   The data administrator plays a key role in this process as they overview the business, legal and ethical issues within the organization that impact on the data requirements.
-   `data requirements document` is used to confirm the understanding of requirements with users.
-   requirements should not describe how data is to be processed, but what the data items are?, their attributes?, any constraints or relationships?

### 2. Analysis

-   Data analysis begins with the statement of **data requirements** and then produces a **conceptual data model**.
-   The aim of analysis is to obtain a detailed description of the data that will suit user requirements so that both high and low level
    properties of data and their use are dealt with.
-   conceptual data model is **concerned** with the **meaning and structure** of data, but not with the details affecting **how they
    are implemented**.

### 3. Logical Design

-   Database design starts with a **conceptual data model** and produces a **specification of a logical schema**.
-   this will determine the **specific type of database system** (network, relational, object-oriented) that is required. The relational
    representation is **still independent** of any specific DBMS; **it is another conceptual data model**.
-   The output of this stage is a detailed relational specification, the logical schema, of all the tables and constraints needed to satisfy the
    description of the data in the conceptual data model.
-   Database designers familiar with relational databases and SQL might be tempted to **go directly to implementation** after
    they have produced a conceptual data model. However, such a direct transformation of the relational representation
    to SQL tables does not necessarily result in a database that has all the desirable properties: **completeness, integrity,
    flexibility, efficiency and usability**.

### 4. Implementation

-   Implementation involves the construction of a database according to the specification of a logical schema. This
    will include the specification of an appropriate storage schema, security enforcement, external schema and so on.
-   implementation of the logical schema in a given DBMS requires a very detailed knowledge of the specific
    features and facilities that the DBMS has to offer.

### 5. Realizing the Design

-   One way to achieve this is to write the appropriate SQL DDL statements into a file that can be executed by a DBMS
    so that there is an independent record, a text file, of the SQL statements defining the database.
-   Another method is to work interactively using a database tool like SQL Server Management Studio or Microsoft Access.

### 6. Populating the Database

-   After a database has been created, there are two ways of populating the tables
    1.  either from existing data or
    2.  through the use of the user applications developed for the database.
-   when the first approach is used, the simplest approach to populate the database is to use the **import and export facilities** found in the DBMS.

---

## References

-   [1] Watt, A., & Eng, N. (2014). Database design, 2nd ed. BCcampus, BC Open Textbook Project. Retrieved from <https://opentextbc.ca/dbdesign01/>.
