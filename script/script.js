let header = document.getElementsByClassName("header")[0];
let main = document.getElementsByClassName("main")[0];


header.classList.add("text-center", "p-5", "bg-dark", "text-white");
let title = document.createElement("h1");
title.innerText = "WORDGRAM";
title.classList.add("header", "text-center", "display-1");
header.appendChild(title);
let tagline = document.createElement("p");
tagline.innerText = "Type a word to search it's meaning, your knowledge is just a click away!";
tagline.classList.add("text-center", "lead");
header.appendChild(tagline);

let inputDiv = document.createElement("div");
inputDiv.classList.add("mb-3", "mt-5", "container", "border", "border-dark", "p-2", "d-flex", "justify-content-center", "rounded");
let input = document.createElement("input");
input.classList.add("col-10", "rounded", "fs-2", "px-3");
input.type = "text";
input.style.border = "none"
input.style.outline = "none"
input.placeholder = "Search a word...";
inputDiv.appendChild(input);
search = document.createElement("img");
search.classList.add("rounded-pill");
search.src = "./public/search.png"
inputDiv.appendChild(search);
main.appendChild(inputDiv);

let wordDetails = document.createElement("div");
wordDetails.classList.add("container")

search.addEventListener("click", () => {
    wordDetails.innerHTML = "";
    //api call
    url = `https://api.dictionaryapi.dev/api/v2/entries/en/${input.value}`

    //word get function
    async function getWord() {
        let response = await fetch(url);
        let data = await response.json();
        return data;
    }

    getWord().then((data) => {
        try {
            //word
            let word = document.createElement("h2");
            word.classList.add("display-3");
            word.innerText = `word : ${data[0].word}`;
            wordDetails.appendChild(word);

            //phonetics display
            let phoneticsDiv = document.createElement("p");
            let phoneticString = "";
            for (let phonetic of data[0].phonetics) {
                phoneticString += `${phonetic.text} `;
            }
            phoneticsDiv.innerText = `phonetics : ${phoneticString}`;
            wordDetails.appendChild(phoneticsDiv);

            //meanings of the word DIV
            let meaningsDiv = document.createElement("div");

            //meanings heading
            let meaningsHeading = document.createElement("h3");
            meaningsHeading.classList.add("display-4");
            meaningsHeading.innerText = "Meanings : ";
            meaningsDiv.appendChild(meaningsHeading);

            //meanings list of the word
            let meaningsList = document.createElement("ul");
            for (result in data) {
                let meanings = data[result].meanings; //all results inside data
                for (let meaning of meanings) {       //list of meanings inside each result of data
                    let listItem = document.createElement("li");
                    let partOfSpeech = document.createElement("h4");
                    partOfSpeech.innerText = `Part of Speech : ${meaning.partOfSpeech}`; //part of speech or each meaning inside result
                    listItem.appendChild(partOfSpeech);
                    let definitions = document.createElement("ol");
                    for (let definition of meaning.definitions) { // list of definitions inside each meaning
                        let listItem2 = document.createElement("li");
                        let definitionText = document.createElement("p");
                        definitionText.innerText = definition.definition;
                        listItem2.appendChild(definitionText);
                        if (definition.example !== "" && definition.example !== undefined && definition.example !== null) {
                            let example = document.createElement("p");
                            example.innerHTML = `<B>Example</B> : ${definition.example}`;
                            listItem2.appendChild(example);
                        }
                        definitions.appendChild(listItem2);
                    }
                    listItem.appendChild(definitions);
                    meaningsList.appendChild(listItem);
                }
            }
            meaningsDiv.appendChild(meaningsList);

            wordDetails.appendChild(meaningsDiv);
            main.appendChild(wordDetails);
            input.value = "";
        }
        catch (err) {
            let error = document.createElement("h2");
            error.innerText = "Word not found!";
            error.classList.add("display-3","text-center");
            error.style.color = "red";
            wordDetails.appendChild(error);
            main.appendChild(wordDetails);
        }
    })
})


