import {createPortal} from "react-dom";
import React, {useEffect, useRef} from "react";
import "./modal.css"

type ModalProps = {
    escapeClose?: boolean
    clickClose?: boolean
    showClose?: boolean
    open: boolean
    onClose: () => void
    children : React.ReactNode
}

export function Modal(
    {
        escapeClose = false,
        clickClose = false,
        showClose = false,
        open,
        onClose,
        children
    } : ModalProps
) {

    const handleEscape = (e: { keyCode: number; }) => {
        if (e.keyCode === 27)
            onClose()
    }

    const modalRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (escapeClose) {
            document.addEventListener('keydown', handleEscape)
        }
        
        if  (clickClose) {
            modalRef.current?.addEventListener('click', onClose)
        }
        
        return () => {
            if (escapeClose) {
                document.removeEventListener('keydown', handleEscape)
            }
            if  (clickClose) {
                modalRef.current?.addEventListener('click', onClose)
            }
        }
    }, [clickClose, escapeClose, handleEscape, onClose]);

    if (open) {
        return (
            createPortal(
                <div className="__bground">
                    <div ref={modalRef} className="__modal">
                        {showClose && <div className="__modal-close-topright" onClick={onClose}>X</div>}
                        {children}
                    </div>
                </div>
                ,document.body)
        )
    }

    return null

}