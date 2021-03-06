// ==UserScript==
// @name         Typecheat
// @namespace    *://typeracer.com/
// @version      1.1
// @description  Helps you cheat in Typeracer (I can't help you if you get captcha'd!)
// @author       LoganDark and Zayne
// @match        http://play.typeracer.com/*
// @grant        none
// @require      http://code.jquery.com/jquery-3.2.1.min.js
// ==/UserScript==

(function() {
    'use strict';
    var MSPK = 42; // milliseconds between each keypress / typo simulation, 42MSPK is the magic number for ~250 WPM, Don't go lower than 20MSPK which is ~500 WPM, 52MSPK for ~130WPM
    var intervalID = setInterval(func, 50);
    function func() {
        if (!document.getElementById('typecheat')) {
            var txtInput = $('.txtInput');
            if (txtInput.length !== 0) {
                var alreadyStarted = false;
                txtInput.after($('<button id="typecheat">Start Cheatin\'</button>').click(function() {
                    if (alreadyStarted === false) {
                        alreadyStarted = true;
                        var elem = $(this);
                        var challengeText = $('div > span[unselectable=on]').first().parent().text();
                        var currentIndex = 0;
                        var typoToClear = false;
                        var typeIntervalID;
                        function type(letter) {
                            txtInput.val((_, value) => {
                                return value + letter;
                            });
                        }
                        typeIntervalID = setInterval(function() {
                            if (currentIndex < challengeText.length) {
                                if (typoToClear === false) {
                                    if (Math.random() > 0.03) {
                                        type(challengeText.charAt(currentIndex));
                                        currentIndex ++;
                                    } else {
                                        typoToClear = txtInput.val();
                                        var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
                                        var chosenLetter = challengeText.charAt(currentIndex);
                                        while (challengeText.charAt(currentIndex) === chosenLetter) {
                                            chosenLetter = alphabet[Math.round(Math.random() * 26)];
                                        }
                                        type(chosenLetter);
                                    }
                                } else {
                                    txtInput.val(typoToClear);
                                    typoToClear = false;
                                }
                            } else {
                                clearInterval(typeIntervalID);
                            }
                        }, MSPK);
                    }
                }));
            }
        }
    }
})();
