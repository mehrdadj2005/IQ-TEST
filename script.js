// IQ test
// Contributors: ferhad Ahmadi/ Mehrdad Jokarari/ Ayeh Mozafari/ Alireza Ahmadi
// date: 1402/5/1
let body = document.querySelector('body')

// create div for validation
let container = document.createElement('div')
// add class for style validation
container.classList = 'container'
// وقتی صفحه لود میشه فرم ما ظاهر میشه
body.addEventListener('load', loadForm())

function loadForm() {
    let formLogin = `
    <div id="form" >
        <h4>NAME</h4>
        <input id="name" type="text">
        <br>
        <h4>AGE</h4>
        <input id="age" type="number">
        <br>
        <br>
        <br>
        <button id="btnForm">OK</button>
    </div>
            `
            // for page mood
            body.insertAdjacentHTML('afterbegin', formLogin)
            addButtonDL()
}

// add btn
// اظافه کردن دکمه مود به صفحه
function addButtonDL() {
    let button = document.createElement('button')
    button.classList.add('buttonMood')
    button.innerText = 'MOOD'
    body.appendChild(button)
    // action function when click
    // وقتی کلیک شد روی دکمه تابع را اجرا میکند
    button.addEventListener('click', lightPage)
}

function lightPage() {
    // با کلاس هاشون بهشوا شرط دادیم
    if (body.classList.contains('body')) {
        body.classList.remove('body')
        body.classList.add('bodyMood')
    }else{
        body.classList.remove('bodyMood')
        body.classList.add('body')
    }   
}

// select form and Btn in form
let form = document.querySelector('#form')
let btnForm = document.querySelector('#btnForm')

// action this function when ckick to Btn
btnForm.addEventListener('click', () => {
    // getting value of name and age in form
    let Name = document.querySelector('#name').value
    let Age = document.querySelector('#age').value
    // if user wrote something in inpute
    // اگر کاربر در اینپوت چیزی نوشته بود
    if (Name && Age) {
        // change style of form
        // استایل فرم را تغییر بده
        form.style = `display:none;`
        // add div of questions (container)
        body.appendChild(container)
        container.style = `visibility: visible;`
        // این فانکشن مربوط به ظاهر کردن سوالات است و فقط وقتی دکمه فرم کلیک بشه کار میکنه
        addNewQuestionAndAnswer()
        // add user name to local storage for saving the name
        localStorage.setItem('Name', Name)
    }
})

// template foe add image to container
// یک تمپلیت برای اضافه کردن عکس ها به صفحه
// this template is for questions 1 to 12
// این تمپلیت برای سوالات 1 تا 12 است
function template(indexIMG) {
    return `
    <div id="top">
        <img class="image-test" src="Images/${indexIMG}/test${indexIMG}.png" alt="">
    </div>
    <div id="buttom">
        <img class="image image1" src="Images/${indexIMG}/${indexIMG}-1.png" alt="">
        <img class="image image2" src="Images/${indexIMG}/${indexIMG}-2.png" alt="">
        <img class="image image3" src="Images/${indexIMG}/${indexIMG}-3.png" alt="">
        <img class="image image4" src="Images/${indexIMG}/${indexIMG}-4.png" alt="">
        <img class="image image5" src="Images/${indexIMG}/${indexIMG}-5.png" alt="">
        <img class="image image6" src="Images/${indexIMG}/${indexIMG}-6.png" alt="">
    </div>
    `
}
// template foe add image to container
// یک تمپلیت برای اضافه کردن عکس ها به صفحه
// this template is for questions 13 to 30
// این تمپلیت برای سوالات 13 تا 30 است
function template2(indexIMG) {
    return `
    <div id="top">
        <img class="image-test" src="Images/${indexIMG}/test${indexIMG}.png" alt="">
    </div>
    <div id="buttom">
        <img class="image image1" src="Images/${indexIMG}/${indexIMG}-1.png" alt="">
        <img class="image image2" src="Images/${indexIMG}/${indexIMG}-2.png" alt="">
        <img class="image image3" src="Images/${indexIMG}/${indexIMG}-3.png" alt="">
        <img class="image image4" src="Images/${indexIMG}/${indexIMG}-4.png" alt="">
        <img class="image image5" src="Images/${indexIMG}/${indexIMG}-5.png" alt="">
        <img class="image image6" src="Images/${indexIMG}/${indexIMG}-6.png" alt="">
        <img class="image image7" src="Images/${indexIMG}/${indexIMG}-7.png" alt="">
        <img class="image image8" src="Images/${indexIMG}/${indexIMG}-8.png" alt="">
    </div>
    `
}

let indexIMG = 0 // هربار که به این متغییر اظافه میشه عکس بعدی را در همان فایل نمایش میده
function addNewQuestionAndAnswer() {
    // اگر دیو سوالات خالی نبود خالی میشه
    if (container != -1) {
        container.innerHTML = ''
    }
    indexIMG += 1
    // تا 12 سوال اول تمپلیت اول به نمایش گذاشته میشه
    // first template for question 1 to 12
    if (indexIMG <= 12) {
        container.insertAdjacentHTML('afterbegin', template(indexIMG))
    }
    // تا 12 سوال اول تمپلیت اول به نمایش گذاشته میشه
    // first template for question 1 to 12 
    else if (indexIMG <= 30) {
        container.insertAdjacentHTML('afterbegin', template2(indexIMG))
    }
    //  برابر 31 میشه و باید پاسخ دیگه به نمایش گذاشته بشه indexIMG بار 30ام که کلیک شد 
    else if (indexIMG == 31) {
        container.insertAdjacentHTML('afterbegin', answer())

    }
}

// answer of IQ test
// جواب های سوالات
let answers = [3, 1, 5, 5, 2, 1, 2, 2, 2, 6, 4, 1, 4, 7, 2, 3, 1, 6, 5, 8, 4, 4, 7, 6, 4, 7, 7, 3, 2, 8]


container.addEventListener('click', userChose)
// find index of answers
let indexAnswer = -1
// امتیاز کاربر
// score for each correct answer
let score = 0
// این تابع برای انتخاب های کاربر
// function for user chose
function userChose(e) {
    // ifuser click on image
    // اگر کاربر روی عکس کلیک کرد
    if (e.target.classList.contains('image')) {
        // جواب سوال بعدی رو پیدا کن
        // find next answer
        indexAnswer++
        // و اگر روی جواب درست کلیک شد
        // if user click on correct image
        if (e.target.classList.contains('image' + answers[indexAnswer])) {
            // به امتیازش یکی اظافه بشه
            // score + 1-------
            score += 1
        }
        addNewQuestionAndAnswer()
    }
}
// function for last template and user score
//  تابع برای محاسبه ی امتیاز کاربر و ساختن تمپلیت اخری
function answer() {
    // get user name from local storage
    // گرفتن اسم کاربر از حافظه
    let nameInLs = localStorage.getItem('Name')
    // محاسبه امتیاز نسبت به %100
    score = (score * 3.325).toFixed()
    let aboutScore = ''
    if (score == 100) {
        aboutScore = 'Hello Einstein'
    }
    if (score <= 99) {
        aboutScore = 'Good Job'
    }
    if (score <= 75) {
        aboutScore = 'You Can Try It Again'
    }
    if (score <= 50) {
        aboutScore = 'Please Try More'
    }
    if (score <= 25) {
        aboutScore = 'Your IQ Is Less Than A Kid'
    }
    return `
        <div class="container-score">
           <p>${nameInLs} answered ${score}% of the questions correctly</p>
           <p>${aboutScore}</p>
        </div>
    `
}