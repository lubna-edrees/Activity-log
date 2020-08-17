# Hash Tables

* used in: hashing passwords, connecting files on the os to their physical location, IP address.
* naiive solution: create an `array` `Arr` of all possible IPs, increment `Ar[IP] ++;` when a new visitor vistits your website, you need another array to deal with time.
* optimization: use `list` instead of array, the elements being added corresponding to the time \(old element in the start, last elemnts to the end\). every hour we delete the first list Nodes.
* `hash function`: a funtion that takes a universe and divide them into smaller universes.
* `Maps`: Store mapping from objects to other objects, Student ID → student name.
* Map from S to V is a data structure with methods HasKey\(O\), Get\(O\), Set\(O, v\), where O ∈ S, v ∈ V .
* `Set` is a data structure with methods: Add\(O\), Remove\(O\), Find\(O\).
* Two ways to implement a set using chaining:
  * Set is equivalent to map from S to V = {true, false}
  * Store just objects O instead of pairs \(O, v\) in chains.
* parameters in hash tables:

  * `n` numer of elemnts in the universe
  * `m` cardinality of the hash function \(the keys\)
  * `c` length of the longest chain
  * `memory` used `O(n + m)`
  * `𝛼 = n /m` is called load factor
  * Operations run in time `O(c + 1)`

  ![has table](https://i.imgur.com/daBQsY5.png)

### Hash Functions

* `univirsal family`:

  ```javascript
  Let U be the universe , the set of all
  possible keys. A set of hash functions
  ℋ = {h : U → {0, 1, 2, . . . , m − 1}}
  is called a universal family if for any two keys
  x, y ∈ U, x ̸= y the probability of collision
  Pr[h(x) = h(y)] ≤ 1/m
  ```

* [pdf notes](https://d3c33hcgiwev3.cloudfront.net/_c868028143804d149e8f66ee34c26b71_07_hash_tables_2_hashfunctions.pdf?Expires=1589241600&Signature=DcTh8b8HPSvoQ3xi8QMahVlEPK5C6Cpf~60zhfYFYkH-dG-atiJGhZjXzSNxl9gwqN9Z7F6OEpssDfC4TFKjmPuKjVsN8jC0D~VrHynLNT-2hlzPo3OumzVT2m5tI7id-rP8gYoUBL4SShv4AqyfpkrgTHrenykyqeTv8M2BGaQ_&Key-Pair-Id=APKAJLTNE6QMUY6HBC5A)

### Hashing Integeres

* [pdf notes](https://d3c33hcgiwev3.cloudfront.net/_c868028143804d149e8f66ee34c26b71_07_hash_tables_2_hashfunctions.pdf?Expires=1589241600&Signature=DcTh8b8HPSvoQ3xi8QMahVlEPK5C6Cpf~60zhfYFYkH-dG-atiJGhZjXzSNxl9gwqN9Z7F6OEpssDfC4TFKjmPuKjVsN8jC0D~VrHynLNT-2hlzPo3OumzVT2m5tI7id-rP8gYoUBL4SShv4AqyfpkrgTHrenykyqeTv8M2BGaQ_&Key-Pair-Id=APKAJLTNE6QMUY6HBC5A)

### Hashing strings

* [pdf Notes](https://d3c33hcgiwev3.cloudfront.net/_c868028143804d149e8f66ee34c26b71_07_hash_tables_2_hashfunctions.pdf?Expires=1589241600&Signature=DcTh8b8HPSvoQ3xi8QMahVlEPK5C6Cpf~60zhfYFYkH-dG-atiJGhZjXzSNxl9gwqN9Z7F6OEpssDfC4TFKjmPuKjVsN8jC0D~VrHynLNT-2hlzPo3OumzVT2m5tI7id-rP8gYoUBL4SShv4AqyfpkrgTHrenykyqeTv8M2BGaQ_&Key-Pair-Id=APKAJLTNE6QMUY6HBC5A)
* hashing functions: ![hashing](https://i.imgur.com/fcIh5cW.png)
