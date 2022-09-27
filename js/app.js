const words = ["کشتی مسافرتی", "لوله بخاری", "یخچال ساید بای ساید", "پروفایل", "کارت ملی", "انبر نسارا", "پلیس فتا", "زندان", "ساپورت", "دفتر خاطرات", "پوشک بچه", "خانه سالمندان", "آتلیه عکاسی", "گالری اتومبیل", "سفارت", "جکوزی", "قهوه خانه", "استرالیا", "بورس", "کله پاچه", "عطر فروشی", "پاساژ", "کلوپ شبانه", "باشگاه بدنسازی", "قزل آلا"];
const vip = ["vip1", "vip2", "vip3", "vip4", "vip5", "vip6", "vip7",];
const vipWords = [...words, ...vip];

////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
function random(length) {
    let randomArray = [];
    while (randomArray.length < length) {
        let randomNumber = Math.floor(Math.random() * length);
        !randomArray.includes(randomNumber) ? randomArray.push(randomNumber) : null;
    }
    return randomArray
}
////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////

function previousSiblingAction(event) {
    let activeNow = event.target.parentNode;
    activeNow.classList.remove("active")
    activeNow.previousElementSibling.classList.add("active")
}


function nextSiblingAction(event) {
    let activeNow = event.target.parentNode;
    activeNow.classList.remove("active")
    activeNow.nextElementSibling.classList.add("active")
}



////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
function randomWordsList(randomNumberArray, wordType) {
    let randomWordsList = [];
    randomNumberArray.forEach(value => {
        randomWordsList.push(wordType[value]);
    })
    return randomWordsList
}



////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
function mainWords(classType) {

    if (classType === "start") {

        return randomWordsList(random(words.length), words)

    } else if (classType === "vip") {

        return randomWordsList(random(vipWords.length), vipWords)
    }
}
////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
let wordsList = null;



function chooseWords(event) {
    wordsList = null;
    let classType = event.target.className;

    if (classType === "start") {
        nextSiblingAction(event);
        wordsList = mainWords(classType);
    } else if (classType === "vip") {

        Swal.fire({
            title: 'رمز عبور را وارد کنید',
            input: 'password',
            inputAttributes: {
                maxlength: 10,
                autocapitalize: 'off',
                autocorrect: 'off',
            },
            background: '#4F5D75',
            confirmButtonText: "باشه",
            confirmButtonColor: "#DD6B55",
            showCancelButton: true,
            cancelButtonText: "انصراف",
        }).then(res => {
            if (res.isConfirmed) {
                if (+res.value !== 123) {
                    Swal.fire({
                        text: 'رمز عبور نامعتبر',
                        color: "#fff",
                        background: '#4F5D75',
                        confirmButtonText: "باشه",
                        confirmButtonColor: "#DD6B55"
                    });

                } else {
                    nextSiblingAction(event);
                    wordsList = mainWords(classType);
                }
            }


        })





    } else {
        Swal.fire({
            title: "ffff",
            text: "sss",
            color: "#fff",
            showConfirmButton: false,
            showCloseButton: true,
            background: '#4F5D75',
            confirmButtonText: "باشه",
            confirmButtonColor: "#DD6B55"
        })
    }


    index = 0;
    selectGamer.value = 4;
    selectSpy.value = 1;
    selectTime.value = 5;
    selectSpy.disabled = true;

}

////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////

function gamerCheck() {
    if (selectGamer.value >= 6) {

        selectSpy.disabled = false;
        if (selectGamer.value - selectSpy.value < 4) {
            selectSpy.value = selectGamer.value - 4;
            Swal.fire({
                position: 'center',
                text: 'تعداد بازیکن ها باید 4 نفر بیشتر از جاسوس ها باشد',
                confirmButtonText: "باشه",
                confirmButtonColor: "#DD6B55",
                timer: 3000,
                color: "#fff",
                background: '#4F5D75',
            })
        }

    } else {

        selectSpy.disabled = true;
        selectSpy.value = 1
    }
}


////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////

function getInformationGame(event) {
    nextSiblingAction(event);


    mergeCard(+selectGamer.value, +selectSpy.value)
}
////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
let mergeCard1 = null;
let index = 0
function mergeCard(gamer, spy) {

    mergeCard1 = [];

    for (let i = 0; i < gamer - spy; i++) {
        mergeCard1.push(wordsList[index])
    }

    for (let i = 0; i < spy; i++) {
        mergeCard1.push("شما جاسوس هستید")
    }
    mergeCardRandom(mergeCard1.length, mergeCard1)
    index++
}

////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////

function mergeCardRandom(length, mergeList) {

    addCards(randomWordsList(random(length), mergeList))
}

