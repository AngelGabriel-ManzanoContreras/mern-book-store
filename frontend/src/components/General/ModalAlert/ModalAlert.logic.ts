import { useEffect } from "react";

export default function useModalAlertLogic( active : boolean ) {
    useEffect(() => {
        if (active) {
          window.scrollTo(0, 0);
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'auto';
        }
    
        // Clean up the effect when the component is unmounted
        return () => {
          document.body.style.overflow = 'auto';
        };
    }, [active]);

}