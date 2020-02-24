const dbHelpers = require('../database/PGdbHelpers.js');

var controllers = {
  get: (req, res) => {
    dbHelpers.get(req.params.productID)
      .then((data) => {
        var response = {
          productID: data.rows[0].productid,
          QApairs: []
        };
        var qIndex = 0;
        var currentRow = 0;
        while (currentRow < data.rows.length) {
          var question = {
            number: qIndex,
            qNickname: data.rows[currentRow].qnickname,
            question: data.rows[currentRow].question,
            qDate: data.rows[currentRow].qdate,
            qEmail: data.rows[currentRow].qemail,
            qLocation: data.rows[currentRow].qlocation,
            newQ: data.rows[currentRow].newq,
            ansCount: data.rows[currentRow].anscount,
            answers: []
          }

          for (var i = 0; i < question.ansCount; i++) {
            var answer = {
              aNickname: data.rows[currentRow].anickname,
              answer: data.rows[currentRow].answer,
              aDate: data.rows[currentRow].adate,
              aEmail: data.rows[currentRow].aemail,
              aLocation: data.rows[currentRow].alocation,
              yes: data.rows[currentRow].ayes,
              no: data.rows[currentRow].ano,
              inappropriate: data.rows[currentRow].inappropriate,
              newAns: data.rows[currentRow].newans
            }
            question.answers.push(answer);
            currentRow++;
          }
          qIndex++;
          response.QApairs.push(question);
        }
        console.log(response);
        res.status(200).send(response);
      })
      .catch((err) => {
        res.status(400).send(err);
      })
  },
  postQ: (req, res) => {
    const { productID } = req.params;
    const newQuestion = req.body;

    dbHelpers.postQ(productID)
      .then((data) => {
        var questions = JSON.parse(data[0].QApairs);
        questions.push(newQuestion);
        questions = JSON.stringify(questions);

        QApair.findOneAndUpdate({ productID: id }, { QApairs: questions })
          .then(() => {
            res.status(201).send('posted question');
          })
          .catch((err) => {
            res.status(401).send(err);
          });
      })
      .catch((err) => {
        res.status(402).send(err);
      });

    // dbHelpers.postQ(req.params.productID, req.body.newQuestion)
    //   .then(() => {
    //     res.status(201).send('posted question');
    //   })
    //   .catch((err) => {
    //     res.status(401).send(err);
    //   });
  },
  postAns: (req, res) => {
    dbHelpers.postAns(req.params.productID, req.body.num, req.body.newAns)
      .then(() => {
        res.status(201).send('posted answer');
      })
      .catch((err) => {
        res.status(401).send(err);
      });
  },
  sort: (req, res) => {
    dbHelpers.sort(req.body.productID, req.body.sort)
      .then((data) => {
        res.status(202).send(data);
      })
      .catch((err) => {
        res.status(402).send(err);
      });
  },
  postItem: (req, res) => {
    const { productID, QApairs } = req.body;
    dbHelpers.postItem(productID, QApairs)
      .then(() => {
        res.status(201).send('posted item');
      })
      .catch((err) => {
        res.status(401).send(err);
      });
  },
  deleteItem: (req, res) => {
    const { productID } = req.params;
    dbHelpers.deleteItem(productID)
      .then(() => {
        res.status(200).send('deleted item');
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  }
};

module.exports = controllers;