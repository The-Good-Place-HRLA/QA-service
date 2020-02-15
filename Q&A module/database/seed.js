const mongoose = require('mongoose');
const QApair = require('./'); // ./ defaults to index
// var example = require('./example.json');
var questions = require('./questions.js'); // real data from web
var answers = require('./answers.js'); // real data from web
const faker = require('faker');
const fs = require('fs');
const stream = fs.createWriteStream(__dirname + '/data.json');

const writeData = (writerStream, data) => {
  return new Promise((resolve) => {
    if (!writerStream.write(data)) {
      writerStream.once('drain', resolve)
    } else {
      resolve();
    }
  });
}

const dataGen = async () => {

  var startTime = Date.now();

  stream.write('[')

  var max = 10000;
  let i = 1;
  while (i <= max) {
  // for (var i = 1; i < 2000001; i++) {
    // set product ID for each and QA pairs

    let product = {
      productID: i,
      QApairs: []
    };
    // randomize the quantity of QA pairs for each product
    let QApairsQty = faker.random.number({ min: 1, max: 1 });
    // randomly generate qa pairs until the desired quantity is reached
    for (var j = 0; j < QApairsQty; j++) {
      // random questions are generated below
      var qa = {
        number: j,
        qNickname: faker.name.firstName(),
        question: faker.hacker.phrase() + ' ' + faker.lorem.sentences(faker.random.number({ min: 2, max: 6 })),
        qDate: faker.date.between('2017-01-01', '2020-02-02'),
        qEmail: faker.internet.email(),
        qLocation: faker.address.city() + ", " + faker.address.state(),
        newQ: false,
        ansCount: 1,
        answers: []
      };
      // for each randomly generated question, the number of answers should be a random number from 1 to 5
      let ansQty = faker.random.number({ min: 1, max: 1 });
      qa.ansCount = ansQty;
      // and each question should be paired with the desired number of answers
      for (var k = 0; k < ansQty; k++) {
        qa.answers.push({
          aNickname: faker.name.firstName(),
          answer: faker.hacker.phrase() + ' ' + faker.lorem.sentences(faker.random.number({ min: 2, max: 6 })),
          aDate: faker.date.between('2017-01-01', '2020-02-02'),
          aEmail: faker.internet.email(),
          aLocation: faker.address.city() + ", " + faker.address.state(),
          yes: faker.random.number({ min: 0, max: 20 }),
          no: faker.random.number({ min: 0, max: 10 }),
          inappropriate: faker.random.arrayElement(["yes", "no"]),
          newAns: false
        });
      }
      // sort the answers by having the most recent answer at the beginning of array
      // qa.answers.sort(function(a,b) {
      //   return new Date(b.aDate) - new Date(a.aDate);
      // })
      // sort the answers by most helpful answer at the beginning of array
      // qa.answers.sort(function(a,b) {
      //   return b.yes - a.yes;
      // })
      product.QApairs.push(qa);
    }

    product = JSON.stringify(product);

    await writeData(stream, product);

    if (i === 10000) {
      var endTime = Date.now();
      console.log((endTime - startTime)/1000);
      stream.write(']')
      .end();
    } else {
      stream.write(',')
      i++;
    }

    // if (i === 2000000) {
    //   stream.write(product + ']');

    //   stream.on('drain', () => {
    //     console.log('continue writing');
    //   })
    //   .end(() => {
    //     var endTime = Date.now();
    //     console.log((endTime - startTime)/1000);
    //   });
    // } else {
    //   stream.write(product + ',');

    //   stream.on('drain', () => {
    //     console.log('continue writing');
    //   });
    // }
  }


    // records.push(product);
    // QApair.create(product)
    //   .then(() => {
    //     console.log('database seeded');
    //   })
    //   .catch(err => console.error(err));


  // const jsonString = JSON.stringify(records);
  // stream.write(jsonString);


  // fs.writeFile('./database/data.json', jsonString, err => {
  //   if (err) {
  //     console.log('error writing file', err);
  //   } else {
  //     console.log('Successfully wrote file');
  //   }
  // })
  // module.exports = records;

  // var endTime = Date.now();
  // console.log('done');
  // console.log((endTime - startTime)/1000);
}

