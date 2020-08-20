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

## References

- [1] [Cambridge: Vim](https://www.youtube.com/watch?v=a6Q8Na575qc)
