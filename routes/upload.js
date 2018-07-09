const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const router = express.Router();

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false })
router.use(cors())

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Upload' });
});

router.post('/', urlencodedParser, (req, res, next) => {
    try {
        let testdata = Object.keys(req.body)[0]
        let wordsArray = splitByWords(testdata);
        let wordsMap = createWordMap(wordsArray);
        let wordCount = getWordCount(wordsArray);
        let sortedArray = sortByCount(wordsMap);
        let finalWordsArray = finalArray(wordsMap, wordCount);

        res.send(finalWordsArray);
    } catch (er) {
        res.statusCode = 400;
        return res.end(`error: ${er.message}`);
    }
});


function splitByWords(text) {
    // split string by spaces (including spaces, tabs, and newlines)
    let regex = /[\.\,\?!\s+]/gi;
    let wordsArray = text.trim().replace(regex, ' ').split(' ')

    return wordsArray;
}

function getWordCount(wordsArray) {
    let count = 0;

    wordsArray.forEach(function (key) {
        if (key != '') {
            count++;
        }
    })

    return count;
}

function createWordMap(wordsArray) {

    // create map for word counts
    let wordsMap = {};
    /*
      wordsMap = {
        'Oh': 2,
        'Feelin': 1,
        ...
      }
    */
    wordsArray.forEach(function (key) {
        let word = key.toLowerCase();
        if (wordsMap.hasOwnProperty(word)) {
            wordsMap[word]++;
        } else if (key != '') {
            wordsMap[word] = 1;
        }
    });

    return wordsMap;

}


function sortByCount(wordsMap) {

    // sort by count in descending order
    let finalWordsArray = [];
    finalWordsArray = Object.keys(wordsMap).map(function (key) {
        return {
            name: key,
            total: wordsMap[key]
        };
    });

    finalWordsArray.sort(function (a, b) {
        return b.total - a.total;
    });

    return finalWordsArray;

}

function finalArray(wordsMap, wordCount) {
    let finalWordsArray = {}

    finalWordsArray = {
        counts: wordsMap,
        total: wordCount
    }

    return finalWordsArray;
}

module.exports = router;
