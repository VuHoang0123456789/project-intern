// src/reactjs-popup.d.ts
declare module 'reactjs-popup' {
    import { ComponentType, ReactNode } from 'react';

    interface PopupProps {
        trigger: ReactNode;
        modal?: boolean;
        nested?: boolean;
        closeOnDocumentClick?: boolean;
        onOpen?: () => void;
        onClose?: () => void;
        children: (close: () => void) => ReactNode;
        disabled?: boolean;
    }

    const Popup: ComponentType<PopupProps>;

    export default Popup;
}
