const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// DB CONNECTION
// GET
router.get('/', (req, res) => {
    console.log('in GET /tasks');
    const sqlText = `
    SELECT * 
    FROM "tasks" 
    ORDER BY "id" ASC;
    `;
    pool.query(sqlText)
    
    .then((response) => {
        console.log('response is:',response);
        res.send(response.rows);
    }).catch((error) => {
        console.log('Error in GET /tasks', error);
        res.sendStatus(500);
    });
});

//to post new tasks 
router.post('/', (req, res) => {
  console.log('req.body', req.body);


  let sqlText = `INSERT INTO "tasks"
  ("task", "isComplete")
  VALUES ($1,$2)`
  ;

  let sqlParams = [ 
      req.body.task,
      req.body.isComplete 
  ];

  pool.query(sqlText, sqlParams) 
      .then((dbRes) => {
        // console.log(dbRes)
          res.sendStatus(201);
      })
      .catch((err) => {
          console.log('POST error', err);
          res.sendStatus(500);
      })
});

//to delete task
router.delete('/:id', (req, res) =>{
  const taskId = req.params.id;
  const sqlText = `DELETE FROM "tasks" 
              WHERE "id" = $1`;

  const sqlParams = [taskId];

  pool.query(sqlText, sqlParams)
      .then((dbRes) => {
          res.sendStatus(200);
      }).catch((error) => {
          console.log('delete error', error);
          res.sendStatus(500);
      });
});

//put request to change completion status
router.put('/:id', (req, res) => {
  console.log('task status');

  // toggles complete status
  const sqlText = `
      UPDATE "tasks" 
      SET "isComplete" = NOT "isComplete" 
      WHERE "id" = $1
  `;

  const sqlParam = [req.params.id];

  pool.query(sqlText, sqlParam) 
      .then((dbRes) => {
          res.sendStatus(200);
      })
      .catch((error) => {
          console.log('error in complete task', error);
          res.sendStatus(500);
      })
});



module.exports = router;