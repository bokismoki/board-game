const fields = document.querySelectorAll(".field");
const dice = document.querySelector(".dice");
const flipCard = document.querySelector(".flip-card-inner");
const flipCardBack = document.querySelector(".flip-card-back");
const prison = document.querySelector(".prison");
const winModal = document.querySelector(".winModal");
const winModalClose = document.querySelector(".winModal i");

let currentFieldOne = 0;
let currentFieldTwo = 0;

let turnsLeftInPrisonOne = 0;
let turnsLeftInPrisonTwo = 0;

let diceActive = true;

let activePlayer = 1;

const randomCards = [
    {
        url: "img/plusOne.png",
        title: "Pure luck!",
        description: "You move 1 field forward.",
        cardEffectId: 1
    },
    {
        url: "img/minusOne.png",
        title: "Unlucky you!",
        description: "You move 1 field backward.",
        cardEffectId: 2
    },
    {
        url: "img/plusOne.png",
        title: "Better luck next time!",
        description: "Your opponent moves 1 field forward.",
        cardEffectId: 3
    },
    {
        url: "img/minusOne.png",
        title: "Luck is on your side!",
        description: "Your opponent moves 1 field backward.",
        cardEffectId: 4
    },
    {
        url: "img/minusThree-minusOne.png",
        title: "Wish him a good luck...",
        description: "Your opponent moves 3 fields backward if he is in front of you or 1 field backward if he is behind you.",
        cardEffectId: 5
    }
]