dataGen();










// ====================================== OLD CODE BELOW ======================================

// let firstProduct = {
//   productID: 0,
//   QApairs: [
//     {
//       number: 0,
//       qNickname: faker.name.firstName(),
//       question: "This is so cute, I want to buy this for my cat, what is the color of it?",
//       qDate: faker.date.between('2019-01-01', '2020-02-02'),
//       qEmail: faker.internet.email(),
//       qLocation: faker.address.city() + ", " + faker.address.state(),
//       newQ: false,
//       ansCount: 1,
//       answers: [
//         {
//           aNickname: faker.name.firstName(),
//           answer: "I think it's easy to tell by looking at the pictures",
//           aDate: faker.date.between('2017-01-01', '2018-02-02'),
//           aEmail: faker.internet.email(),
//           aLocation: faker.address.city() + ", " + faker.address.state(),
//           yes: 20,
//           no: 0,
//           inappropriate: faker.random.arrayElement(["yes","no"]),
//           newAns: false
//         }
//       ]
//     },
//     {
//       number: 1,
//       qNickname: 'smarty',
//       question: "I can't find any other human goggles as good looking as this one, will this fit on my face?",
//       qDate: faker.date.between('2020-01-30', '2020-02-02'),
//       qEmail: faker.internet.email(),
//       qLocation: faker.address.city() + ", " + faker.address.state(),
//       newQ: false,
//       ansCount: 2,
//       answers: [
//         {
//           aNickname: faker.name.firstName(),
//           answer: "LOL no, but you're welcome to try.",
//           aDate: faker.date.between('2020-01-01', '2020-01-29'),
//           aEmail: faker.internet.email(),
//           aLocation: faker.address.city() + ", " + faker.address.state(),
//           yes: 80,
//           no: 0,
//           inappropriate: faker.random.arrayElement(["yes","no"]),
//           newAns: false
//         },
//         {
//           aNickname: faker.name.firstName(),
//           answer: "Yes, take a picture when you do and post it here, I'd like to see!",
//           aDate: faker.date.between('2019-11-01', '2019-12-30'),
//           aEmail: faker.internet.email(),
//           aLocation: faker.address.city() + ", " + faker.address.state(),
//           yes: 10,
//           no: 0,
//           inappropriate: faker.random.arrayElement(["yes","no"]),
//           newAns: false
//         }
//       ]
//     },
//     {
//       number: 2,
//       qNickname: faker.name.firstName(),
//       question: "Is the dog for sale?",
//       qDate: faker.date.between('2017-01-01', '2017-02-02'),
//       qEmail: faker.internet.email(),
//       qLocation: faker.address.city() + ", " + faker.address.state(),
//       newQ: false,
//       ansCount: 3,
//       answers: [
//         {
//           aNickname: faker.name.firstName(),
//           answer: "You're a terrible person.",
//           aDate: faker.date.between('2018-01-01', '2019-02-02'),
//           aEmail: faker.internet.email(),
//           aLocation: faker.address.city() + ", " + faker.address.state(),
//           yes: 90,
//           no: 0,
//           inappropriate: faker.random.arrayElement(["yes","no"]),
//           newAns: false
//         },
//         {
//           aNickname: faker.name.firstName(),
//           answer: "Can't believe you asked that.",
//           aDate: faker.date.between('2017-03-01', '2017-12-02'),
//           aEmail: faker.internet.email(),
//           aLocation: faker.address.city() + ", " + faker.address.state(),
//           yes: 90,
//           no: 0,
//           inappropriate: faker.random.arrayElement(["yes","no"]),
//           newAns: false
//         },
//         {
//           aNickname: faker.name.firstName(),
//           answer: "How much are you willing to pay?",
//           aDate: faker.date.between('2020-01-01', '2020-02-02'),
//           aEmail: faker.internet.email(),
//           aLocation: faker.address.city() + ", " + faker.address.state(),
//           yes: 7,
//           no: 50,
//           inappropriate: faker.random.arrayElement(["yes","no"]),
//           newAns: false
//         }
//       ]
//     },
//     {
//       number: 3,
//       qNickname: faker.name.firstName(),
//       question: "I want to get this for my girlfriend on Valentine's day, does this come with pink?",
//       qDate: faker.date.between('2017-01-01', '2018-02-02'),
//       qEmail: faker.internet.email(),
//       qLocation: faker.address.city() + ", " + faker.address.state(),
//       newQ: false,
//       ansCount: 2,
//       answers: [
//         {
//           aNickname: faker.name.firstName(),
//           answer: "She will break up with you on that day, that's all I know.",
//           aDate: faker.date.between('2020-01-01', '2020-02-02'),
//           aLocation: faker.address.city() + ", " + faker.address.state(),
//           yes: 30,
//           no: 3,
//           inappropriate: faker.random.arrayElement(["yes","no"]),
//           newAns: false
//         },
//         {
//           aNickname: faker.name.firstName(),
//           answer: "You're a terrible boyfriend.",
//           aDate: faker.date.between('2018-03-01', '2019-02-02'),
//           aEmail: faker.internet.email(),
//           aLocation: faker.address.city() + ", " + faker.address.state(),
//           yes: 10,
//           no: 0,
//           inappropriate: faker.random.arrayElement(["yes","no"]),
//           newAns: false
//         }
//       ]
//     },
//     {
//       number: 4,
//       qNickname: faker.name.firstName(),
//       question: "Is this bullet proof?",
//       qDate: faker.date.between('2017-01-01', '2018-02-02'),
//       qEmail: faker.internet.email(),
//       qLocation: faker.address.city() + ", " + faker.address.state(),
//       newQ: false,
//       ansCount: 1,
//       answers: [
//         {
//           aNickname: faker.name.firstName(),
//           answer: "I'm not sure, but you should to test it.",
//           aDate: faker.date.between('2018-03-01', '2020-02-02'),
//           aEmail: faker.internet.email(),
//           aLocation: faker.address.city() + ", " + faker.address.state(),
//           yes: 50,
//           no: 4,
//           inappropriate: faker.random.arrayElement(["yes","no"]),
//           newAns: false
//         }
//       ]
//     },
//     {
//       number: 5,
//       qNickname: faker.name.firstName(),
//       question: "Is the price negotiable?",
//       qDate: faker.date.between('2016-01-01', '2016-12-02'),
//       qEmail: faker.internet.email(),
//       qLocation: faker.address.city() + ", " + faker.address.state(),
//       newQ: false,
//       ansCount: 2,
//       answers: [
//         {
//           aNickname: faker.name.firstName(),
//           answer: "I think you're on the wrong website.",
//           aDate: faker.date.between('2020-01-01', '2020-02-02'),
//           aEmail: faker.internet.email(),
//           aLocation: faker.address.city() + ", " + faker.address.state(),
//           yes: 20,
//           no: 1,
//           inappropriate: faker.random.arrayElement(["yes","no"]),
//           newAns: false
//         },
//         {
//           aNickname: faker.name.firstName(),
//           answer: "asfjdkl;ajskgjalks;hjgksdhakghklewajtklgjewl;g",
//           aDate: faker.date.between('2017-01-01', '2020-02-02'),
//           aEmail: faker.internet.email(),
//           aLocation: faker.address.city() + ", " + faker.address.state(),
//           yes: 0,
//           no: 90,
//           inappropriate: faker.random.arrayElement(["yes","no"]),
//           newAns: false
//         }
//       ]
//     }
//   ]
// }

// QApair.create(firstProduct)
//     .then(() => {
//       console.log('database seeded');
//       mongoose.connection.close();
//     })
//     .catch(err => console.error(err));


