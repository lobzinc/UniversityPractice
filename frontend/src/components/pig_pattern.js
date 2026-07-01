import React from 'react';
import pigIcon from '../images/pyatachok.png';

const PigPattern = () => {
    return (
        <svg className="pig-pattern" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
                <pattern 
                    id="pigPattern" 
                    x="0" 
                    y="0" 
                    width="120" 
                    height="120" 
                    patternUnits="userSpaceOnUse"
                >
                    <image 
                        href={pigIcon} 
                        x="10" 
                        y="10" 
                        width="80" 
                        height="80" 
                        opacity="0.08"
                    />
                </pattern>
                
                {/* Второй слой для шахматного эффекта */}
                <pattern 
                    id="pigPatternOffset" 
                    x="60" 
                    y="60" 
                    width="120" 
                    height="120" 
                    patternUnits="userSpaceOnUse"
                >
                    <image 
                        href={pigIcon} 
                        x="10" 
                        y="10" 
                        width="80" 
                        height="80" 
                        opacity="0.12"
                    />
                </pattern>
            </defs>
            
            <rect width="100%" height="100%" fill="url(#pigPattern)" />
            <rect width="100%" height="100%" fill="url(#pigPatternOffset)" />
        </svg>
    );
};

export default PigPattern;