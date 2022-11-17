// File that contain the themes used in the component's styling

export const colors = {
    btns:{
        btn1: {
            normal: 'linear-gradient(to top, #ff561c, #ff6c3a)',
            hover: 'linear-gradient(to top, #ff4200CC, #ff6c3aCC)',
            active: 'linear-gradient(to top, #d23600CC, #ff6c3aCC)'
        },
        btn2: {
            normal: 'radial-gradient(#00b9ff, #006bfb)',
            hover: 'radial-gradient(#006bfb, #0053c4)',
            active: 'radial-gradient(#006bfb, #00357c)'
        }
    },
    led: {
        on: {
            normal: 'radial-gradient(#0000fd, #000020)',
            hover: 'radial-gradient(#0000ab, #00005a)'
        },
        off: {
            normal: 'radial-gradient(#00ff02, #001e00)',
            hover: 'radial-gradient(#00bf02, #005f00)'
        },
        load: 'radial-gradient(#6400C8, #000000)'
    },
    txt:{
        primary: '#FFFFFF'
    },
    bg:{
        primary: 'linear-gradient(to bottom, #242424, #4D4D4D)',
        primary50: '#242424D0',
        secondary: 'linear-gradient(to bottom, #2E005B, #6400C8)',
        secondary_inac: 'linear-gradient(to top, #2E005BAA, #6400C8AA)',
        tertiary: 'linear-gradient(to top, #001dc1, #006fc1)',
        alert: 'linear-gradient(to top, #e27800, #e2b900)',
        white: '#FFFFFF',
        transparent: '#00000000'
    },
    chart: {
        cod_rebuilt: '#000000'
    }
}

export const properties = {
    radius: {
        extlight: '5px',
        light: '15px',
        medium: '25px',
        high: '50px'
    },
    size: {
        small: '0.75em',
        normal: '1.5em'
    }
}

export const fonts = {
    primary: '\'Akshar\', sans-serif',
    size: {
        small: '14px',
        medium: '18px',
        big: '25px'
    }
}
