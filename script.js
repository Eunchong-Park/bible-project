// Get Quote From API
const quoteContainer = document.getElementById("quote-container");
const searchBtn = document.getElementById("new-quote");
const verse = document.getElementById("verse");
const chapter = document.getElementById("chapter");
const book = document.getElementById("book");
const word = document.getElementById("word");


const loader = document.getElementById("loader");
// Show loading
function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
function removeLoadingSpinner() {
    if (!loader.hidden) {
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
  
}

// asynk 이기에, fetch가 다 될때서야 response 가 값을 가진다
// data 는 response 에서 json형태의 값을 가질때에야 받아진다

// Book & Chapter
// async function getQuote(type = "chapter",book = "Genesis", chapt = "1", verse = 1) {
async function getQuote(type = "oneVerse",book = "Genesis", chapt = "1", verse = 1) {

    try {
        showLoadingSpinner();
        const oneVerse = `https://ajith-holy-bible.p.rapidapi.com/GetVerseOfaChapter?Verse=${verse}&Book=${book}&chapter=${chapt}`;
        const chapter = `https://ajith-holy-bible.p.rapidapi.com/GetChapter?Book=${book}&chapter=${chapt}`;

        const response = await fetch(type === "chapter" ? chapter : oneVerse, {
        "method": "GET",
	    "headers": {
		"x-rapidapi-host": "ajith-holy-bible.p.rapidapi.com",
		"x-rapidapi-key": "109b891172msh64250ca251763f1p1c42bdjsna39dd429bf28"
	}
        });
        const data = await response.json();
        console.log(response, data);
        word.innerHTML = data.Output;
        removeLoadingSpinner();
        return data.Output;
    } catch (error) {
        // getQuote();
        console.log("Whoops, no quote", error);
    }
}
// DropDown for Chapter
var selectBtn = document.getElementsByClassName('dropdown'),
    dropdownMenu = document.getElementsByClassName('dropdownMenu');

for (i = 0; i < selectBtn.length; i++) {
    selectBtn[i].onclick = function() {
        if(this.className.indexOf('active') > -1){
            for (j = 0; j < selectBtn.length; j++) {
                removeClass(selectBtn[j], 'active')
            }
        } else {
            addClass(this, 'active');            
        }               
    };
}
for (i = 0; i < dropdownMenu.length; i++) {
    var child = dropdownMenu[i].children;    
    for (j = 0; j < child.length; j++) {
        child[j].onclick = function() {
            var text = this.innerHTML;
            this.parentNode.previousElementSibling.children[0].innerHTML = text;
            toggleClass(this.parentNode, 'showMenu');
        };
    }
}

window.addEventListener('click', function(event){
    for (i = 0; i < selectBtn.length; i++) {
        if (event.target != selectBtn[i].children[0]){
            removeClass(selectBtn[i], 'active');
        }
    }
});




function toggleClass(el, classToToggle) {
    var classN = el.className;
    if(classN.indexOf(classToToggle) > -1){
        el.className =  classN.replace(" " + classToToggle, '');
	} else {		
        el.className = classN + " " + classToToggle;
	}
}
function addClass(el, classToToggle) {
    var classN = el.className
    if(classN.indexOf(classToToggle) < 1){
        el.className = classN + " " + classToToggle;
    }
}
function removeClass(el, classToToggle) {
    var classN = el.className;
    if(classN.indexOf(classToToggle) > -1){
        el.className =  classN.replace(" " + classToToggle, '');
	}
}


// On Load
searchBtn.addEventListener("click", function(a,b,c,d) {
    getQuote("oneVerse", book.value, chapter.value, verse.value)
});
getQuote()








// "The_Old_Testament":"1. Genesis 2. Exodus 3. Leviticus 4. Numbers 5. Deuteronomy 6. Joshua 7. Judges 8. Ruth 9. 1 Samuel 10. 2 Samuel 11. 1 Kings 12. 2 Kings 13. 1 Chronicles 14. 2 Chronicles 15. Ezra 16. Nehemiah 17. Esther 18. Job 19. Psalms 20. Proverbs 21. Ecclesiastes 22. Song of Solomon 23. Isaiah 24. Jeremiah 25. Lamentations 26. Ezekiel 27. Daniel 28. Hosea 29. Joel 30. Amos 31. Obadiah 32. Jonah 33. Micah 34. Nahum 35. Habakkuk 36. Zephaniah 37. Haggai 38. Zechariah 39. Malachi"
// "The_New_Testament":"1. Matthew 2. Mark 3. Luke 4. John 5. Acts (of the Apostles) 6. Romans 7. 1 Corinthians 8. 2 Corinthians 9. Galatians 10. Ephesians 11. Philippians 12. Colossians 13. 1 Thessalonians 14. 2 Thessalonians 15. 1 Timothy 16. 2 Timothy 17. Titus 18. Philemon 19. Hebrews 20. James 21. 1 Peter 22. 2 Peter 23. 1 John 24. 2 John 25. 3 John 26. Jude 27. Revelation"