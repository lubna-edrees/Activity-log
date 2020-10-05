<!-- markdownlint-disable MD004 MD026 MD009 MD046 -->
# vim

## intro

- vim modes
  1. normal : useful for navigating between files
  2. insert : type code
  3. replace: code you are writting replaces the previous
  4. visual
  5. select : 1. line 2. block
  6. command line mode : command shell from inside vim

## buttons in normal mode:

 ```js
     i // insert mode
     esc // back to normal mode
     r // replace mode
     v // visual mode
     Shift + v // select line
     ctrl + v // select block
     : // command line mode

 ```

- Basic movement: hjkl (left, down, up, right)
- Words: w (next word), b (beginning of word), e (end of word)
- Lines: 0 (beginning of line), ^ (first non-blank character), $ (end of line)
- Screen: H (top of screen), M (middle of screen), L (bottom of screen)
- Scroll: Ctrl-u (up), Ctrl-d (down)
- File: gg (beginning of file), G (end of file)
- Line numbers: :{number} `<CR>` or {number}G (line {number})
- Misc: % (corresponding item)
- Find: f{character}, t{character}, F{character}, T{character}
- find/to forward/backward {character} on the current line , / ; for navigating matches
- Search: /{regex}, n / N for navigating matches

## buttons in command line mode:

  ```js
      :q // quit without saving
      :w // save, don't exit
  ```
## Vim in VS Code

- you start in Normal mode: 

  ```js
  /* button */
  I, i // insert mode, type normally
  H // top of the Screen
  L <upper L> // end of Screen
  M // middle of the Screen

  esc // back to normal mode
  
  j // next line
  k // previous line
  l <lower L> // right one letter
  h <lower H> // left one letter
  
  w // move one word 
  e // end of the next word 
  g > e // move to the previous word
  f > { char } // move to specific char in the line
  
  0 // Moves to the first character of a line
  ^ // Moves to the first non-blank character of a line
  $ // Moves to the end of a line
  g_ // Moves to the non-blank character at the end of a line
  
  
  } // jumps entire paragraphs downwards
  { // similarly but upwards
  CTRL-D // let’s you move down half a page
  CTRL-U // let’s you move up half a page

  
  /{pattern} // to search forward inside a file
  ?{pattern} // to search backwards
  * // searchfor the word under the cursor

  { number } > { pattern } // execute the pattern n times like: 2 > j : moves down 2 lines.

  
  g > d // to jump to definition of whatever is under your cursor
  g > f // to jump to a file in an import



  g > g // to go to the top of the file
  {line} > g > g // to go to a specific line
  G // to go to the end of the file
  % // jump to matching ({[]})

  ```

## References

- [1] [Cambridge: Vim](https://www.youtube.com/watch?v=a6Q8Na575qc)
