import axios from 'axios'

export function listCourses() {
    return (
        axios({
            method: "GET",
            url: "http://localhost:3000/api/course",
            headers: {
                "token": ""
            }
        })
    )
}
export function listModules() {
    return (
        axios({
            method: "GET",
            url: "http://localhost:3000/api/module",
            headers: {
                "token": ""
            }
        })
    )
}

export function listProblems(_course, _module) {
    return (
        axios({
            method: "GET",
            url: `http://localhost:3000/api/problem/${_course}/${_module}`,
            headers: {
                "token": ""
            }
        })
    )
}

export function listAllProblems() {
    return (
        axios({
            method: "GET",
            url: `http://localhost:3000/api/problem`,
            headers: {
                "token": ""
            }
        })
    )
}

export function submission(data){
    return (
        axios({
            method: "POST",
            url: "http://localhost:3000/api/submission",
            data: data,
            headers: {
                "token": ""
            }
        })
    )
}

export function userProblem(data){
    return (
        axios({
            method: "POST",
            url: "http://localhost:3000/api/userproblem",
            data: data,
            headers: {
                "token": ""
            }
        })
    )
}

export function findUserProblemByUserAndProblem(userId, problemId) {
    return (
        axios({
            method: "GET",
            url: `http://localhost:3000/api/userproblem/${userId}/${problemId}`,
            headers: {
                "token": ""
            }
        })
    );
}

export function userLevel(data){
    return (
        axios({
            method: "POST",
            url: "http://localhost:3000/api/userlevel",
            data: data,
            headers: {
                "token": ""
            }
        })
    )
}

export function updateUserLevel(userId, idDifficulty) {
    return axios({
        method: "PUT",
        url: `http://localhost:3000/api/userlevel/${userId}`,
        headers: {
            "token": ""
        },
        data: {
            id_difficulty: idDifficulty
        }
    });
}


export function findUserLevel(userId){
    return (
        axios({
            method: "GET",
            url: `http://localhost:3000/api/userlevel/${userId}`,
            headers: {
                "token": ""
            }
        })
    )
}