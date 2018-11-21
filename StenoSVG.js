import React from 'react';
import './StenoSVG.css';

const keys = {
    'S': [
        [10, 10, 'S'],
        [10, 105, 'S'],
    ],
    'T': [
        [90, 10, 'T'],
    ],
    'K': [
        [90, 105, 'K'],
    ],
    'P': [
        [170, 10, 'P'],
    ],
    'W': [
        [170, 105, 'W'],
    ],
    'H': [
        [250, 10, 'H'],
    ],
    'R': [
        [250, 105, 'R'],
    ],
    'A': [
        [240, 240, 'A'],
    ],
    'O': [
        [310, 240, 'O'],
    ],
    '*': [
        [380, 10, '*'],
        [380, 105, '*'],
    ],
    'E': [
        [450, 240, 'E'],
    ],
    'U': [
        [520, 240, 'U'],
    ],
    'f': [
        [510, 10, 'F'],
    ],
    'r': [
        [510, 105, 'R'],
    ],
    'p': [
        [590, 10, 'P'],
    ],
    'b': [
        [590, 105, 'B'],
    ],
    'l': [
        [670, 10, 'L'],
    ],
    'g': [
        [670, 105, 'G'],
    ],
    't': [
        [750, 10, 'T'],
    ],
    's': [
        [750, 105, 'S'],
    ],
    'd': [
        [830, 10, 'D'],
    ],
    'z': [
        [830, 105, 'Z'],
    ],
};

const convertChord = (chord) => {
    // steno convention is to display a chord as:
    // left keys, then vowels/asterisk, then right keys
    // if no vowel/asterisk is present, use a hyphen in their place (iff there are right keys)

    // this causes a problem where suppose the user types the chord ST where the correct chord was AT.
    // edit distance would say this is just one substitution, but in this case we are referring to two
    // different T's, so there are actually two incorrect keypresses.

    // to fix this, we will just convert everything on the right side of the stroke to lowercase.

    let output = new Set();
    let shouldDowncase = false;
    for (let i = 0; i < chord.length; i++) {
        if ('AEOU*-'.split('').indexOf(chord[i]) !== -1) {
            shouldDowncase = true;
            if (chord[i] !== '-') {
                output.add(chord[i]);
            }
        } else {
            if (shouldDowncase) {
                output.add(chord[i].toLowerCase());
            } else {
                output.add(chord[i]);
            }
        }
    }

    return output;
};

const StenoSVG = (props) => {
    const chord = convertChord(props.chord);

    const children = Object.keys(keys)
        .map((groupKey, i) => (
            <g key={i} className={chord.has(groupKey) ? 'pressed' : ''}>
                {keys[groupKey].map(key => (
                    [
                        <rect
                            key="r"
                            className="steno-key"
                            x={key[0]}
                            y={key[1]} />,
                        <text
                            key="t"
                            className="steno-key-text"
                            x={key[0] + 30}
                            y={key[1] + 60}>
                            {key[2]}
                        </text>,
                    ]
                ))}
            </g>
        ));

    return (
        <svg version="1.1"
                width={props.width}
                height={props.height ? props.height : props.width * 340 / 900}
                viewBox = "0 0 900 340"
                xmlns="http://www.w3.org/2000/svg">

                {children}

        </svg>
    );
};

export default StenoSVG;
