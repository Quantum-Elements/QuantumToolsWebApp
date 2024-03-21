export enum BathType {
    Ohmic = 'Ohmic',
    Fluctuator = 'Spin-flucutator',
    Lindblad = 'Lindblad'
}

export enum RotationalAxis {
    X = 'X',
    Y = 'Y',
    Z = 'Z'
}


export enum PulseShape {
    Gaussian = 'gaussian',
    Squared = 'square',
    GaussinSquared = 'gaussian-square',
    None = "None"
}

export enum LindbladOperator {
    X = 'X',
    Y = 'Y',
    Z = 'Z',
    Sm = 'Sm',
    Sp = 'Sp'
}

export enum GateType {
    Rx = 'Rx',
    Ry = 'Ry',
    Rz = 'Rz',
    CR = 'CR',
    // Iswap = 'Iswap',
    I = 'I',
    PlaceHolder = "PlaceHolder",
    DoubleGatePlaceHolder = "DoubleGatePlaceHolder"
}

export enum SolverOptType {
    Lindblad = "lindblad",
    Redfield = 'redfield',
    Schrodinger = 'schrodinger'
}

export enum OdeSolverType {
    VCABM = "VCABM",
    Tsit5 = "Tsit5",
    Vern9 = "Vern9",
    LinearExp = "LinearExponential"
}