dice.addEventListener("click", () => {

    if (activePlayer === 1) {

        if (turnsLeftInPrisonOne === 0) {

            prison.innerHTML = `
                <div class="turnsLeftWrapperOne"><span class="turnsLeftOne">${turnsLeftInPrisonOne}</span></div>
                <div class="turnsLeftWrapperTwo"><span class="turnsLeftTwo">${turnsLeftInPrisonTwo}</span></div>
                <img src="img/prison.png">`;

            if (diceActive) {

                let randomDice = Math.floor(Math.random() * 3 + 1);
                dice.style.background = `url("img/dice-${randomDice}.png") no-repeat center center`;
                dice.style.backgroundSize = "cover";

                resetFields();
                currentFieldOne += randomDice;

                if (currentFieldOne >= 32) {

                    currentFieldOne = 0;
                    currentFieldTwo = 0;
                    updateFields();

                    winModal.classList.add("show");
                    winModal.style.backgroundColor = "rgba(0,0,255, 0.8)";

                    winModalClose.addEventListener("click", () => {

                        winModal.classList.remove("show");
                        activePlayer = 2;

                    });

                } else if (currentFieldOne < 32 && (currentFieldOne === 1 || currentFieldOne === 5 || currentFieldOne === 9 || currentFieldOne === 14 || currentFieldOne === 21 || currentFieldOne === 24 || currentFieldOne === 29)) {

                    diceActive = false;

                    updateFields();

                    let randomCardNumber = Math.floor(Math.random() * 5);

                    flipCardBack.innerHTML = `
                        <i class="fas fa-times fa-2x close"></i>
                        <img src=${randomCards[randomCardNumber].url}>
                        <h1 class="cardTitle">${randomCards[randomCardNumber].title}</h1>
                        <h3 class="cardDescription" style="letter-spacing: 2px;">${randomCards[randomCardNumber].description}</h3>`;

                    flipCard.classList.add("flipped");

                    let cardEffectId = randomCards[randomCardNumber].cardEffectId;

                    let close = document.querySelector(".close");

                    close.addEventListener("click", () => {

                        flipCard.classList.remove("flipped");

                        diceActive = true;

                        switch (cardEffectId) {
                            case 1:
                                cardEffectOne();
                                activePlayer = 2;
                                break;
                            case 2:
                                cardEffectTwo();
                                activePlayer = 2;
                                break;
                            case 3:
                                cardEffectThree();
                                activePlayer = 2;
                                break;
                            case 4:
                                cardEffectFour();
                                activePlayer = 2;
                                break;
                            case 5:
                                cardEffectFive();
                                activePlayer = 2;
                                break;
                        }

                    });

                } else if (currentFieldOne < 32 && (currentFieldOne === 16 || currentFieldOne === 27)) {

                    prisonFunc();

                } else if (currentFieldOne < 32 && (currentFieldOne === 6 || currentFieldOne === 18)) {

                    switchPlaces();
                    activePlayer = 2;

                } else if (currentFieldOne < 32 && (currentFieldOne === 12)) {

                    doubleDice(randomDice);
                    activePlayer = 2;

                } else if (currentFieldOne < 32) {

                    updateFields();
                    activePlayer = 2;

                }
            }

        } else {

            turnsLeftInPrisonOne--;

            prison.innerHTML = `
                <div class="turnsLeftWrapperOne"><span class="turnsLeftOne">${turnsLeftInPrisonOne}</span></div>
                <div class="turnsLeftWrapperTwo"><span class="turnsLeftTwo">${turnsLeftInPrisonTwo}</span></div>
                <img src="img/prison.png">
                <img src="img/playerKnight-1.png" class="playerKnight">`;

            updateFields();

            activePlayer = 2;

        }

    } else if (activePlayer === 2) {

        if (turnsLeftInPrisonTwo === 0) {

            prison.innerHTML = `
                <div class="turnsLeftWrapperOne"><span class="turnsLeftOne">${turnsLeftInPrisonOne}</span></div>
                <div class="turnsLeftWrapperTwo"><span class="turnsLeftTwo">${turnsLeftInPrisonTwo}</span></div>
                <img src="img/prison.png">`;

            if (diceActive) {

                let randomDice = Math.floor(Math.random() * 3 + 1);
                dice.style.background = `url("img/dice-${randomDice}.png") no-repeat center center`;
                dice.style.backgroundSize = "cover";

                resetFields();
                currentFieldTwo += randomDice;

                if (currentFieldTwo >= 32) {

                    currentFieldTwo = 0;
                    currentFieldOne = 0;

                    fields[currentFieldTwo].innerHTML = `
                        <img src="img/playerKnight-2.png" class="playerKnight">`;
                    fields[currentFieldOne].innerHTML = `
                        <img src="img/playerKnight-1.png" class="playerKnight">`;

                    winModal.classList.add("show");
                    winModal.style.backgroundColor = "rgba(255,0,0, 0.8)";

                    winModalClose.addEventListener("click", () => {

                        winModal.classList.remove("show");
                        activePlayer = 1;

                    });

                } else if (currentFieldTwo < 32 && (currentFieldTwo === 1 || currentFieldTwo === 5 || currentFieldTwo === 9 || currentFieldTwo === 14 || currentFieldTwo === 21 || currentFieldTwo === 24 || currentFieldTwo === 29)) {

                    diceActive = false;

                    updateFields();

                    let randomCardNumber = Math.floor(Math.random() * 5);

                    flipCardBack.innerHTML = `
                        <i class="fas fa-times fa-2x close"></i>
                        <img src=${randomCards[randomCardNumber].url}>
                        <h1 class="cardTitle">${randomCards[randomCardNumber].title}</h1>
                        <h3 class="cardDescription" style="letter-spacing: 2px;">${randomCards[randomCardNumber].description}</h3>`;

                    flipCard.classList.add("flipped");

                    let cardEffectId = randomCards[randomCardNumber].cardEffectId;

                    let close = document.querySelector(".close");

                    close.addEventListener("click", () => {

                        flipCard.classList.remove("flipped");

                        diceActive = true;

                        switch (cardEffectId) {
                            case 1:
                                cardEffectOne();
                                activePlayer = 1;
                                break;
                            case 2:
                                cardEffectTwo();
                                activePlayer = 1;
                                break;
                            case 3:
                                cardEffectThree();
                                activePlayer = 1;
                                break;
                            case 4:
                                cardEffectFour();
                                activePlayer = 1;
                                break;
                            case 5:
                                cardEffectFive();
                                activePlayer = 1;
                                break;
                        }

                    });

                } else if (currentFieldTwo < 32 && (currentFieldTwo === 16 || currentFieldTwo === 27)) {

                    prisonFunc();

                } else if (currentFieldTwo < 32 && (currentFieldTwo === 6 || currentFieldTwo === 18)) {

                    switchPlaces();
                    activePlayer = 1;

                } else if (currentFieldTwo < 32 && (currentFieldTwo === 12)) {

                    doubleDice(randomDice);
                    activePlayer = 1;

                } else if (currentFieldTwo < 32) {

                    updateFields();
                    activePlayer = 1;

                }
            }
        } else {

            turnsLeftInPrisonTwo--;

            prison.innerHTML = `
                <div class="turnsLeftWrapperOne"><span class="turnsLeftOne">${turnsLeftInPrisonOne}</span></div>
                <div class="turnsLeftWrapperTwo"><span class="turnsLeftTwo">${turnsLeftInPrisonTwo}</span></div>
                <img src="img/prison.png">
                <img src="img/playerKnight-2.png" class="playerKnight">`;

            updateFields();

            activePlayer = 1;

        }

    }

});

