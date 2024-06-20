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