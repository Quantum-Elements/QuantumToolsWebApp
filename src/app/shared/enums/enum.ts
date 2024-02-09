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
    Squared = 'squared',
    GaussinSquared = 'gaussian-squared'
}

export enum LindbladOperator {
    X = 'X',
    Y = 'Y',
    Z = 'Z',
    Sm = 'Sm',
    Sp = 'Sp'
}

export enum SolverOptType {
    Lindblad = "lindblad",
    Redfield = 'redfield',
    Schrodinger = 'schrodinger'
}