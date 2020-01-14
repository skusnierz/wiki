#! /bin/bash
mongoimport --host "0.0.0.0" --db student_wiki --collection courses --file courses.json
mongoimport --host "0.0.0.0" --db student_wiki --collection users --file users.json