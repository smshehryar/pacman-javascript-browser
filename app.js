document.addEventListener('DOMContentLoaded', () =>{

    const grid = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score');
    const ghostsEatenDisplay = document.getElementById('ghostsEaten');
    const width = 28; // 28x28 = 784 squares
    let score = 0;
    let ghostsEaten = 0;
    const layout = [ // this layout has exactly 784 elements to act as the squares of our grid
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ]; 

    // Legend
    //0 - pac-dot
    //1 - wall
    //2 - ghost-lair
    //3 - power-pellet
    //4 - empty
    const squares = [];
    function createBoard()
    {
        for(i=0;i<layout.length; i++)
        {
            const square = document.createElement('div');
            grid.appendChild(square);
            squares.push(square);

            // add layout to the board
            if(layout[i] === 0) // checking if an item in the layout array is pac-dot
            {
                squares[i].classList.add('pac-dot');
            }
            else if(layout[i] === 1)
            {
                squares[i].classList.add('wall');
            }
            else if(layout[i] === 2)
            {
                squares[i].classList.add('ghost-lair');
            }
            else if(layout[i] === 3)
            {
                squares[i].classList.add('power-pellet');
            }
            else if(layout[i] === 4)
            {
                squares[i].classList.add('empty');
            }
        }
    }
    createBoard();

    // starting position of pac-man
    var pacmanCurrentIndex = 490;

    squares[pacmanCurrentIndex].classList.add('pac-man');

    //pac-man move controls

    function movePacman(e)
    {
        squares[pacmanCurrentIndex].classList.remove('pac-man');

        switch (e.keyCode) {
            case 37: // if left arrow key pressed
                if(
                    (pacmanCurrentIndex%width !== 0) && 
                    (!squares[pacmanCurrentIndex-1].classList.contains('wall')) &&
                    (!squares[pacmanCurrentIndex-1].classList.contains('ghost-lair'))
                    )
                {
                    pacmanCurrentIndex -= 1;
                }
                if((pacmanCurrentIndex - 1) === 363)
                {
                    pacmanCurrentIndex = 391;
                }
                break;
            case 38: // if up arrow key pressed
                if(
                    (pacmanCurrentIndex-width >= 0) && 
                    (!squares[pacmanCurrentIndex-width].classList.contains('wall')) &&
                    (!squares[pacmanCurrentIndex-width].classList.contains('ghost-lair'))
                    )
                {
                    pacmanCurrentIndex -= width;
                }
                break;
            case 39: // if left arrow key pressed
                if(
                    (pacmanCurrentIndex%width < width-1) && 
                    (!squares[pacmanCurrentIndex+1].classList.contains('wall')) &&
                    (!squares[pacmanCurrentIndex+1].classList.contains('ghost-lair'))
                    )
                {
                    pacmanCurrentIndex += 1;
                }
                if((pacmanCurrentIndex + 1) === 392)
                {
                    pacmanCurrentIndex = 364;
                }
                break;
            case 40: // if left arrow key pressed
                if(
                    (pacmanCurrentIndex+width <width*width) && 
                    (!squares[pacmanCurrentIndex+width].classList.contains('wall')) &&
                    (!squares[pacmanCurrentIndex+width].classList.contains('ghost-lair'))
                    )
                {
                    pacmanCurrentIndex += width;
                }
                break;
        
            default:
                break;
        }// end switch

        squares[pacmanCurrentIndex].classList.add('pac-man');

        pacDotEaten();
        powerPelletEaten();
        checkForGameOver();
        checkForWin();

    }// end movePacman function

    document.addEventListener('keyup', movePacman);

    function pacDotEaten()
        {
            if(squares[pacmanCurrentIndex].classList.contains('pac-dot'))
            {
                score++;
                scoreDisplay.innerHTML = score;
                squares[pacmanCurrentIndex].classList.remove('pac-dot');
            }
        }// end function pacDotEaten
    
    function powerPelletEaten()
    {
        if(squares[pacmanCurrentIndex].classList.contains('power-pellet'))
        {
            score += 10;
            scoreDisplay.innerHTML = score;
            ghosts.forEach(ghost => ghost.isScared = true);
            setTimeout(unScareGhosts, 10000);
            squares[pacmanCurrentIndex].classList.remove('power-pellet');
        }
    }// end method powerPelletEaten()  
    
    function unScareGhosts()
    {
        ghosts.forEach(ghost => ghost.isScared = false);
    }

    class Ghost
    {
        constructor(className, startIndex, speed)
        {
            this.className = className;
            this.startIndex = startIndex;
            this.speed = speed;
            this.currentIndex = startIndex;
            this.timerId = NaN;
            this.isScared = false;
        }
    }

    ghosts = [
        new Ghost('chi', 348, 250),
        new Ghost('kiki', 376, 400),
        new Ghost('coco', 351, 300),
        new Ghost('chanel', 379, 500)
    ];

    // draw the ghosts on to the grid
    ghosts.forEach(e => {
        squares[e.currentIndex].classList.add(e.className);
        squares[e.currentIndex].classList.add('ghost');
    });

    // move the ghosts 
    ghosts.forEach(e =>moveGhost(e));

    function moveGhost(ghost)
    {
        const directions = [-1, +1, width, -width];
        let direction = directions[Math.floor(Math.random()*directions.length)];

        ghost.timerId = setInterval(function()
        {
            if(
                !squares[ghost.currentIndex + direction].classList.contains('wall')
              &&!squares[ghost.currentIndex + direction].classList.contains('ghost')
              )
              {
                squares[ghost.currentIndex].classList.remove(ghost.className,'ghost', 'scared-ghost');
                ghost.currentIndex += direction;
                squares[ghost.currentIndex].classList.add(ghost.className,'ghost');
              }
              else
              {
                  direction = directions[Math.floor(Math.random()*directions.length)];
              }
              // if the ghost is currently scared
              if(ghost.isScared)
              {
                  squares[ghost.currentIndex].classList.add('scared-ghost');
              }

              //if the ghost is scared and pacman runs into it
              if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man'))
              {
                  squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
                  ghost.currentIndex = ghost.startIndex;
                  score += 100;
                  scoreDisplay.innerHTML = score;
                  ghostsEaten++;
                  ghostsEatenDisplay.innerHTML = ghostsEaten;
                  squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');
              }
              checkForGameOver();
        }, ghost.speed);

    }// end moveGhost function


    function checkForGameOver()
    {
        if(squares[pacmanCurrentIndex].classList.contains('ghost')
        && !squares[pacmanCurrentIndex].classList.contains('scared-ghost')
        )
        {
            ghosts.forEach(ghost => clearInterval(ghost.timerId));
            document.removeEventListener('keyup', movePacman);
            setTimeout(function()
            {
                alert('Game Over! Your Score: '+score);
            }, 500);
        }
    }// end method checkGameOver()

    function checkForWin()
    {
        if(score >= 274)
        {
            ghosts.forEach(ghost => clearInterval(ghost.timerId));
            document.removeEventListener('keyup', movePacman);
            alert('You Win! Your Score: '+score);
        }
        
    }// end method checkForWin()
});

