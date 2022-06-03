/*
File for api calls for company related actions
Dylan Lawrence 6/3/2022
*/

export const getCompanies = async() => {
    fetch('https://internify-api-test.herokuapp.com/getCompanies',{
    method: "GET"})
    .then(response => {
        console.log(response.json())
    })
}