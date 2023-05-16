import { axiosClient } from '../../network/axiosClient';
import type { UserExtendedData } from './auth';

interface QuizzesQueryParams{
    searchQuery: string,
    skip: number,
    take: number
}

interface SubmitQuizData{
    correctCount: number,
    timeMilliseconds: number,
    quizId: number
}

interface UserData{
    id: number,
    username: string
}

export interface QuestionData {
    questionText: string,
    answers: string[],
    answersJsonArray: string,
    correctAnswer: number,
    imageUrl: string | undefined,
}

export interface QuizData{
    id: number,
    name: string,
    author: UserData,
    questions: QuestionData[],
    attemptCount: number,
    bestAttemptScore: number
    imageUrl: string | undefined,
}

export interface AttemptData{
    user: string,
    correctCount: number,
    timeMilliseconds: number,
}

export interface UserRankingData{
    daily: UserExtendedData[],
    weekly: UserExtendedData[],
    monthly: UserExtendedData[],
}

export function getQuizzes(params: QuizzesQueryParams) : Promise<QuizData[]>{
    return axiosClient.get('/quiz',
    { params: { ...params}}
    ).then(response => response.data as QuizData[]);
}

export function getQuiz(quizId: number) : Promise<QuizData>{
    return axiosClient.get(`/quiz/${quizId}`).then(response => parseQuiz(response.data as QuizData));
}

export function getDailyQuiz() : Promise<number>{
    return axiosClient.get('/quiz/daily').then(response => response.data as number);
}

export function getPopularQuiz(take: number) : Promise<QuizData[]>{
    return axiosClient.get('/quiz/popular', {params: {take}}).then(response => response.data as QuizData[])
}

export function submitQuiz(submitData: SubmitQuizData){
    return axiosClient.post('/quiz/submit',
    { ...submitData },
    ).then(response => response.data)
}

export function userRankings() : Promise<UserRankingData>{
    return axiosClient.get('/user/rankings').then(response => response.data);
}

function parseQuiz(quiz: QuizData): QuizData{
    const done = {
        ...quiz,
        questions: quiz.questions.map(question => {
            return {
                ...question,
                answers:  JSON.parse(question.answersJsonArray)
            }
        })
    }
    return done
}