export interface ApiQuiz {
    question: string,
    correct_answer: string,
    incorrect_answers: string[]
    category: string,
    difficulty: string
}


export interface dataQuiz {
    id?: number,
    user_email: string | undefined;
    correct_answers: number,
    duration: number,
    questions: number
}

