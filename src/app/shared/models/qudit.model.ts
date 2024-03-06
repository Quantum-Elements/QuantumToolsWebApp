import { LindbladOperator } from './../enums/enum';
import { Bath, LindbladBath, OhmicBath } from './bath.model';
import { Gate } from './gate.model';
export class ComplexNumber {
    public real: number;
    public imaginary: number;
    constructor(real: number, imaginary: number) {
        this.real = real;
        this.imaginary = imaginary
    }
    toList(): number[] {
        return [this.real, this.imaginary]
    }
}

export class Qudit {
    id: number;
    num_levels: number;
    frequency: number;
    anharmonicity: number;
    bath: Bath[];
    position: { x: number, y: number };
    initial_state: ComplexNumber[];
    gates: Gate[] = [];

    constructor(
        id: number,
        num_levels: number,
        frequency: number = 4.728,
        anharmonicity: number = -0.33,
        bath: any[] = [new LindbladBath(LindbladOperator.Z, 1e-3), new LindbladBath(LindbladOperator.Sm, 1e-4)],
        position: { x: number; y: number } = { x: 0, y: 0 }
    ) {
        this.id = id;
        this.num_levels = num_levels
        this.frequency = frequency;
        this.anharmonicity = anharmonicity;
        this.bath = bath;
        this.position = position;
        this.initial_state = Array.from({ length: num_levels }, () => new ComplexNumber(1, 0));
    }

    get name() {
        return `qudit_${this.id + 1}`
    }

    toJSON(): any {
        const jsonObject = {
            [this.name]: {
                //id: this.id + 1,
                num_lvls: this.num_levels,
                type: 'fixed_frequency',
                freq: this.frequency,
                anharmonicity: this.anharmonicity,
                interaction: this.bath.map(b => b.toJson()),
            }
        };
        return jsonObject
    }
    initialStateToJson() {
        return {
            [this.name]: this.initial_state.flatMap(s => s.toList())
        }
    }
}