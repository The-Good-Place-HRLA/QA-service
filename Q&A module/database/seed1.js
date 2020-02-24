const mongoose = require('mongoose');
const QApair = require('./'); // ./ defaults to index
const faker = require('faker');
const fs = require('fs');
const stream1 = fs.createWriteStream(__dirname + '/data1.tsv');

const writeData = async (writerStream, data) => {
  if (!writerStream.write(data)) {
    await new Promise(resolve => writerStream.once('drain', resolve));
  }
}

const dataGen = async (stream, start, end) => {

  var startTime = Date.now();

  stream.write('productID\tQApairs\n')

  var max = end;
  let i = start;

  while (i <= max) {

    var QApairs = [];
    // randomize the quantity of QA pairs for each product
    let QApairsQty = faker.random.number({ min: 1, max: 1 });
    // randomly generate qa pairs until the desired quantity is reached
    for (var j = 0; j < QApairsQty; j++) {
      // random questions are generated below
      var qa = {
        number: j,
        qNickname: faker.name.firstName(),
        question: faker.hacker.phrase() + ' ' + faker.lorem.sentences(faker.random.number({ min: 1, max: 1 })),
        qDate: faker.date.between('2017-01-01', '2020-02-02'),
        qEmail: faker.internet.email(),
        qLocation: faker.address.city() + ", " + faker.address.state(),
        newQ: false,
        ansCount: 1,
        answers: []
      };
      // for each randomly generated question, the number of answers should be a random number from 1 to 5
      let ansQty = faker.random.number({ min: 1, max: 3 });
      qa.ansCount = ansQty;
      // and each question should be paired with the desired number of answers
      for (var k = 0; k < ansQty; k++) {
        qa.answers.push({
          aNickname: faker.name.firstName(),
          answer: faker.hacker.phrase() + ' ' + faker.lorem.sentences(faker.random.number({ min: 1, max: 1 })),
          aDate: faker.date.between('2017-01-01', '2020-02-02'),
          aEmail: faker.internet.email(),
          aLocation: faker.address.city() + ", " + faker.address.state(),
          yes: faker.random.number({ min: 0, max: 20 }),
          no: faker.random.number({ min: 0, max: 10 }),
          inappropriate: faker.random.arrayElement(["yes", "no"]),
          newAns: false
        });
      }

      QApairs.push(qa);
    }
    QApairs = JSON.stringify(QApairs);

    await writeData(stream, `${i}\t${QApairs}\n`);

    if (i === max) {
      stream.end();
      var endTime = Date.now();
      console.log((endTime - startTime) / 1000);
    }
    i++;
  }
  return;
}

dataGen(stream1, 1, 500);