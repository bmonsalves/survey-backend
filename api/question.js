import Debug from 'debug'
import { Question, User, Answer } from '../models'

const debug = new Debug('surveys:api:question');

export default {

    findAll: async () => {
        debug('Finding all questions');
        return Question.find().populate('answers')
    },

    findById: async (_id) => {
        debug(`Find question with id ${_id}`);
        return Question
            .findOne({ _id })
            .populate('user')
            .populate({
                path: 'answers',
                options: { sort: '-createdAt' },
                populate: {
                    path: 'user',
                    model: 'User'
                }
            })
    },

    createQuestion: async (questionData,user) => {

        const { title, description, icon } = questionData;
        const q = {
            title,
            description,
            icon,
            user: user._id
        };
        debug(`create question ${questionData}`);

        return await Question.create(q);
    },

    createAnswer: async (answerData, question, user) => {

        answerData.createdAt = new Date();
        answerData.user = new User(user);

        const answer = new Answer(answerData);
        const savedAnswer = await answer.save();
        question.answers.push(savedAnswer);
        await question.save();
        debug(`savedAnswer ${JSON.stringify(savedAnswer)}`);

        return savedAnswer;

    }
}