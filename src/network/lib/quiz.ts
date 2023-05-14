import { axiosClient } from '../../network/axiosClient';

interface QuizzesQueryParams{
    searchQuery: string,
    skip: number,
    take: number
}

interface SubmitQuizData{
    correctCount: number,
    time: Date,
    quizId: number
}

interface UserData{
    id: number,
    username: string
}

export interface QuestionData {
    question: string,
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
    timesFinished: number,
    bestCorrectToTimeRatio: number
    imageUrl: string | undefined,
}

export interface AttemptData{
    user: string,
    correctCount: number,
    time: string,
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

export function submitQuiz(submitData: SubmitQuizData){
    return axiosClient.post('/quiz/submit',
    { ...submitData },
    ).then(response => response.data)
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
    console.log(done)
    return done
}