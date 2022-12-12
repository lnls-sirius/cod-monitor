import React from 'react';
import { DispatchBool } from '../../assets/interfaces/types';

class ModalObject {
    private state: boolean = false;
    private timeout: boolean = false;
    private id: string = 'BPM';
    private styling: string = 'normal';
    private flagSetter: DispatchBool | undefined;
    
    getModalState(): boolean {
        return this.state;
    }

    getModalId(): string {
        return this.id;
    }

    getModalStyling(): string {
        return this.styling;
    }

    getModalTimeout(): boolean {
        return this.timeout;
    }

    setModalState(newState: boolean): void {
        this.state = newState;
        this.signalFlag();
    }

    setModalId(newId: string): void {
        this.id = newId;
    }

    setModalStyling(newStyling: string): void {
        this.styling = newStyling;
    }

    setModalTimeout(timeout: boolean): void {
        this.timeout = timeout;
    }

    setFlagSetter(setFlag: DispatchBool): void {
        this.flagSetter = setFlag
    }

    signalFlag(): void {
        if(this.flagSetter!=undefined){
            this.flagSetter(true);
        }
    }

    setActionModal(id: string){
        this.setModalTimeout(false);
        this.setModalStyling('normal');
        this.setModalId(id);
        this.setModalState(true);
    }

    setAlert(id: string){
        this.setModalTimeout(true);
        this.setModalStyling('alert');
        this.setModalId(id);
        this.setModalState(true);
    }
}

function createModal(): ModalObject {
    const modalEntity = new ModalObject();
    return modalEntity;
}

export default createModal();
