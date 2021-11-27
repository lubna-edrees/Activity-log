# Unit 3: Relational Database Design

## data redundancy

- redundancy means the existence of same data in various places.
- redundancy in a relational schema is not optimal because it interrupts and insertion, deletion, update ops, and causes:
  - **Insertion Anomalies**: insertion of a data record is not possible unless we get some unrelated data from another record. **eg.** inserting a student record requires data to be retrieved from his college record.
  - **Deletion Anomalies**: deletion of a data record results in losing some unrelated information that was stored as part of the record that was deleted from a table.
  - **Update Anomalies**: updating data for an entity in one place may lead to inconsistency, with the existing redundant data in another place in the table.

---

## decompositions

- decompositions in relational database design is breaking down a relational schema into smaller and simpler relations that avoid redundancy.
- we will be able to query the smaller relations for any information that we were previously able to retrieve from the original relational schema.

---

## functional dependencies

- Functional Dependency (**FD**) is a type of **integrity constraint** that extends the idea of a **super key**. It defines a dependency between subsets of attributes of a given relation.
- Functional Dependency can be understood as “A determines B”, “B is dependent on A” or “A implies B” and denoted as “A → B”, where A and B are **2 different subsets of attributes** in a relation.
- **Trivial Functional Dependencies**: A functional dependency that holds true for **all values** of a given attribute.

### Closure Set of Functional Dependencies **S<sup>+</sup>**

- all functional dependencies that are implied from a given set of functional dependency S.
- rules to compute closure set of dependencies:

  1. **Armstrong's Axiom**:
     - also known as "Inference Rules" that help infer all the implied functional dependencies from a given set of functional dependencies.
     - it includes 3 rules:
       1. **Reflexivity**: If B is a subset of attributes in set A, then A → B. (by trivial FD)
       2. **Augmentation**: If A → B and C is another attribute, then AC → BC Applying reflexivity to this rule, we can also say that, AC → B.
       3. **Transitivity**: If A → B and B → C, then A → C.
     - and also 2 additional rules that can be extracted from the first 3:
       1. **Union**: If A → B and A → C, then A → BC.
       2. **Decomposition**: If A → BC, then A → B and A → C.
  2. **Computing the closure set of attributes**:
     - Closure set of attributes of a given attribute, A, is set of all attributes in the relation, R that can be uniquely determined by A, based on the given FDs.
     - Given a relation, R with a set of attributes, we calculate closure set of attributes for A, closure (A) as follows:
       1. Initially set closure (A) = A
       2. For each given FD, if A → B, then add B to closure (A), that is, closure (A) U B
       3. For any subset of A, (let C be a subset of A), A→ C (by trivial FD) and if C → D such that D is not a subset of A, then add D to the closure (A)
       4. Repeat step 3 until there are no more attribute sets to be added to closure (A)
  3. **Entailment**:
     - Functional Dependencies (FDs) guide us on how to best decompose relations so that the dependent values may be stored in a single table.

---

## Normal Forms

- Normalization is a procedure in relational database design that aims at converting relational schemas into a more desirable form. The goal is to remove redundancy in relations and the problems that follow from it, namely insertion, deletion and update anomalies
- The Normal forms progress towards obtaining an optimal design. Normalization is a step-wise process, where each step transforms the relational schemas into a higher normal form. Each Normal form contains all the previous normal forms and some additional optimization over them.

### First Normal Form (1NF)

- all attribute domains are atomic.
- the idea is no **repeating groups**.
- a relation is considered to be in **1NF** if satisfies these 5 conditions:
  1. no top-to-bottom ordering of rows.
  2. no left-to-right ordering of columns.
  3. no duplicate rows
  4. every row-and-column intersection contains exactly one value from the applicable domain.
  5. all columns are regular, [i.e. rows have no hidden components such as row IDs, object IDs, or hidden timestamps].

### Second Normal Form (2NF)

- 1NF **AND** no non-key attribute that depends on part of the candidate key, but on the entire candidate key.
- relation has single attribute as its candidate key.

### Third Normal Form (3NF)

- 1NF **AND** 2NF **AND** no non-key attribute that depends transitively on the candidate key.
- every attribute depends directly on the primary key and not through a transitive relation, where an attribute Z may depend on a non-key attribute Y and Y in turn depends on the primary key X.Transitivity means that when X→Y and Y→ Z, then X→Z.
- non-key attributes are mutually independent

### Boyce-Codd Normal Form (BCNF)

- applies to relations where there may be overlapping candidate keys.
- A relation is said to be in Boyce-Codd normal form if it is in 3NF **and** every non-trivial FD given for this relation has a candidate key as its determinant. That is, for every X → Y, X is a candidate key.

---

## Properties of Decompositions

- properties in summary:
  1. decompositions should be lossless.

### Lossless and Lossy Decompositions

- Decomposition of a relation R into relations X and Y is **lossless** if no information from the original relation is lost after the decomposition. In other words, the original relation can be **constructed back** from the decomposed relations and **no spurious rows** of information are added as data to the resulting rows.
- **lossy** decompositions are bad.
- if the common attributes in the decomposed (new) relations form a **super key** for either of the new relations, then the decomposition is lossless.

### Dependency-Preserving Decompositions

- we can check all the constraints against the decomposed table only, we need not check it against the **original table**.
- Dependency-preserving decomposition **does not imply a lossless** join decomposition and vice versa. While lossless join is a **must** during decomposition, dependency-preservation **may not** be achieved every time.

---

## Minimal Cover

- Minimal cover, Fc is the smallest set of functional dependencies such that the closure set of function dependencies for both minimal cover and given set of FDs F for a relation R are equivalent. That is, F+ = Fc+
- Minimal Cover for a given set of FDs is not unique.

---

## Synthesis of 3NF schemas

- Synthesis of 3NF schemas is a bottom-up approach to build lossless join and dependency preserving decompositions of a relation into 3NF.

---

## 3NF decomposition

- A 3NF decomposition can be achieved using a top-down method by the process of normalization where we decompose a relation as per the definition of 3NF and then ensure that it is lossless and dependency-preserving by performing certain checks on the relations thus created.

---

## The Fourth Normal Form (4NF)

- The fourth normal form can be understood in terms of multi-valued dependencies. The Fourth Normal Form (4NF) for a relational schema is said to exist when the non-related multi-valued dependencies that exist are not more than one in the given relation.
- **Multi-valued Dependency (MVD)** is denoted as, A →→ B. This means that A multi-determines B, B is multi-dependent on A or A double arrow B.

---

## Other normal forms

1. fifth-normal form.
2. domain key normal form DKNF.
3. sixth-normal form
