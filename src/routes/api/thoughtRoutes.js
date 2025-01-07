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
const thought_1 = __importDefault(require("../../models/thought"));
const user_1 = __importDefault(require("../../models/user"));
const router = (0, express_1.Router)();
// GET to get all thoughts
router.get('/thoughts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thoughts = yield thought_1.default.find();
        res.json(thoughts);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// GET to get a single thought by its _id
router.get('/thoughts/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield thought_1.default.findById(req.params.id);
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(thought);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// POST to create a new thought
router.post('/thoughts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newThought = yield thought_1.default.create(req.body);
        yield user_1.default.findByIdAndUpdate(req.body.userId, { $push: { thoughts: newThought._id } }, { new: true });
        res.json(newThought);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// PUT to update a thought by its _id
router.put('/thoughts/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedThought = yield thought_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedThought) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(updatedThought);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// DELETE to remove a thought by its _id
router.delete('/thoughts/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedThought = yield thought_1.default.findByIdAndDelete(req.params.id);
        if (!deletedThought) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json({ message: 'Thought deleted!' });
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// POST to create a reaction stored in a single thought's reactions array field
router.post('/thoughts/:thoughtId/reactions', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield thought_1.default.findByIdAndUpdate(req.params.thoughtId, { $push: { reactions: req.body } }, { new: true });
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(thought);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// DELETE to pull and remove a reaction by the reaction's reactionId value
router.delete('/thoughts/:thoughtId/reactions/:reactionId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield thought_1.default.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true });
        if (!thought) {
            return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(thought);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
exports.default = router;
