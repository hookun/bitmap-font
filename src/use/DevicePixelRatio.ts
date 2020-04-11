import {useEffect, useState} from 'react';

export const useDevicePixelRatio = (): number => {
    const [dpr, setDpr] = useState(devicePixelRatio);
    useEffect(
        () => {
            const onResize = (): void => {
                const newDpr = devicePixelRatio;
                if (newDpr !== dpr) {
                    setDpr(newDpr);
                }
            };
            addEventListener('resize', onResize);
            return (): void => removeEventListener('resize', onResize);;
        },
        [dpr],
    );
    return dpr;
};
