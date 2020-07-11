# Git

* list all branches :

  ```javascript
      git branch -a  // list local and remote branches
      git branch -r  // list remote branches only
      git show-branch // list branches and their last commit
  ```

* unstage last commit:

  ```javascript
    git reset --soft HEAD~1 // unstage last commit and keep the changes
    git reset --hard HEAD~1 // unstage last commit and discard the changes ** careful
  ```

* loging info about repo status:

  ```javascript
    git log --oneline --graph // list all coments, line for every commit
  ```

## delete branches

- localy:
  ``` git branch -d <branch name> ```
- locally, if the branch did not merged (force) :
  ``` git branch -D <branch name> ```
- remote: 
  ```  git push origin --delete <branch name> ```
