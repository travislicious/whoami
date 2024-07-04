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

const drawImage = () => {
    const canvas = new fabric.Canvas(null, {
        width: width,
        height: height,
        backgroundColor: colors.black
    });

    const textWithEmoji = new fabric.Text('Hello, World! 😊', {
        fontSize: 50,
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
    // Default weights if not provided

    // Generate traits with weighted values
    return {
        confidence: Math.floor(Math.random() * 100),
        smile: Math.floor(Math.random() * 100),
        cuteness: Math.floor(Math.random() * 100),
        love: Math.floor(Math.random() * 100),
        kindness: Math.floor(Math.random() * 100),
        anger: Math.floor(Math.random() * 100)
    };
};

// Route to handle personality request
app.get('/traits/:name', async (req, res) => {
    try {
        const name = req.params.name;
        // Example weights - adjust these as needed
        const traits = getPersonalityTraits();
        res.json({
            name: name,
            traits: traits,
        });
    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.get("/", (req, res) => {
    const data = drawImage()
    res.send(data)
})

// Start server
app.listen(port, () => {
    console.log(` API listening at ${port}.`);
});
