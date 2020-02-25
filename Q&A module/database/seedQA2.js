const faker = require('faker');
const fs = require('fs');
const stream1 = fs.createWriteStream(__dirname + '/dataquestions2.csv');
const stream2 = fs.createWriteStream(__dirname + '/dataanswers2.csv');


const writeData = async (writerStream, data) => {
  if (!writerStream.write(data)) {
    await new Promise(resolve => writerStream.once('drain', resolve));
  }
}

const dataGen = async (Qstream, Astream, start, end) => {

  var startTime = Date.now();

  Qstream.write('qnumber\tqnickname\tquestion\tqdate\tqemail\tqlocation\tnewq\tanscount\tproductid\n');
  Astream.write('anumber\tanickname\tanswer\tadate\taemail\talocation\tayes\tano\tinappropriate\tnewans\tqnumber\n');

  var max = end;
  let i = start;
  let j = 5000001;
  let n = null;

  while (i <= max) {
    // randomize the quantity of QA pairs for each product
    let QApairsQty = faker.random.number({ min: 1, max: 1 });
    // randomly generate qa pairs until the desired quantity is reached
    for (var k = 0; k < QApairsQty; k++) {
      // random questions are generated below
      let ansQty = faker.random.number({ min: 1, max: 3 });

      let qNumber = j;
      let qNickname = faker.name.firstName();
      let question = faker.hacker.phrase() + ' ' + faker.lorem.sentences(faker.random.number({ min: 1, max: 1 }));
      let qDate = faker.date.between('2017-01-01', '2020-02-02');
      let qEmail = faker.internet.email();
      let qLocation = faker.address.city() + ", " + faker.address.state();
      let newQ = 'false';
      let ansCount = ansQty;
      let productID = i;

      await writeData(Qstream, `${qNumber}\t${qNickname}\t${question}\t${qDate}\t${qEmail}\t${qLocation}\t${newQ}\t${ansCount}\t${productID}\n`);

      // and each question should be paired with the desired number of answers
      for (var m = 0; m < ansQty; m++) {
        let aNumber = n;
        let aNickname = faker.name.firstName();
        let answer = faker.hacker.phrase() + ' ' + faker.lorem.sentences(faker.random.number({ min: 1, max: 1 }));
        let aDate = faker.date.between('2017-01-01', '2020-02-02');
        let aEmail = faker.internet.email();
        let aLocation = faker.address.city() + ", " + faker.address.state();
        let aYes = faker.random.number({ min: 0, max: 20 });
        let aNo = faker.random.number({ min: 0, max: 10 });
        let inappropriate = faker.random.arrayElement(["yes", "no"]);
        let newAns = 'false';
        let qNumber = j;

        await writeData(Astream, `${aNumber}\t${aNickname}\t${answer}\t${aDate}\t${aEmail}\t${aLocation}\t${aYes}\t${aNo}\t${inappropriate}\t${newAns}\t${qNumber}\n`);

        n++;
      }

      j++;
    }

    if (i === max) {
      await Qstream.end();
      await Astream.end();
      var endTime = Date.now();
      console.log((endTime - startTime) / 1000);
    }
    i++;
  }
  return;
}

dataGen(stream1, stream2, 5000001, 10000000);