const username = document.querySelector('#username');
const saveScoreBtn = document.querySelector('#saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const result = document.getElementById('result');
const finalWord = document.getElementById('final-word');
//const mostRecentScore = document.querySelector('#mostRecentScore');

let mostRecentScore = 0;
// const MAX_HIGH_SCORES = 5;

showResult = () => {
    mostRecentScore = JSON.parse(localStorage.getItem('mostRecentScore'));
    
    finalScore.innerText = `Final Score: ${ mostRecentScore }`;

    if (mostRecentScore < 30) {
        finalWord.innerText = 'FAIL';
        finalWord.classList.add('fail');
        result.innerText = `Even though you tried, there were too many errors. You are a beginner system of equations solver but you can improve very well if study more!`;
        result.classList.add('fail');
    } else {
        finalWord.innerText = 'WIN';
        finalWord.classList.add('win');
        result.innerText = `Congratulations, you finished this rather diffucult challenge well, you can now officialy call yourself a system of equations guru!`;
        result.classList.add('win');
    }
}

// username.addEventListener('keyup', () => {
//     saveScoreBtn.disabled = !username.value;
// });

// saveHighScore = e => {
//     e.preventDefault();

//     const score = {
//         score: mostRecentScore,
//         name: username.value
//     };

//     highScores.push(score);
//     highScores.sort((a, b) => {
//         return b.score - a.score;
//     });

//     highScores.splice(5);
//     localStorage.setItem('highScores', JSON.stringify(highScores));
//     window.location.assign('index.html');
// }

showResult();