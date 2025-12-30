// Theme configuration for UrbanCart

export const theme = {
  colors: {
    primary: {
      orange: '#F97316',
      green: '#10B981',
    },
    secondary: {
      gray: {
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4B5563',
        700: '#374151',
        800: '#1F2937',
        900: '#111827',
      }
    },
    status: {
      success: '#22C55E',
      warning: '#FBBF24',
      danger: '#EF4444',
      info: '#3B82F6',
    },
    text: {
      primary: '#1F2937',
      secondary: '#6B7280',
      muted: '#9CA3AF',
      light: '#F3F4F6',
    },
    border: '#E5E7EB',
    background: '#F9FAFB',
  },
  
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },

  borderRadius: {
    none: '0',
    sm: '0.25rem',
    base: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    full: '9999px',
  },

  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },

  typography: {
    fontFamily: {
      sans: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        'Oxygen',
        'Ubuntu',
        'Cantarell',
        'sans-serif',
      ].join(', '),
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
  },

  transitions: {
    fast: '150ms',
    base: '300ms',
    slow: '500ms',
  },

  breakpoints: {
    xs: '0px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};

// Component-specific styles
export const componentStyles = {
  button: {
    primary: `
      background-color: ${theme.colors.primary.orange};
      color: white;
      font-weight: 600;
      padding: 0.75rem 1.5rem;
      border-radius: ${theme.borderRadius.md};
      transition: all ${theme.transitions.base};
      
      &:hover {
        background-color: #EA580C;
        transform: translateY(-2px);
        box-shadow: ${theme.shadows.lg};
      }
    `,
    secondary: `
      background-color: ${theme.colors.primary.green};
      color: white;
      font-weight: 600;
      padding: 0.75rem 1.5rem;
      border-radius: ${theme.borderRadius.md};
      transition: all ${theme.transitions.base};
      
      &:hover {
        background-color: #059669;
        transform: translateY(-2px);
      }
    `,
  },

  card: `
    background: white;
    border-radius: ${theme.borderRadius.lg};
    box-shadow: ${theme.shadows.base};
    padding: ${theme.spacing.lg};
    transition: all ${theme.transitions.base};
    
    &:hover {
      box-shadow: ${theme.shadows.lg};
      transform: translateY(-4px);
    }
  `,

  input: `
    width: 100%;
    padding: ${theme.spacing.md};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.borderRadius.md};
    font-size: 1rem;
    transition: border-color ${theme.transitions.base};
    font-family: ${theme.typography.fontFamily.sans};
    
    &:focus {
      outline: none;
      border-color: ${theme.colors.primary.orange};
      box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1);
    }
  `,
};

// Utility functions
export const getResponsiveValue = (mobile, tablet, desktop) => {
  return {
    '@media (max-width: 640px)': mobile,
    '@media (min-width: 641px) and (max-width: 1024px)': tablet,
    '@media (min-width: 1025px)': desktop,
  };
};

export const createGradient = (color1, color2) => {
  return `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
};

export const createHover = (property, value) => {
  return {
    transition: `${property} ${theme.transitions.base} ease`,
    '&:hover': {
      [property]: value,
    },
  };
};

export default theme;
