const numbers = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9"
];

//Default length is 5 (e.g. 40814)

export function randomNumber() {
    const n = Math.floor(Math.random() * Math.floor(numbers.length - 1)) + 1;

    return numbers[n];
}

export function generateId() {
    return Array(18).fill(randomNumber()).join("");
}

export function advancedId(existing: string[]) {
    let finalId: string;
    for (; ;) {
        const Id = generateId();
        if (!existing.includes(Id)) {
            finalId = Id;
            break;
        } else continue;
    }

    return finalId;
}