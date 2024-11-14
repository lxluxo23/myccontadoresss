import React from 'react';

function PageButton({ ariaLabel, src, altText, styles }) {
    return (
        <button aria-label={ariaLabel} className="focus:outline-none flex items-center">
            <img loading="lazy" src={src} alt={altText} className={styles} />
        </button>
    );
}

function PageNumber({ number, isActive }) {
    return (
        <div
            className={`flex items-center justify-center w-6 h-6 rounded-full shadow-sm ${isActive ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            aria-current={isActive ? "page" : undefined}
        >
            {number}
        </div>
    );
}

function Pagination() {
    return (
        <nav
            className="flex gap-4 items-center justify-center mt-12 ml-3 max-w-full text-sm tracking-tight whitespace-nowrap text-zinc-700 max-md:mt-10"
            aria-label="Pagination"
            style={{ fontFamily: 'Work Sans, sans-serif', letterSpacing: '-2%' }}
        >
            <div className="text-center font-medium">
                Página
            </div>

            <div className="flex gap-4 items-center">
                <PageButton
                    ariaLabel="Previous page"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/6597016ce74407965e5942192543dc190a31a922d35fd2c6fdbe7a605429c402?apiKey=c8e063ba4e294c0496fff8126c800e5e&"
                    altText="Previous page icon"
                    styles="object-contain w-3 h-3 fill-indigo-500"
                />

                <PageNumber number={1} isActive />

                <PageButton
                    ariaLabel="Next page"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/dd79cff359ae0550422ce2addded51890df055927929c99a9887902f8948ecd9?apiKey=c8e063ba4e294c0496fff8126c800e5e&"
                    altText="Next page icon"
                    styles="object-contain w-3 h-3 fill-indigo-500"
                />
            </div>

            <div className="flex flex-col items-center text-center">
                <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/e2c08d4d26243cc148babf7d62172fdb59af7708aab66cd7f39f4e1c5f056c77?apiKey=c8e063ba4e294c0496fff8126c800e5e&"
                    alt="Last page icon"
                    className="object-contain w-2 h-2 fill-indigo-300"
                />
                <div className="text-base font-medium -mt-0.7">
                    30
                </div>
                <div className="w-full h-px bg-indigo-300 rounded-full mt-1" />
            </div>
        </nav>
    );
}

export default Pagination;
