export const API_URL = 'https://api.stormtoshore.com/';

export const APPROVED = 'APPROVED';
export const REJECTED = 'REJECTED';
export const PENDING = 'PENDING';

export const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Prayer Wall', href: '/prayer-wall/' },
];

export const navItemDropdowns = [
    {
        label: 'Media',
        dropdown: [
            { label: 'Media', href: '/media/' },
            { label: 'Articles', href: '/articles/' },
        ],
    },
    {
        label: 'Us',
        dropdown: [
            { label: 'About', href: '/about/' },
            { label: 'Contact', href: '/contact/' },
        ],
    },
];
