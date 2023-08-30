const generateCarRefence = (brand, model) => {
    const actualYear = new Date().getFullYear();
    const randomNumber = Math.floor(100 + Math.random() * 900);
    const reference = `${brand}-${model}-${actualYear}-${randomNumber}`;
    return reference;
};

export default generateCarRefence;
