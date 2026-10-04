

import { test, expect, request, APIResponse } from '@playwright/test';


let id;

let AUTH_TOKEN = {
    Authorization: 'Bearer 465ce290692efff5c876de0954e7f14f0cd8f05e8cbae0a8b16c06bc28a8e724'
};

test.describe.serial('GoREST CRUD Tests', () => {
test('get all users GET api test', async ({ request }) => {

    let response: APIResponse = await request.get('https://gorest.co.in/public/v2/users', {
        headers: AUTH_TOKEN
    });
    //console.log(response);
    let jsonBody = await response.json();
    console.log(jsonBody);
    console.log(response.status());
    console.log(response.statusText());

    expect(response.status()).toBe(200);

});


test('create a user POST api test', async ({ request }) => {

    //User JS Object:
    let userData = {
        name: 'manish r',
        email: `mishtest_${Date.now()}@open.com`,
        gender: 'male',
        status: 'active'
    }
    //JS Object ---> JSON (Serialization)
    //JSON.stringify();

    let response = await request.post('https://gorest.co.in/public/v2/users', {
        headers: AUTH_TOKEN,
        data: userData
    });

    let jsonBody = await response.json();
    console.log(jsonBody);
    console.log(response.status());//201
    console.log(response.statusText());//Created
    id = jsonBody.id;
    console.log("ID Is :" , id);

    expect(response.status()).toBe(201);

});



test('update a user PUT api test', async ({ request }) => {

    //User JS Object:
    let userData = {
        name: 'manish lalwani',
        email: `manishtest_${Date.now()}@open.com`,
        gender: 'male',
        status: 'inactive'
    }
    //JS Object ---> JSON (Serialization)
    //JSON.stringify();

    let response = await request.put(`https://gorest.co.in/public/v2/users/${id}`, {
        headers: AUTH_TOKEN,
        data: userData
    });

    let jsonBody = await response.json();
    console.log(jsonBody);
    console.log(response.status());//200
    console.log(response.statusText());//OK

    expect(response.status()).toBe(200);

});


test('delete a user DELETE api test', async ({ request }) => {

    let response = await request.delete(`https://gorest.co.in/public/v2/users/${id}`, {
        headers: AUTH_TOKEN,
    });

    console.log(response.status());//204
    console.log(response.statusText());//No Content

    expect(response.status()).toBe(204);

});

});