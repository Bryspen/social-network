"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../../models/user"));
const thought_1 = __importDefault(require("../../models/thought"));
const router = (0, express_1.Router)();
// GET all users
router.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find().populate('thoughts').populate('friends');
        res.json(users);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// GET a single user by its _id and populated thought and friend data
router.get('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findById(req.params.id).populate('thoughts').populate('friends');
        if (!user) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// POST a new user
router.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield user_1.default.create(req.body);
        res.json(newUser);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// PUT to update a user by its _id
router.put('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield user_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(updatedUser);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// DELETE to remove user by its _id
router.delete('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield user_1.default.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        yield thought_1.default.deleteMany({ username: deletedUser.username });
        res.json({ message: 'User and associated thoughts deleted!' });
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// POST to add a new friend to a user's friend list
router.post('/users/:userId/friends/:friendId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// DELETE to remove a friend from a user's friend list
router.delete('/users/:userId/friends/:friendId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
exports.default = router;