// -----------------------------------------------------------//
// ----------------------- FUNCTIONS ------------------------ // 
// -----------------------------------------------------------//

// FIELDS INNERHTML RESETER
function resetFields() {

    fields.forEach(field => {
        field.innerHTML = "";
    });

}

// UPDATE FIELDS INNERHTML
function updateFields() {

    fields[currentFieldOne].innerHTML = `
        <img src="img/playerKnight-1.png" class="playerKnight">`;
    fields[currentFieldTwo].innerHTML = `
        <img src="img/playerKnight-2.png" class="playerKnight">`;

}

// SWITCH PLACES
function switchPlaces() {

    if (turnsLeftInPrisonOne === 0 && turnsLeftInPrisonTwo === 0) {

        console.log("Switch places");

        let takeCurrentFieldOne = currentFieldOne;
        let takeCurrentFieldTwo = currentFieldTwo;

        updateFields();

        if (activePlayer === 1) {

            currentFieldTwo = takeCurrentFieldOne;
            currentFieldOne = takeCurrentFieldTwo;

            setTimeout(() => {
                updateFields();
            }, 500);

        } else if (activePlayer === 2) {

            currentFieldTwo = takeCurrentFieldOne;
            currentFieldOne = takeCurrentFieldTwo;

            setTimeout(() => {
                updateFields();
            }, 500);

        }

    } else {
        updateFields();
    }

}

// DOUBLE DICE
function doubleDice(randomDice) {

    console.log("Double dice");

    updateFields();

    if (activePlayer === 1) {

        currentFieldOne += randomDice;

        setTimeout(() => {
            resetFields();

            updateFields();
        }, 500)

    } else if (activePlayer === 2) {

        currentFieldTwo += randomDice;

        setTimeout(() => {
            resetFields();

            updateFields();
        }, 500)

    }

}

// PRISON FUNCTION
function prisonFunc() {

    if (activePlayer === 1) {

        diceActive = false;

        updateFields();

        setTimeout(() => {

            currentFieldOne = 16;

            turnsLeftInPrisonOne = 1;

            resetFields();

            prison.innerHTML = `
                            <div class="turnsLeftWrapperOne"><span class="turnsLeftOne">${turnsLeftInPrisonOne}</span></div>
                            <div class="turnsLeftWrapperTwo"><span class="turnsLeftTwo">${turnsLeftInPrisonTwo}</span></div>
                            <img src="img/prison.png">
                            <img src="img/playerKnight-1.png" class="playerKnight">`;

            diceActive = true;

            fields[currentFieldTwo].innerHTML = `
                            <img src="img/playerKnight-2.png" class="playerKnight">`;

        }, 500)

        activePlayer = 2;

    } else if (activePlayer === 2) {

        diceActive = false;

        updateFields();

        setTimeout(() => {

            currentFieldTwo = 16;

            turnsLeftInPrisonTwo = 1;

            resetFields();

            prison.innerHTML = `
                            <div class="turnsLeftWrapperOne"><span class="turnsLeftOne">${turnsLeftInPrisonOne}</span></div>
                            <div class="turnsLeftWrapperTwo"><span class="turnsLeftTwo">${turnsLeftInPrisonTwo}</span></div>
                            <img src="img/prison.png">
                            <img src="img/playerKnight-2.png" class="playerKnight">`;

            diceActive = true;

            fields[currentFieldOne].innerHTML = `
                            <img src="img/playerKnight-1.png" class="playerKnight">`;

        }, 500)

        activePlayer = 1;

    }

}

// CARD EFFECT FUNCTIONS
function cardEffectOne() {

    resetFields();

    console.log("Function 1 fired");

    if (activePlayer === 1) {

        currentFieldOne += 1;

        updateFields();

        if (currentFieldOne === 6 || currentFieldOne === 18) {
            switchPlaces();
        }

    } else if (activePlayer === 2) {

        currentFieldTwo += 1;

        updateFields();

        if (currentFieldTwo === 6 || currentFieldTwo === 18) {
            switchPlaces();
        }

    }

}

