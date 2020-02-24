const client = require('./PGindex.js');


var dbHelpers = {
  get: (id) => {
    return client.query(`SELECT * FROM questions, answers WHERE questions.productid = '${id}' AND questions.qnumber = answers.qnumber;`)
  },
  postQ: (id, newQuestion) => {
    return client.query(`INSERT INTO questions()`)
  
  },
  postAns: (id, num, newAns) => {
    console.log(id)
    console.log(num)
    console.log(newAns)
    
  },
  postItem: (productID, QApairs) => {
    
  },
  deleteItem: (productID) => {
    
  },
  sort: (id, category) => {
    if (category === 'newestQ') {
      return QApair.aggregate([{
        $match: {productID:id}},
        {$unwind:"$QApairs"},
        {$sort:{"QApairs.qDate":-1}},
        {$group:{_id:"$_id", productID:{"$first":"$productID"}, QApairs:{$push:"$QApairs"}}}
      ])
    }
    if (category === 'newestAns') {
      return QApair.find({ productID:id })
        .then((data) => {
          return sortByNewestAns(data);
        });
    }
    if (category === 'mostAns') {
      return QApair.aggregate([{
        $match: {productID:id}},
        {$unwind:"$QApairs"},
        {$sort:{"QApairs.ansCount":-1}},
        {$group:{_id:"$_id", productID:{"$first":"$productID"}, QApairs:{$push:"$QApairs"}}}
      ]);
    }
    if (category === 'ansNeeded') {
      return QApair.aggregate([{
        $match: {productID:id}},
        {$unwind:"$QApairs"},
        {$sort:{"QApairs.ansCount":1}},
        {$group:{_id:"$_id", productID:{"$first":"$productID"}, QApairs:{$push:"$QApairs"}}}
      ]);
    }
    if (category === 'mostHelpful') {
      return QApair.find({ productID:id })
        .then((data) => {
          return sortByHelpful(data);
        })
    }
  }
}

var sortByHelpful = (data) => {
  for (var i = 0; i < data[0].QApairs.length; i++) {
    data[0].QApairs[i].answers.sort(function(a,b) {
      return b.yes - a.yes;
    });
  }
  data[0].QApairs.sort(function(a,b) {
    return b.answers[0].yes - a.answers[0].yes;
  });
  return data;
}

var sortByNewestAns = (data) => {
  for (var i = 0; i < data[0].QApairs.length; i++) {
    data[0].QApairs[i].answers.sort(function(a,b) {
      return new Date(b.aDate) - new Date(a.aDate);
    });
  }
  data[0].QApairs.sort(function(a,b) {
    return new Date(b.answers[0].aDate) - new Date(a.answers[0].aDate);
  });
  return data;
}

module.exports = dbHelpers;