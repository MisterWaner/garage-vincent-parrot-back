const generateCarRefence = (brand, model) => {
    const year = new Date().getFullYear();
    const number = Math.floor(100 + Math.random() * 900);
    const reference = `${brand}-${model}-${year}-${number}`;
    return reference;
};

export default generateCarRefence;
