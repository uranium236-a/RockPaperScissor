 const rockBtn = document.querySelector('.rock-btn')
            .addEventListener('click', () => {
                play(1);
            })
        const paperBtn = document.querySelector('.paper-btn')
            .addEventListener('click', () => {
                play(2);
            })
        const scissorBtn = document.querySelector('.scissor-btn')
            .addEventListener('click', () => {
                play(3);
            })

        document.body.addEventListener("keydown", (event) => {
            if(event.key === 'r') {
                play(1);
            } else if(event.key === 'p') {
                play(2);
            } else if(event.key === 's') {
                play(3);
            } else if(event.key === 'n') {
                restart();
            }
        })

        const score = JSON.parse(localStorage.getItem("Tscore")) || {
            playerScore : 0,
            computerScore : 0
        };

        document.getElementById('player-score').textContent = score.playerScore;
        document.getElementById('computer-score').textContent = score.computerScore;

        let playerMove = 0;
        let computerMove = 0;
        let running = true;

        function delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        function reset() {
            score.playerScore = 0;
            score.computerScore = 0;

            localStorage.setItem("Tscore", JSON.stringify(score));
            document.getElementById('player-score').textContent = score.playerScore;
            document.getElementById('computer-score').textContent = score.computerScore;
            restart();
        }

        function restart() {
            let playerMove = 0;
            let computerMove = 0;
            
            document.getElementById('pw').textContent = "Player:";
            document.getElementById('cw').textContent = "Computer:";
            document.getElementById('rst-btn').style.display = "none";
            document.getElementById('msg').textContent = "Choose your Move";
            running = true;
        }

        async function play(p) {
            if(!running) return;

            playerMove = p;

            if(playerMove === 1) {
                document.getElementById('pw').textContent = "player: Rock 🗿";
            } else if(playerMove === 2) {
                document.getElementById('pw').textContent = "player Paper 🧻";
            } else if(playerMove === 3) {
                document.getElementById('pw').textContent = "player Scissor ✂";
            }

            computerMove = Math.floor(Math.random() * 3) + 1;

             if(computerMove === 1) {
                document.getElementById('cw').textContent = "computer: Rock 🗿";
            } else if(computerMove === 2) {
                document.getElementById('cw').textContent = "computer: Paper 🧻";
            } else if(computerMove === 3) {
                document.getElementById('cw').textContent = "computer: Scissor ✂";
            }

            document.getElementById('msg').textContent = "...";
            await delay(500);

            let condition;

            if(playerMove === computerMove) {
                //tie
                condition = "tie";
            } else if(playerMove === 1 && computerMove === 2) {
                //cw
                condition = "cw";
                score.computerScore++;
            } else if(playerMove === 2 && computerMove === 1) {
                //pw
                condition = "pw";
                score.playerScore++;
            } else if(playerMove === 2 && computerMove === 3) {
                //cw 
                condition = "cw";
                score.computerScore++;
            } else if(playerMove === 3 && computerMove === 2) {
                //pw
                condition = "pw";
                score.playerScore++;
            } else if(playerMove === 3 && computerMove === 1) {
                //cw
                condition = "cw";
                score.computerScore++;
            } else if(playerMove === 1 && computerMove === 3) {
                //pw
                condition = "pw";
                score.playerScore++;
            }

            document.getElementById('player-score').textContent = score.playerScore;
            document.getElementById('computer-score').textContent = score.computerScore;

            if(condition === "tie") {
                document.getElementById('msg').textContent = "Game Tie";
            } else if(condition === "pw") {
                document.getElementById('msg').textContent = "You Win";
            } else {
                document.getElementById('msg').textContent = "Computer wins";
            }

            localStorage.setItem("Tscore", JSON.stringify(score));

            if(!isAutoPlay)
            document.getElementById('rst-btn').style.display = "block";
            running = false;
         }

         let isAutoPlay = false;
         let autoplayId;

         function autoplay() {
            if(!isAutoPlay) {
                isAutoPlay = true;
                document.getElementById('autoplay-btn').textContent = "stop";
                autoPlayId = setInterval(() => {
                    const playerMove = Math.floor(Math.random() * 3) + 1;
                    play(playerMove);
                    running = true;
                }, 500);
            } else {
                document.getElementById('autoplay-btn').textContent = "autoplay";
                clearInterval(autoPlayId);
                isAutoPlay = false;
                restart();
            }
         }
