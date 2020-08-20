import { TABLE_RESIZE, CHANGE_TEXT } from "./types";

export function tableResize(data){
    return {
        type: TABLE_RESIZE,
        data
    }
}

export function changeText(text) {
    return {
        type: CHANGE_TEXT,
        data
    }
}