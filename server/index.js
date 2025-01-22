// dependencies
const signupController = require("./Controllers/registercontrol")
const loginController = require("./Controllers/loginControl")
const bcrypt = require('bcrypt');
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/Users')
const app = express()
const { extractNIHData } = require('./ScrapingModule/nih_server'); // imported the function to scrape NIH data
const { extractGrantGovData } = require('./ScrapingModule/Grantgovserver');
const GrantModel = require('./models/Grants')
const GGGrantModel = require('./models/gggrants');
const { secretKey } = require('./jwtConfig')
const jwt = require('jsonwebtoken');


app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/grants")



// update backend for admin


app.post('/login', loginController.login);




//testing auth (working(password hashed))
app.post('/register', signupController.createUser);

/// to view user data


//working
app.get('/users', async (req, res) => {
    try {
        const users = await UserModel.find();

        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});




app.get('/users/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        // Find the user by ID
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return user data, including starred grants
        res.json({
            user
        });

    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Server error' });
    }
});




app.post('/api/star', async (req, res) => {
    const { userId, grantId } = req.body;

    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isStarred = user.starredGrants.includes(grantId);

        if (isStarred) {
            user.starredGrants.pull(grantId);
        } else {
            user.starredGrants.push(grantId);
        }

        await user.save();

        res.status(200).json({ message: 'Grant starred/unstarred successfully', starredGrants: user.starredGrants });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


//working
app.delete('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        await UserModel.findByIdAndDelete(userId);
        res.status(200).send({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting user', error });
    }
});



app.get('/nihlist', async (req, res) => {
    try {
        const nihlist = await GrantModel.find();

        res.json(nihlist);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



app.delete('/nihlist/:grantId', async (req, res) => {
    try {
        const { grantId } = req.params;
        const deletedGrant = await GrantModel.findByIdAndDelete(grantId);

        if (!deletedGrant) {
            return res.status(404).json({ message: 'Grant not found' });
        }

        res.status(200).json({ message: 'Grant deleted successfully' });
    } catch (error) {
        console.error('Error deleting grant:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


//working
app.get('/api/gggrants', async (req, res) => {
    try {
        const GGgrants = await GGGrantModel.find();
        res.json(GGgrants);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});




//working
// Endpoint to update starred grants for a user
app.post('/api/user/star-grant', async (req, res) => {
    const { userId, grantId } = req.body;
    try {
        const user = await UserModel.findById(userId);
        if (user) {
            if (user.starredGrants.includes(grantId)) {
                user.starredGrants = user.starredGrants.filter(id => id.toString() !== grantId);
            } else {
                user.starredGrants.push(grantId);
            }
            await user.save();
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});








// use the scrapping function to scrape the data in the backend 

app.get('/scrape', async (req, res) => {
    try {
        await extractGrantGovData();
        res.status(200).send('Scraping completed and data saved to JSON file.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred during scraping.');
    }
});





//add seperate scrapping function for NIH grants
//if want in one button can include it in /scrape url


app.get('/scrapeNIH', async (req, res) => {
    try {
        await extractNIHData(); // added the function to scrape NIH data
        res.status(200).send('Scraping completed and data saved to JSON file.');

    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred during scraping.');
    }
});

///api to get the grants from the database

app.get('/api/grants', async (req, res) => {
    try {
        const grants = await GrantModel.find();
        res.json(grants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/grants/count', async (req, res) => {
    try {
        const count = await GrantModel.countDocuments();
        res.json({ count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/gggrants/count', async (req, res) => {
    try {
        const count = await GGGrantModel.countDocuments();
        res.json({ count });
    } catch (error) {
        res.stat

        app.post('/getUserData', async (req, res) => {
            const { token } = req.body;

            try {
                const decoded = jwt.verify(token, secretKey); // Use secretKey to verify token
                const user = await UserModel.findOne({ email: decoded.email }).populate('starredGrants');

                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }

                res.json({
                    name: user.name,
                    email: user.email,
                    starredGrants: user.starredGrants,
                });
            } catch (error) {
                res.status(400).json({ message: 'Invalid token' });
            }
        }); us(500).json({ error: error.message });
    }
});


app.get('/', async (req, res) => {
    console.log("Server is running");
    res.send(
        "I love code"
    )
})


app.listen(3002, () => {
    console.log('Server is running on port 3002')
})

