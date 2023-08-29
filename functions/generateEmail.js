const generateEmail = (firstname, lastname) => {
    const domain = "garage-vincent-parrot.com";
    const email = `${firstname.toLowerCase()}.${lastname.toLowerCase()}@${domain}`;
    return email;
}

export default generateEmail;