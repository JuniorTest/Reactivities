export interface ICar {
    color: string;
    model: string;
    topSpeed: number;
}

const car2: ICar = {
    color: 'red',
    model: 'Mercedes',
    topSpeed: 100
}

const muliply = (x: number, y: number): void => {
    x*y;
}

export const cars = [car2];

