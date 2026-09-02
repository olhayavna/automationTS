import {test, expect} from "@playwright/test";
import {generateEmail} from "../utils/generateEmail";

let password = "Password123";
let email = "autotest123+4@tutamail.com";

test("API 1: Get All Products List", async ({request}) => {
    const response = await request.get("https://automationexercise.com/api/productsList");
    await expect(response).toBeOK();

    //Response Code: 200
    //Response JSON: All products list
    const body = await response.json();
    expect(body.responseCode).toBe(200);
    expect(body.products.length).toBeGreaterThan(0);
})
test("API 2: POST To All Products List", async ({request}) => {
    const response = await request.post('https://automationexercise.com/api/productsList');

    // The real HTTP status here is always 200 — this site doesn't use real HTTP status codes for errors.
    // The "405" only exists inside the JSON body.
    await expect(response).toBeOK();

    //Response Code: 405
    // Response Message: This request method is not supported.
    const body= await response.json();
    expect(body.responseCode).toBe(405);
    expect(body.message).toBe("This request method is not supported.");
})
test("API 3: Get All Brands List", async ({request}) => {
    const response = await request.get('https://automationexercise.com/api/brandsList');
    await expect(response).toBeOK();

    //Response Code: 200
    // Response JSON: All brands list
    const body = await response.json();
    expect(body.responseCode).toBe(200);
    expect(body.brands.length).toBeGreaterThan(0);
})
test("API 4: PUT To All Brands List", async ({request}) => {
    const response = await request.put("https://automationexercise.com/api/brandsList");
    await expect(response).toBeOK();

    //Response Code: 405
    // Response Message: This request method is not supported.
    const body = await response.json();
    expect(body.responseCode).toBe(405);
    expect(body.message).toBe("This request method is not supported.");
})
test("API 5: POST To Search Product", async ({request}) => {
    const response = await request.post("https://automationexercise.com/api/searchProduct", {
        form: {
            search_product: "top",
        },
    });

    await expect(response).toBeOK();

    //Request Parameter: search_product (For example: top, tshirt, jean)
    // Response Code: 200
    // Response JSON: Searched products list
    const body = await response.json();
    expect(body.responseCode).toBe(200);
    expect(body.products.length).toBeGreaterThan(0);
})
test("API 6: POST To Search Product without search_product parameter", async ({request}) => {
    const response = await request.post('https://automationexercise.com/api/searchProduct');
    await expect(response).toBeOK();

    //Response Code: 400
    // Response Message: Bad request, search_product parameter is missing in POST request.
    const body = await response.json();
    expect(body.responseCode).toBe(400);
    expect(body.message).toBe("Bad request, search_product parameter is missing in POST request.");
})
test("API 7: POST To Verify Login with valid details", async ({request}) => {
    const response = await request.post("https://automationexercise.com/api/verifyLogin", {
        form: {
            password: password,
            email : email
        },
    });
    await expect(response).toBeOK();

    //Request Parameters: email, password
    // Response Code: 200
    // Response Message: User exists!
    const body = await response.json();
    expect(body.responseCode).toBe(200);
    expect(body.message).toBe("User exists!");
})
test("API 8: POST To Verify Login without email parameter", async ({request}) => {
    const response = await request.post("https://automationexercise.com/api/verifyLogin", {
        form: {
            password: password
        },
    })
    await expect(response).toBeOK();

    //Response Code: 400
    // Response Message: Bad request, email or password parameter is missing in POST request.
    const body = await response.json();
    expect(body.responseCode).toBe(400);
    expect(body.message).toBe("Bad request, email or password parameter is missing in POST request.");
})
test("API 9: DELETE To Verify Login", async ({request}) => {
    const response = await request.delete("https://automationexercise.com/api/verifyLogin");
    await expect(response).toBeOK();

    //Response Code: 405
    // Response Message: This request method is not supported.
    const body = await response.json();
    expect(body.responseCode).toBe(405);
    expect(body.message).toBe("This request method is not supported.");
})
test("API 10: POST To Verify Login with invalid details", async ({request}) => {
    const response = await request.post("https://automationexercise.com/api/verifyLogin", {
        form: {
            email: email,
            password: "invalid"
        },
    });
    await expect(response).toBeOK();

    //Response Code: 404
    // Response Message: User not found!
    const body = await response.json();
    expect(body.responseCode).toBe(404);
    expect(body.message).toBe("User not found!");
})
test("API 11: POST To Create/Register User Account", async ({request}) => {
    const response = await request.post("https://automationexercise.com/api/createAccount", {
        form: {
            name: "Autotest",
            email: generateEmail(),
            password: password,
            title: "Mrs.",
            birth_date: "10",
            birth_month: "May",
            birth_year: "2000",
            firstname: "Auto",
            lastname: "Test",
            company: "company",
            address1: "address1",
            address2: "address2",
            country: "Canada",
            zipcode: "12345",
            state: "state",
            city: "Toronto",
            mobile_number: "12345"
        },
    });
    await expect(response).toBeOK();

    //Response Code: 201
    // Response Message: User created!
    const body = await response.json();
    expect(body.responseCode).toBe(201);
    expect(body.message).toBe("User created!");
})
test("API 12: DELETE METHOD To Delete User Account", async ({request}) => {
    const emailToDelete = generateEmail();

    //First, we'll create an account
    await request.post("https://automationexercise.com/api/createAccount", {
        form: {
            name: "Temp",
            email: emailToDelete,
            password: password,
            title: "Mr.",
            birth_date: "1",
            birth_month: "January",
            birth_year: "2000",
            firstname: "Temp",
            lastname: "User",
            company: "company",
            address1: "address1",
            address2: "address2",
            country: "India",
            zipcode: "12345",
            state: "state",
            city: "city",
            mobile_number: "12345"
        },
    });

    const response = await request.delete("https://automationexercise.com/api/deleteAccount", {
        form: {
            password: password,
            email: emailToDelete
        }
    });
    await expect(response).toBeOK();

    //Request Parameters: email, password
    // Response Code: 200
    // Response Message: Account deleted!
    const body = await response.json();
    expect(body.responseCode).toBe(200);
    expect(body.message).toBe("Account deleted!");
})
test("API 13: PUT METHOD To Update User Account", async ({request}) => {
    const response = await request.put("https://automationexercise.com/api/updateAccount", {
        form: {
            name: "Flower",
            email: "autotest123+8@tutamail.com",
            password: password,
            title: "Mr.",
            birth_date: "11",
            birth_month: "January",
            birth_year: "1999",
            firstname: "Sun",
            lastname: "Flower",
            company: "company0",
            address1: "address10",
            address2: "address20",
            country: "India",
            zipcode: "54321",
            state: "state0",
            city: "Toronto0",
            mobile_number: "54321"
        },
    });
    await expect(response).toBeOK();

    //Response Code: 200
    // Response Message: User updated!
    const body = await response.json();
    expect(body.responseCode).toBe(200);
    expect(body.message).toBe("User updated!");
})
test("API 14: GET user account detail by email", async ({request}) => {
    const response = await request.get("https://automationexercise.com/api/getUserDetailByEmail", {
        params: {
            email: 'autotest123+8@tutamail.com'
        },
    })
    await expect(response).toBeOK();

    //Response Code: 200
    // Response JSON: User Detail
    const body = await response.json();
    expect(body.responseCode).toBe(200);
    expect(body.user).toBeTruthy();
})