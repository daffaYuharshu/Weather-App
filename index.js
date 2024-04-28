const express = require(`express`);
const axios = require(`axios`);
const app = express();
const port = 3000;
const URL = "https://api.openweathermap.org/data/2.5/weather?";

require('dotenv').config()

app.use(exp.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs')
app.engine('ejs', require('ejs').__express);
app.set('views', __dirname + '/views')

app.post("/search", async (req, res) => {
    const city = req.body.city;
    try {
        let result = await axios.get(URL, {
            params: {
                appId: process.env.apiKey,
                q: city,
                units: "metric"
            }
        });
        res.render("index.ejs", { data: result.data })
    } catch (error) {
        res.render("index.ejs", { err: error.response.data });
    }
})

app.get("/", (req, res) => {
    res.render("index.ejs");
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});