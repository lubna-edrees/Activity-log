
function percolation(n) {
    if(n <= 0){
        throw new Error('Grid length Must Be > 1'); 
    }
    // creates n-by-n grid, with all sites initially blocked
    var grid = crate_Nd_Array(n);

    // opens the site (row, col) if it is not open already
    openSite(grid, 4, 2);
    openSite(grid, 0, 0);
    openSite(grid, 1, 0);
    openSite(grid, 0, 3);
    openSite(grid, 1, 3);
    openSite(grid, 2, 3);
    openSite(grid, 4, 4)
    console.log(grid);

     // is the site (row, col) open?
    console.log('IsOpen[2,1]?', isOpen(grid, 2, 1));

      // is the site (row, col) full?
      console.log(isFull(grid, 4,  4));


}
/**
 * Create N*N Grid
 * @method
 * @param int n   size of the grid
 * @return Array [N*N] 
 */
function crate_Nd_Array(n) {
    if(n <= 0){
        throw new Error('Grid length Must Be > 1'); 
    }
    var id = new Array(n);

    for (let f = 0; f < id.length; f++) {
        id[f] = new Array(n);
    }

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            id[i][j] = 0;
        }
    }

    return id;
}

/**
 * opens a blocked site
 * @param Array arr - the percoulation grid
 * @param int row 
 * @param int col 
 * @return void - opens the site with id[row,col]
 */
function openSite(arr, row, col) {
    if(row < 0 || col < 0 ){
        throw new Error('No Negative indexes allowed'); 
    }
    try {
   
        if (arr[row][col] == 1) {
            return;
        }

        if (arr[row][col] == 0) {
            return arr[row][col] = 1;
        }

    } catch (error) {
        console.log(error);
        throw new Error('Check Your Query!')
    }

}


/**
 * check if a site in the grid is open
 * @param Array arr - the percoulation grid
 * @param int row 
 * @param int col 
 * @return boolean  - true if site is open, false if site is closed
 */
function isOpen(arr, row, col) {
    if(row < 0 || col < 0 ){
        throw new Error('No Negative indexes allowed'); 
    }
    try {
       
        if (arr[row][col] == 1) {
            return true;
        }

        if (arr[row][col] == 0) {
            return false;
        }

    } catch (error) {
        console.log(error);
        throw new Error('Check Your Query!')
    }

}



/**
 * check if a site in the grid is full. 
 * 
 *  A full site is an open site that can be connected to an open site in the top row via a chain of neighboring (left, right, up, down) open sites.
 * @param Array arr - the percoulation grid
 * @param int row 
 * @param int col 
 * @return boolean  - true if site is open, false if site is closed
 */
function isFull(arr, row, col) {
    let count =crate_Nd_Array(arr.length);
    if(row < 0 || col < 0 ){
        throw new Error('No Negative indexes allowed'); 
    }
    try {

        if (arr[row][col] == 0) {
            return false;
        }
       
        if (arr[row][col] == 1) {
           for(let i=1; i<arr.length; i++){
            for(let j=0; j<=col; j++){

                 if(isOpen(arr,i,j)){
                   if(is_2_rows_connected(arr, i , j)){
                        let countt = count[i-1];
                        countt.push([[i,j], [i-1, j]])
                   };
                 }
            }

           }
        }

       return count;

    } catch (error) {
        console.log(error);
        throw new Error('Check Your Query!')
    }

}


/**
 * check if 2 rows are connected. 
 * 
 * @param Array arr - the percoulation grid
 * @param int row 
 * @param int col 
 * @return boolean  - true if site is open, false if site is closed
 */
function is_2_rows_connected(arr, r, c){

              if(isOpen(arr,r,c) && isOpen(arr, r-1, c )){
                     return true;
              }

        return false;

}

percolation(6);