
import React from 'react';
import { UI_TEXT } from '../constants';

const Header: React.FC = () => {
    return (
        <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                {UI_TEXT.marketing.headline}
            </h1>
            <p className="mt-3 text-lg text-gray-400 max-w-3xl">
                {UI_TEXT.marketing.subheadline}
            </p>
        </header>
    );
};

export default Header;
