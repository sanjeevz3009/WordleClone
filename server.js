const PORT = 8002;
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/check", (req, res) => {
    const word = req.query.word;
    const options = {
        method: 'GET',
        url: 'https://twinword-word-graph-dictionary.p.rapidapi.com/theme/',
        params: {entry: word},
        headers: {
          'X-RapidAPI-Key': 'a943963621msh948f0a97a1ed2dap1158f8jsn26a2e9e2d035',
          'X-RapidAPI-Host': 'twinword-word-graph-dictionary.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
          console.log(response.data);
      }).catch(function (error) {
          console.error(error);
      });
})

app.get("/word", (req, res) => {
    const options = {
        method: "GET",
        url: "https://random-words5.p.rapidapi.com/getMultipleRandom",
        params: {count: '5', wordLength: '5'},
        headers: {
          "X-RapidAPI-Key": "a943963621msh948f0a97a1ed2dap1158f8jsn26a2e9e2d035",
          "X-RapidAPI-Host": "random-words5.p.rapidapi.com"
        }
      };
      
      axios.request(options).then(function (response) {
          console.log(response.data);
          res.json(response.data[0]);
      }).catch(function (error) {
          console.error(error);
      });
});

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));