var express = require('express')
var cors = require('cors')
const fabric = require('fabric').fabric;

const app = express();
const port = 3000;

app.use(cors())


const width = 720
const height = 1280
const center = {
    x: width / 2,
    y: height / 2
}
const colors = {
    red: '#ef4444',
    green: '#22c55e',
    black: '#000000',
    white: '#ffffff',
    gray: '#171717'
}

const drawImage = (lang, traits, personName, totalPercent) => {
    const canvas = new fabric.Canvas(null, {
        width: width,
        height: height,
        backgroundColor: colors.black
    });

    const textWithEmoji = new fabric.Textbox(lang === "fr" ? `Traits de ${personName}.\nConfiance: ${traits[0].percent}\nSourire: ${traits[1].percent}\nMignonnerie: ${traits[2].percent}\nAmour: ${traits[3].percent}\nGentillesse: ${traits[4].percent}\nColère: ${traits[5].percent}\n\nTotal: ${totalPercent}`: `${personName}'s Traits.\nConfidence: ${traits[0].percent}\nSmile: ${traits[1].percent}\nCuteness: ${traits[2].percent}\nLove: ${traits[3].percent}\nKindness: ${traits[4].percent}\nAnger: ${traits[5].percent}\n\nTotal: ${totalPercent}`, {
        fontSize: 50,
        fontFamily: "Open Sans",
        fill: colors.white,
        originX: 'center',
        originY: 'center'
    });
    
    // Center the text on the canvas
    textWithEmoji.set({
        left: center.x,
        top: center.y
    });
    
    canvas.add(textWithEmoji);
    
    const data = canvas.toDataURL("image/png")

    return data

}

// Function to generate personality traits with weights
const getPersonalityTraits = () => {
    const arr = [{name: "confidence", percent: Math.floor(Math.random() * 100)},
        {name: "smile", percent: Math.floor(Math.random() * 100)},
        {name: "cuteness", percent: Math.floor(Math.random() * 100)},
        {name: "love", percent: Math.floor(Math.random() * 100)},
        {name: "kindness", percent: Math.floor(Math.random() * 100)},
        {name: "anger", percent: Math.floor(Math.random() * 100)}]
    return arr;
};

// Route to handle personality request
app.get('/person/:name', async (req, res) => {
    try {
        const name = req.params.name;
        const lang = req.query.lang
        // Example weights - adjust these as needed
        const traits = getPersonalityTraits();
        let total = 0
        let calculatedPercent = 0
        traits.map((trait) => {
            total = total + trait.percent
        })
        calculatedPercent = total / 6
        calculatedPercent = Math.round(calculatedPercent)
        const data = drawImage(lang, traits, name, calculatedPercent)
        res.json({
            name: name,
            traits: traits,
            img_data: data
        });
    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.get("/", (req, res) => {
  res.send("Whoami Backend Running.")
})

// Start server
app.listen(port, () => {
    console.log(` API listening at ${port}.`);
});
