DROP DATABASE IF EXISTS qa_module;

CREATE DATABASE qa_module;

\c qa_module;

CREATE TABLE questions (
  qnumber INTEGER NOT NULL PRIMARY KEY,
  qnickname VARCHAR(50) NOT NULL,
  question VARCHAR(250) NOT NULL,
  qdate VARCHAR(80) NOT NULL,
  qemail VARCHAR(50) NOT NULL,
  qlocation VARCHAR(50) NOT NULL,
  newq VARCHAR(10) NOT NULL,
  anscount SMALLINT NOT NULL,
  productid INTEGER NOT NULL
);

CREATE TABLE answers (
  anumber INTEGER NOT NULL PRIMARY KEY,
  anickname VARCHAR(50) NOT NULL,
  answer VARCHAR(250) NOT NULL,
  adate VARCHAR(80) NOT NULL,
  aemail VARCHAR(50) NOT NULL,
  alocation VARCHAR(50) NOT NULL,
  ayes SMALLINT NOT NULL,
  ano SMALLINT NOT NULL,
  inappropriate VARCHAR(10) NOT NULL,
  newans VARCHAR(10) NOT NULL,
  qnumber INTEGER NOT NULL,
  FOREIGN KEY (qnumber) REFERENCES questions(qnumber)
);

