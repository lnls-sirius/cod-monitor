import React, { createRef, useEffect } from "react";
import Hammer from 'hammerjs';
import { isBPMName } from "../../../controllers/bpm";
import { GestureInterface } from "../../../assets/interfaces/patterns";
import { OrbitData } from "../../../assets/interfaces/types";


const GestureRecognizer: React.FC<GestureInterface> = (props) => {
    // Gesture recognizer wrapper
    let gest_container: React.RefObject<HTMLDivElement> = createRef<HTMLDivElement>();
    let panSelector: Array<string|OrbitData> = [];
    let panList: Array<string> = [];

    function registerItem(target: any, type_reg: number): void {
        if(target.nodeName === 'BUTTON'){
            if(isBPMName(target.id)){
                panSelector[type_reg] = target.id;
            }
        }else if(target.nodeName === 'DIV'){
            const button = target.childNodes[0];
            if(button && ('id' in button)){
                if(isBPMName(target.id)){
                    panSelector[type_reg] = button.id;
                }
            }
        }
    }

    function selectByElement(evt: any): void {
        if('nodeName' in evt.target){
            let pan_type: number = panSelector.length === 0?0:1;
            registerItem(evt.target, pan_type);
        }
    }

    function generateOrbitData(children: any): OrbitData {
        return [
            children[1].innerText,
            children[2].innerText,
            children[3].innerText,
            parseFloat(children[4].innerText),
            parseFloat(children[5].innerText)]
    }

    function selectByRow(evt: any): void {
        if(evt.target.parentNode.nodeName === 'TR'){
            let children: any = evt.target.parentNode.childNodes;
            let orbit: OrbitData = generateOrbitData(children);
            if(orbit[1]!=="Element Name"){
                if(evt.type==='panstart'){
                    panList = [];
                    panSelector.push(orbit);
                    panList.push(orbit[0]+orbit[2]);
                }else{
                    if(!(panList.includes(orbit[0]+orbit[2]))){
                        panSelector.push(orbit);
                        panList.push(orbit[0]+orbit[2]);
                    }
                }
            }
        }

    }

    useEffect(() => {
        if(gest_container.current!==null){
            let mc: HammerManager = new Hammer(
                gest_container.current);
            mc.add(new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0}));
            mc.on('panstart panend panmove', function(evt){
                if(evt.type === 'panstart'){
                    panSelector = [];
                }
                switch(props.type){
                    case 'element': {
                        selectByElement(evt);
                        break;
                    }
                    case 'row': {
                        selectByRow(evt);
                        break;
                    }
                    default: {
                        break;
                    }
                }
                if(evt.type === 'panend'){
                    if(panSelector.length >= 2){
                        props.gestureHandler(panSelector);
                    }
                }
            });
        }
    }, [])

    return (
        <div ref={gest_container} data-testid="gesture">
            {props.children}
        </div>
    )
};

export default GestureRecognizer;
