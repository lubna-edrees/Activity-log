# Unit 2: Conceptual Data Model

## Table of contents

- [Unit 2: Conceptual Data Model](#unit-2-conceptual-data-model)
  - [Table of contents](#table-of-contents)
  - [terminology](#terminology)
  - [database model](#database-model)
    - [types of database model](#types-of-database-model)
    - [concepts of database model](#concepts-of-database-model)
  - [conceptional data model concepts](#conceptional-data-model-concepts)
    - [Entity-Relationship model](#entity-relationship-model)
      - [Entities and entities setts](#entities-and-entities-setts)
      - [attribute](#attribute)
      - [relationship sets](#relationship-sets)
      - [constraints](#constraints)
      - [Extension](#extension)
      - [Intension](#intension)
      - [Notes](#notes)
  - [Entity-Relationship Modeling Principles](#entity-relationship-modeling-principles)
    - [relationships](#relationships)
      - [one-to-one relationships](#one-to-one-relationships)
      - [one-to-many relationships](#one-to-many-relationships)
      - [many-to-many relationships](#many-to-many-relationships)
      - [Involuted (recursive) relationships](#involuted-recursive-relationships)
    - [arc](#arc)
    - [mistakes in data modeling](#mistakes-in-data-modeling)
    - [database normalization](#database-normalization)
  - [References](#references)

when working with DBs, there are three modeling terms [[1]](#References):

1. conceptional modeling: cares about information seen by the business world.
2. logical modeling: based on a mathematical model, presents information in a fully normalized matter where there is no duplication of data.
3. physical modeling: implements a given logical model specifically to a particular DB product or version.

![data modeling lifecycle](https://i.imgur.com/RCsL2X7.png)

## terminology

- **model**: an abstraction or representation of a real world object/problem that reveals all details of interest to the user.
- **ERD**: Entity Relationship Diagram

## database model

- integrated collection of concepts for a data description, data relationships, data semantics and constraints. used to represent metadata about the DB and to describe its schema [[1]](#References).

### types of database model

1. **External data model**: used for viewing representation of every user. also called **Universe of Discourse**. represents **Record-based Logical Model**.
2. **Conceptional Data Model**: used for a general view of the data and it is **independent of the DBMS**. represents **Object-based Logical Model**.
3. **Internal Data Model**: used for a translation of the conceptional model to a specific DBMS. represents **Physical Data Model**.
4. **Relational Database Model**: the **most used** model today. it is **simple** and theoretically sound. used for building **business rules system**. represents **Entity-Relationship Model based on the conceptional model**.

### concepts of database model

1. **structural component**: rules for the structure of database itself.
2. **manipulation component**: defines the operations that can be applied on this database..
3. **data integrity component**: rules that guarantee the correctness of data.

## conceptional data model concepts

- first step of data modeling, represents a mental image of real-life object/problem.
- it is **not** specific to a database, describe things that organization wants to collect and the relationships between them.
- steps of conceptional data model:
  1. draw Entity-Relationship diagram.
  2. define integrity constraints.
  3. review the final model:
     1. remove M:N relationships.
     2. remove recursive relationships.
     3. remove relationships with attributes.
     4. remove 1:1 relationships which are normally not necessary.

### Entity-Relationship model

- concepts of Entity-Relationship model:
  1. Entity set
  2. attribute
  3. relationship set
  4. constraints
  5. attribute domain
  6. extension
  7. intension

#### Entities and entities setts

- **entity set**: is a set of entities of thew same **type** that share the same properties.
- **entity**: is an instance of entity set, it is a self-determining and distinguishable item that can be:

  1. concrete.
  2. insubstantial.
  3. an occurrence.

- **Note: In the Logical Model, entities are called tuples, and entity sets are called relations.**.
- Depending on the context, a given noun like TEACHER could be used as an entity, or an entity set. For example, if you need different types of people, such as TEACHER or STUDENT, you will create an entity set called PERSON with the entities TEACHER and STUDENT [[1]](#References).

#### attribute

- item that describes a property of an entity set, each attribute can have one value for each instance of the entity set.
- in **physical model** an attribute is a named column with a domain.
- **Types of attributes:**
  1. **Simple (atomic)**: has single component. **eg.** Boolean has true/false.
  2. **Composite**: consists of multiple components. **eg.** Name has 2 components, lastname + firstname.
  3. **Single-Valued**: an attribute that has one value for one entity, **eg.** Title.
  4. **Multi-Valued**: an attribute that has multiple values for one entity, **eg.** phoneNumber, a person might have multiple phone numbers. since **an attribute can have only one value for each instance of the entity set**, when encountering multi-valued attribute we need to transfer it to **another entity set**.
  5. **Derived**: derived attribute has its value derived or computed form another attribute. **eg.** NumberOfPersons. the derived attribute is **not part of a table**, but it is included fro clarity or design purposes.
  6. **Unstable**: have values that always change, **eg.** NumberOfFollowers for a user.
  7. **Stable**: values that rarely change. **eg.** Name. stable attributes are favourited over unstable ones.
  8. **Mandatory**: must have a value.
  9. **Optional**: might be null.
  10. **Unique Identifier**: ID. **key** within **Logical Model**. there are several types of keys:
      1. **candidate keys**.
      2. **primary keys**: they should be:
         1. stable. primary key value should never change.
         2. minimal. primary key should be composed of the minimal number of fields.
      3. **alternate keys**: all candidate keys that don't participate in the primary key.
      4. **surrogate key**: a primary key that does not exist on real-world attribute, this kind of keys should be avoided since it:
         1. increases the data size.
         2. does not hold data is important to the entity.
      5. **simple keys**: have a single attribute.
      6. **Composite keys**: keys that has multiple attributes.
      7. **Foreign keys**.

#### relationship sets

- **Relationship set**: set of relationships between set of entities. usually a **verb**.
- **relationship**: is an instance of relationship set and establishes an association between entities that are related.

#### constraints

- types of constraints:

  1. **cardinalities**: based on the number of possible relationship sets for every entity set. can be:
     1. **one-to-one (1:1)**.
     2. **one-to-many(1:M)**.
     3. **many-to-many(M:M)**. these relationships are not supported by the relational model and **must be resolved by splitting into two 1:M relationships**.
  2. **participation cardinalities (optionality)**: specifies wether the **existence of an entity** depends on the **being related to another entity set** via the relationship set. can be:

     1. **Total or Mandatory**: each entity set **must participate in a relationship** and can not exist without that participation.
     2. **Partial or Optional**: each entity set might participate in a relationship or not.
        ![cardinalities and optionality](https://i.imgur.com/rADmQhj.png)
     3. **subsets and supersets**:When a group of instances has special properties such as attributes or relationship sets that exist only for that group, it makes sense to subdivide an entity set into subsets. The entity set is a superset called a parent. Each group is a subset called a child. **eg.** An entity set PERSON can be divided in subsets STUDENT and TEACHER (photo below).
        ![subsets and supersets](https://i.imgur.com/0O8fLCv.png)
     4. **Hierarchy**: represents an ordered set of items.
     5. **Unary Relationship sets**: the same entity set participates multiple times in the same relationship set, also known as **recursive relationship set**.
        ![unary relationship](https://i.imgur.com/stDBNNH.png)
     6. **History**: the constraint can specify the end date to always be later than the start date for a given attribute. In the physical model you can use a **CHECK constraint** for this purpose.

#### Extension

- Data in a database at a **particular point in time** is called an extension of the database. Extension refers to the **current set of tuples** in a relation, it is an instance of the record sets and the relationship sets between them.

#### Intension

- Intension or **schema** is the **logical model** of a database and is represented by entity sets which holds:
  1. **structure and constraints**: An instance describes and constrains the structure of tuples it is allowed to contain.
  2. An instance is represented by entity sets, and is the model of a database.
  3. **manipulation**: Data manipulation operations on tuples are allowed only if they observe the expressed intensions of the affected relations.

#### Notes

- You need also to specify if the relationship set is **strong (identifying)** or weak **(non-identifying)**. Weak relationships are connections between a strong entity set and weak entity set. Strong relationships are connections between two strong entities.
- identifying and non-identifying respectively. An identifying relationship set is selected to specify that the relationship set is one in which one of the child entities is also a dependent entity. Non-Identifying relationship set is selected to specify that the relationship set is one in which both entities are independent.

## Entity-Relationship Modeling Principles

- terminology [[2]](#References):
  - **# ATTRIBUTE_NAME**: attribute is part of the primary key.
  - **\* ATTRIBUTE_NAME**: attribute is required.
  - **o ATTRIBUTE_NAME**: attribute is optional.
  - **\_\_\_**: has. **MAY** have zero or more of the other relation.
  - ![valid for](https://i.imgur.com/eEjsFV2.png): valid for. **MUST** belong to **one valid tuple** of the other relation.

### relationships

#### one-to-one relationships

1. mandatory-mandatory
   ![mandatory-mandatory](https://i.imgur.com/mFJdRyf.png)

   - mandatory-mandatory.
   - the diagram tells that a given PRODUCT **MUST come form one and only one** SUPPLIER PRODUCT. a given SUPPLIER PRODUCT **MUST be the origin for one and only one** PRODUCT.
   - this is a deadlock, since we will not able to create a PRODUCT until we have a a PRODUCT SUPPLIER. **AND** we can **not** create a PRODUCT SUPPLIER until we have a PRODUCT.

2. mandatory-optional.
   ![mandatory-optional](https://i.imgur.com/LnCu3an.png)

   - PRODUCT **MAY** come form one and only one PRODUCT SUPPLIER, however, a given PRODUCT SUPPLIER **MUST** be the origin of one and only one PRODUCT.

3. optional-optional.
   ![optional-optional](https://i.imgur.com/F6ZEhxm.png)

   - a PRODUCT **MAY** come one and only one PRODUCT SUPPLIER, a PRODUCT SUPPLIER **MAY** be the origin of one and only one PRODUCT.

- **one-to-one relationships are a signal that you have different entities that are probably the same entity.**

#### one-to-many relationships

1. mandatory-mandatory
   ![mandatory-mandatory](https://i.imgur.com/zoqvdtV.png)
   - ORDER **MUST** belong to one and only one CUSTOMER, CUSTOMER **MUST** place one or more orders.
   - this also a deadlock, since you can't create CUSTOMER without ORDER or vise versa.
2. mandatory-optional
   ![mandatory-optional](https://i.imgur.com/4azDlzg.png)

   - CUSTOMER **MUST** place one or more ORDERs, while an ORDER **MAY** belong to a CUSTOMER.
   - this is a hard and rare business rule, and should be avoided.

3. optional-optional
   ![optional-optional](https://i.imgur.com/rnuJttK.png)

   - this a weak relationship.
   - CUSTOMER **MAY** place one or more ORDERs, while an ORDER **MAY** belong to one and only one CUSTOMER.
   - this is called **indecisive mode**.

4. optional-mandatory
   ![optional-mandatory](https://i.imgur.com/jUSRDJ5.png)

   - most useful relationship.
   - CUSTOMER **MAY** have zero or more ORDERs, while an ORDER **MUST** belong to one and only one CUSTOMER.

#### many-to-many relationships

1. mandatory-mandatory
   ![mandatory-mandatory](https://i.imgur.com/DxOj98h.png)

   - this relationship is **impossible**. or called **catch-22**.

2. mandatory-optional
   ![mandatory-optional](https://i.imgur.com/iRcKKWd.png)

   - needs to be resolved; analysis is unclear.

3. optional-optional
   ![optional-optional](https://i.imgur.com/7pyZAHI.png)

   - this is very useful. it is called **intersection entity**.

- NOTE: to resolve the optional-optional many-to-many relationship between CUSTOMER and ORDER, we need to represent a third table that joins the 2 relation. an example of such a relationship between BUSINESS CONTACT and CONTACT TYPE listed below.

![optional-optional many-to-many relationship](https://i.imgur.com/vEMGZUF.png)

- **NOTE**: ![symbol](https://i.imgur.com/UnVjWTP.png) means that the primary keys of both relations contributes to the primary key. so it is a **composite primary key**.

#### Involuted (recursive) relationships

1. one-to-one, optional-optional = allows for holding historical data.
   ![one-to-one, optional-optional](https://i.imgur.com/rA24sHZ.png)
2. one-to-many, optional-optional = classical hierarchy.
   ![one-to-many, optional-optional](https://i.imgur.com/6HvZlbo.png)
3. many-to-many, optional-optional = network structure, **needs a join table**.
   ![many-to-many, optional-optional](https://i.imgur.com/seCCcFZ.png)

### arc

- arc is a constraint that crosses to one or more relationships going into an entity, and indicates that the relationships in the arc are mutually exclusive.
- in the photo below, for any TRANSACTION, it MUST be valid for SHAREHOLDER **OR** a BUSINESS CONTACT, **but not both at the same time**.
- try to **avoid** arcs.
  ![arc](https://i.imgur.com/QvaJxI8.png)

### mistakes in data modeling

1. modeling with incompleteness.
2. modeling with incomplete understanding of the business.

### database normalization

- Database normalization is the process of structuring a database, usually a relational database, in accordance with a series of so-called normal forms in order to reduce data redundancy and improve data integrity. It was first proposed by Edgar F. Codd as part of his relational model.
- **FN1 (First Normal Form)**: do not repeat attributes/groups of attribute, instead take them out to their own entity.
- final result of the case study:
  ![final result of the case study](https://i.imgur.com/6Fk0xb3.png)
- more info here: <https://en.wikipedia.org/wiki/Database_normalization>

## cardinality symbols

![cardinality symobls](https://i.imgur.com/mY3PBoQ.png)

more indo: <https://www.smartdraw.com/entity-relationship-diagram>
## References

- [1] [Sharma, N., Perniu, L., Chong, R. F., Iyer, A., Nandan, C., Mitea, A. C., Nonvinkere, M., & Danubianu, M. (2010). Databases fundamentals. _Chapter 3_.](https://public.dhe.ibm.com/software/dw/db2/express-c/wiki/Database_fundamentals.pdf)
- [2] [Pedersen, A. A. (n.d.). Entity relationship modeling - Principles.](https://my.uopeople.edu/pluginfile.php/57436/mod_book/chapter/37615/CS2203.Textbook.ER.Modeling.pdf)