////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
function addCards(array) {

    Array.from(spyCardsWrapper.children).forEach(value => {
        value.remove()
    })

    array.forEach(value => {
        spyCardsWrapper.insertAdjacentHTML('beforeend',
            `<div class="card" data-card-text="${value}">
               </div>`)
    })

    let cards = $.querySelectorAll(".card");
    cards.forEach(value => {
        value.addEventListener("click", showCard);
    })

}

////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
function showCard(event) {
    let remainingCard = event.target.parentNode.childElementCount;

    Swal.fire({
        text: event.target.dataset.cardText,
        color: "#fff",
        background: '#4F5D75',
        confirmButtonText: "باشه",
        confirmButtonColor: "#DD6B55",
        allowOutsideClick: false
    }).then(result => {
        
        if (remainingCard === 1 && result.isConfirmed) {
            spyCards.classList.remove("active")
            spyTime.classList.add("active")
            timer(+selectTime.value)
        }
    })



    event.target.remove();
}

////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
function timer(time) {
    let minutes = time;
    let seconds = 0;

    let timerInterval = setInterval(() => {
        seconds -= 1


        if (timerFlag) {
            clearInterval(timerInterval);
        }
        if (minutes === 0 && seconds === 0) {
            clearInterval(timerInterval);
            spyWinner()
        }




        if (minutes > 9) {
            if (seconds === -1) {
                seconds = 59;
                minutes -= 1
                minutes === 9 ? remainingTime.innerText = `0${minutes} : ${seconds}` : remainingTime.innerText = `${minutes} : ${seconds}`
            } else {
                seconds > 9 ? remainingTime.innerText = `${minutes} : ${seconds}` : remainingTime.innerText = `${minutes} : 0${seconds}`
            }
        } else {
            if (seconds === -1) {
                seconds = 59;
                minutes -= 1
                remainingTime.innerText = `0${minutes} : ${seconds}`
            } else {
                seconds > 9 ? remainingTime.innerText = `0${minutes} : ${seconds}` : remainingTime.innerText = `0${minutes} : 0${seconds}`
            }
        }
    }, 1000)
}


////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////


function f(result) {
    timerFlag = false;
    if (result.isConfirmed) {
        mergeCard(+selectGamer.value, +selectSpy.value)

        spyCards.classList.add("active")
    } else if (result.isDenied) {
        spyStart.classList.add("active")

    }


}


////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
function spyWinner() {
    Swal.fire({
        title: "جاسوس برد",
        showDenyButton: true,
        confirmButtonText: `ادامه باهمین نفرات`,
        denyButtonText: 'بازی جدید',
        background: '#4F5D75',
        confirmButtonColor: "#DD6B55",
        denyButtonColor: "#757575",
        allowOutsideClick: false

    }).then((result) => {
        spyTime.classList.remove("active")

        f(result)

    })
}
////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
function endFunctions() {
    timerFlag = true;
    Swal.fire({
        title: "برد",
        showDenyButton: true,
        confirmButtonText: `ادامه باهمین نفرات`,
        denyButtonText: 'بازی جدید',
        background: '#4F5D75',
        confirmButtonColor: "#DD6B55",
        denyButtonColor: "#757575",
        allowOutsideClick: false
    }).then((result) => {
        spyTime.classList.remove("active")

        f(result)

    })


}













////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
let $ = document;
let startBtn = $.querySelectorAll(".spy__start>button");
let spyStart = $.querySelector(".spy__start");
let selectGamer = $.querySelector(".gamer");
let selectSpy = $.querySelector(".spyMen");
let selectTime = $.querySelector(".select-time");
let startBtnGame = $.querySelector(".start-game");
let spyCardsWrapper = $.querySelector(".spy__cards-wrapper");
let cards = $.querySelectorAll(".card");
let spyCards = $.querySelector(".spy__cards");
let spyTime = $.querySelector(".spy__time");
let remainingTime = $.querySelector(".time");
let endBtn = $.querySelector(".end");
let backBtn = $.querySelectorAll(".spy-center>img");

let timerFlag = false;

startBtn.forEach(value => {
    value.addEventListener("click", chooseWords);
})
selectGamer.addEventListener("change", gamerCheck);
selectSpy.addEventListener("change", gamerCheck);
startBtnGame.addEventListener("click", getInformationGame);
endBtn.addEventListener("click", endFunctions);

backBtn.forEach(value => {
    value.addEventListener("click", previousSiblingAction)
})

// Swal.fire({
//     icon: 'error',
//     title: 'خطا',
//     text: 'اصلاح کنید',
//     background: '#4F5D75',
//     confirmButtonText: "باشه",
//     confirmButtonColor: "#DD6B55"
// })



