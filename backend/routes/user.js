const express = require('express');
const router = express.Router();
const dotenv = require('dotenv').config();
const User = require('../models/user');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { default: mongoose } = require('mongoose');
const user = require('../models/user');

//Authenticate
const authorization = (req, res, next) => {
	//const token = req.cookies.access_token;
	const token = req.headers.authorization.split(' ')[1];
	if (!token) {
		return res.status(403).json({ message: 'You are not Authorized!' });
	}
	try {
		const data = jwt.verify(token, process.env.JWT_SECRET);
		req.userId = data.id;
		return next();
	} catch {
		return res.status(403).json({ message: 'You have no valid token' });
	}
};


router.post('/login', async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	const user = await User.findOne({ email });

	if (user) {
		const passwordMatch = await bcrypt.compare(password, user.password);

		if (passwordMatch) {
			const token = jwt.sign(
				{
					id: user._id,
				},
				process.env.JWT_SECRET
			);

			return res
				.cookie('access_token', token, {
					httpOnly: true,
					secure: true,
					sameSite: 'none',
					
				})
				.status(200)
				.json({
					message: 'Logged in successfully',
					token: token,
				});
		} else if (!passwordMatch) {
			res.json({ message: 'sorry, could not login' });
		}
	} else {
		res.json({ message: 'sorry, could not login' });
	}
});


router.get('/protected', authorization, async (req, res) => {
	try {
		const user = await User.findById(req.userId);

		if (user === null) {
			res.status(404);
			return;
		}

		res.status(200).json({
			user: {
				id: req.userId,
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
				city: user.city,
			},
		});
	} catch (error) {
		console.error(error);
		res.status(500);
	}
});


router.post('/register', async (req, res) => {
	const user = new User(req.body);

	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);

	user.save().then(() => {
		res.status(200).json({ message: 'New user has been created!' });
	});
});


router.get('/logout', authorization, (req, res) => {
	return res
		.clearCookie('access_token')
		.status(200)
		.json({ message: 'Successfully logged out' });
});


router.delete('/:id', async (req, res) => {
	const { id } = req.params;
	if (!mongoose.Types.ObjectId.isValid(id))
		return res.status(404).json({ message: `No user with id: ${id}` });

	await User.findByIdAndRemove(id);

	return res.json({ message: 'User has been deleted successfully' });
});


router.put('/:id/edit', async (req, res) => {
	try {
		const id = req.params.id;
		const update = req.body;
		const options = { new: true };
		const user = await User.findByIdAndUpdate(id, update, options);
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ message: 'Could not update User' });
	}
});


router.put('/:id/resetpassword', async (req, res) => {
	try {
		const id = req.params.id;
		const update = req.body;

		const salt = await bcrypt.genSalt(10);
		update.password = await bcrypt.hash(update.password, salt);

		const options = { new: true };
		const user = await User.findByIdAndUpdate(id, update, options);
		res.status(204).json({ message: 'Password Reseted' });
	} catch (error) {
		res.status(500).json({ message: 'Could not reset password' });
	}
});


router.get('/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const user = await User.findById(id);
		const bookOwner = user.firstName;
		res.status(200).json({ bookOwner });
	} catch (error) {
		res.status(404).json({ message: 'Found no user' });
	}
});


router.get('/', async (req, res) => {
	const userId = req.query.userId;
	try {
		const user = await User.findById(userId);
		res.status(200).json(user);
	} catch (error) {
		res.status(404).json({ message: 'Found no user' });
	}
});

module.exports = router;
