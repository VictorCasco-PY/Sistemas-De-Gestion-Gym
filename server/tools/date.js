export const getDateNow = () => {
    const date = new Date();
    return date;
}

export const toDate = (fecha) =>{
    const _date = fecha.split('-');
    const date = new Date();
    date.setDate(_date[0])
    date.setMonth(_date[1])
    date.setFullYear(_date[2])
    return date;
}