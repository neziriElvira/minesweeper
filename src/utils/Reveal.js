const revealed = (arr, x, y, newNonMines, newMineCount) => {

    // all the cells which are adjaced to zero must be stored in the array 
    // so that it can be revealed later

    let show = [];
    show.push(arr[x][y]);
    while (show.length !== 0) {
        let one = show.pop();
        let i = one.x;
        let j = one.y;
        if (!one.revealed) {
            newNonMines--;
            one.revealed = true;
        }
        if (one.value !== 0) {
            break;
        }

        // top left 

        if (
            i > 0 &&
            j > 0 &&
            arr[i - 1][j - 1].value === 0 &&
            !arr[i - 1][j - 1].revealed
        ) {
            show.push(arr[i - 1][j - 1]);
        }

        // bottom right

        if (
            i < arr.length - 1 &&
            j < arr[0].length - 1 &&
            arr[i + 1][j + 1].value === 0 &&
            !arr[i + 1][j + 1].revealed
        ) {
            show.push(arr[i + 1][j + 1]);
        }

        // top right

        if (
            i > 0 &&
            j < arr[0].length - 1 &&
            arr[i - 1][j + 1].value === 0 &&
            !arr[i - 1][j + 1].revealed
        ) {
            show.push(arr[i - 1][j + 1]);
        }

        // bottom left 

        if (
            i < arr.length - 1 &&
            j > 0 &&
            arr[i + 1][j - 1].value === 0 &&
            !arr[i + 1][j - 1].revealed
        ) {
            show.push(arr[i + 1][j - 1]);
        }

        // top 
        if (
            i > 0 &&
            arr[i - 1][j].value === 0 &&
            !arr[i - 1][j].revealed
        ) {
            show.push(arr[i - 1][j]);
        }

        // right

        if (
            j < arr[0].length - 1 &&
            arr[i][j + 1].value === 0 &&
            !arr[i][j + 1].revealed
        ) {
            show.push(arr[i][j + 1]);
        }

        // bottom

        if (
            i < arr.length - 1 &&
            arr[i + 1][j].value === 0 &&
            !arr[i + 1][j].revealed
        ) {
            show.push(arr[i + 1][j]);
        }

        // left

        if (
            j > 0 &&
            arr[i][j - 1].value === 0 &&
            !arr[i][j - 1].revealed
        ) {
            show.push(arr[i][j - 1]);
        }


        // start revealing the item

        if (
            i > 0 &&
            j > 0 &&
            !arr[i - 1][j - 1].revealed
        ) {
            //Top Left Reveal
            if (arr[i - 1][j - 1].flagged) {
                newMineCount++;
            }

            arr[i - 1][j - 1].revealed = true;
            newNonMines--;
        }

        if (j > 0 && !arr[i][j - 1].revealed) {
            // Left Reveal
            if (arr[i][j - 1].flagged) {
                newMineCount++;
            }
            arr[i][j - 1].revealed = true;
            newNonMines--;
        }

        if (
            i < arr.length - 1 &&
            j > 0 &&
            !arr[i + 1][j - 1].revealed
        ) {
            //Bottom Left Reveal
            if (arr[i + 1][j - 1].flagged) {
                newMineCount++;
            }
            arr[i + 1][j - 1].revealed = true;
            newNonMines--;
        }

        if (i > 0 &&
            !arr[i - 1][j].revealed) {
            //Top Reveal
            if (arr[i - 1][j].flagged) {
                newMineCount++;
            }
            arr[i - 1][j].revealed = true;
            newNonMines--;
        }

        if (i < arr.length - 1 && !arr[i + 1][j].revealed) {
            // Bottom Reveal
            if (arr[i + 1][j].flagged) {
                newMineCount++;
            }
            arr[i + 1][j].revealed = true;
            newNonMines--;
        }

        if (
            i > 0 &&
            j < arr[0].length - 1 &&
            !arr[i - 1][j + 1].revealed
        ) {
            // Top Right Reveal
            if (arr[i - 1][j + 1].flagged) {
                newMineCount++;
            }
            arr[i - 1][j + 1].revealed = true;
            newNonMines--;
        }

        if (j < arr[0].length - 1 &&
            !arr[i][j + 1].revealed) {
            //Right Reveal
            if (arr[i][j + 1].flagged) {
                newMineCount++;
            }
            arr[i][j + 1].revealed = true;
            newNonMines++;
        }

        if (
            i < arr.length - 1 &&
            j < arr[0].length - 1 &&
            !arr[i + 1][j + 1].revealed
        ) {
            // Bottom Right Reveal
            if (arr[i + 1][j + 1].flagged) {
                newMineCount++;
            }
            arr[i + 1][j + 1].revealed = true;
            newNonMines--;
        }
    }

    return { arr, newNonMines, newMineCount }

}

export default revealed;