export function create_id(size) {
    let id;

    id = '';
    for (let i = 0; i < size; i++) {
        let number;

        do
            number = Math.floor(Math.random() * 94) + 33;
        while (number == 34 || number == 39 || number == 96 || number == 92);
        id += String.fromCharCode(number);
    }
    return id;
}

export function kill_many(array, condition) {
    for (let i = array.length - 1; i >= 0; i--)
        if (condition(array[i]))
            array.splice(i, 1);
}