function cardEffectTwo() {

    resetFields();

    console.log("Function 2 fired");

    if (activePlayer === 1) {

        currentFieldOne -= 1;

        updateFields();

        if (currentFieldOne === 6 || currentFieldOne === 18) {
            switchPlaces();
        }

    } else if (activePlayer === 2) {

        currentFieldTwo -= 1;

        updateFields();

        if (currentFieldTwo === 6 || currentFieldTwo === 18) {
            switchPlaces();
        }

    }

}

function cardEffectThree() {

    resetFields();

    console.log("Function 3 fired");

    if (activePlayer === 1) {

        if (turnsLeftInPrisonTwo === 0) {

            currentFieldTwo += 1;

            updateFields();

            if (currentFieldTwo === 6 || currentFieldTwo === 18) {
                switchPlaces();
            } else if (currentFieldTwo === 16 || currentFieldTwo === 27) {
                prisonFunc();
            }

        } else {
            updateFields();
        }

    } else if (activePlayer === 2) {

        if (turnsLeftInPrisonOne === 0) {

            currentFieldOne += 1;

            updateFields();

            if (currentFieldOne === 6 || currentFieldOne === 18) {
                switchPlaces();
            } else if (currentFieldOne === 16 || currentFieldOne === 27) {
                prisonFunc();
            }

        } else {
            updateFields();
        }

    }

}

function cardEffectFour() {

    resetFields();

    console.log("Function 4 fired");

    if (activePlayer === 1) {

        if (turnsLeftInPrisonTwo === 0) {

            if (currentFieldTwo > 0) {

                currentFieldTwo -= 1;

                updateFields();

                if (currentFieldTwo === 6 || currentFieldTwo === 18) {
                    switchPlaces();
                } else if (currentFieldTwo === 16 || currentFieldTwo === 27) {
                    prisonFunc();
                }

            } else if (currentFieldTwo <= 0) {
                updateFields();
            }

        } else {
            updateFields();
        }

    } else if (activePlayer === 2) {

        if (turnsLeftInPrisonOne === 0) {

            if (currentFieldOne > 0) {

                currentFieldOne -= 1;

                updateFields();

                if (currentFieldOne === 6 || currentFieldOne === 18) {
                    switchPlaces();
                } else if (currentFieldOne === 16 || currentFieldOne === 27) {
                    prisonFunc();
                }

            } else if (currentFieldOne <= 0) {
                updateFields();
            }
        }

    } else {
        updateFields();
    }

}

function cardEffectFive() {

    console.log("Function 5 fired");

    resetFields();

    if (activePlayer === 1) {

        if (currentFieldOne >= currentFieldTwo) {

            if (currentFieldTwo > 0) {

                console.log("Player 2 moves -1");

                currentFieldTwo -= 1;

                updateFields();

                if (currentFieldTwo === 6 || currentFieldTwo === 18) {
                    switchPlaces();

                    updateFields();
                } else if (currentFieldTwo === 16 || currentFieldTwo === 27) {
                    prisonFunc();
                }

            } else if (currentFieldTwo <= 0) {
                updateFields();
            }

        } else if (currentFieldOne < currentFieldTwo) {

            console.log("Player 2 moves -3");

            currentFieldTwo -= 3;

            updateFields();

            if (currentFieldTwo === 6 || currentFieldTwo === 18) {
                switchPlaces();

                updateFields();
            } else if (currentFieldTwo === 16 || currentFieldTwo === 27) {
                prisonFunc();
            }

        }

    } else if (activePlayer === 2) {

        if (currentFieldTwo >= currentFieldOne) {

            if (currentFieldOne > 0) {

                console.log("Player 1 moves -1");

                currentFieldOne -= 1;

                updateFields();

                if (currentFieldOne === 6 || currentFieldOne === 18) {
                    switchPlaces();

                    updateFields();
                } else if (currentFieldOne === 16 || currentFieldOne === 27) {
                    prisonFunc();
                }

            } else if (currentFieldOne <= 0) {
                updateFields();
            }

        } else if (currentFieldTwo < currentFieldOne) {

            if (currentFieldOne >= 3) {

                console.log("Player 1 moves -3");

                currentFieldOne -= 3;

                updateFields();

                if (currentFieldOne === 6 || currentFieldOne === 18) {
                    switchPlaces();

                    updateFields();
                } else if (currentFieldOne === 16 || currentFieldOne === 27) {
                    prisonFunc();
                }

            } else if (currentFieldOne < 3) {
                currentFieldOne = 0;

                updateFields();
            }

        }

    }

}