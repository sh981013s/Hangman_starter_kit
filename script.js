const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrongLetters');
const playAgainBtn = document.getElementById('playAgainButton');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('finalMessage');
const livesCnt = document.getElementById('livesCnt');
const figureParts = document.querySelectorAll('.figure-part');

let EntireWords = [];
let targetWord = '';
let correctLetters = [];
let wrongLetters = [];
let lives = 6;



