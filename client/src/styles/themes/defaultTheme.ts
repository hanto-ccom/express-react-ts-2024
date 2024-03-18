const palette = {
    darkness: '#141414',
    lead: '#666666',
    gloom: '#818181',
    grayish: '#BFBFBF',
    deepPurple: '#502785',
    blueTone: '#5e4bc2',

    pureWhite: '#FFFFFF',
    pitchBlack: '#000',

}

const defaultTheme = {
    colors: {
        primary: palette.blueTone,
        primaryHover: palette.deepPurple,
        primaryText: palette.pureWhite,

        secondary: palette.pureWhite,
        secondaryHover: palette.grayish,
        secondaryText: palette.deepPurple,

        background: palette.lead,
        text: palette.pureWhite,
        link: palette.deepPurple,
        border: palette.deepPurple,
    },
    typography: {
        fontSize: '1rem',
        fontFamily: '"Helvetica Neue", sans-serif',
    },
    spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px'
    },
    margin: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px'
    },
    padding: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px'
    },

    fontSize: {
        xs: '14px',
        sm: '16px',
        md: '18px',
        lg: '24px',
        xl: '32px',
        xxl: '48px'
    },

    breakpoints: {
        mobile: '320px',
        tablet: '768px',
        laptop: '1024px',
        largeLaptop: '1200px',
        desktop: '1440px',
        largeDesktop: '1640px'
    },
    borderRadii: {
        small: '4px',
        default: '8px',
        large: '16px',
    },
    shadows: {
        small: '0 1px 3px rgba(0, 0, 0, 0.1)',
        medium: '0 4px 6px rgba(0, 0, 0, 0.1)',
        large: '0 10px 20px rgba(0, 0, 0, 0.2)',
    },
};
export default defaultTheme;