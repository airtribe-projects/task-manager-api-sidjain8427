const app = require("./app");
const port = 3000;

app.listen(port, (err) => {
    if (err) {
        return console.log("Something bad happened", err);
    }
});
