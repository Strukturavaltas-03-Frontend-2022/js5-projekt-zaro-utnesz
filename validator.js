'use strict'

const validator = (name, email, address, isValid) => {
    isValid = false;


const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const isValidName = /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/;
const isVAlidAddress = /^[a-zA-Z0-9\s,'-]*$/;


const nameMatch = name.match(isValidName);
const emailMatch = email.match(isValidEmail);
const addressMatch = address.match(isVAlidAddress);

if (nameMatch && emailMatch && addressMatch) {
    isValid = true;
} else if (!nameMatch && emailMatch && addressMatch) {
    isValid = false;
    console.log("Name is not valid!");
} else if (nameMatch && !emailMatch && addressMatch) {
    isValid = false;
    console.log("Email is not valid!");
} else if (nameMatch && emailMatch && !addressMatch) {
    isValid = false;
    console.log("Address is not valid!");
} else {
    isValid = false;
    console.log("Are your stupid or what?");
}

 return isValid;
}

