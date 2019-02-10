// import { uuidv1 } from 'uuid/v1';
const uuid = require('uuid/v1'); 

export class NoteModel {
    
    public text: string; 
    public score: number; 
    public id: string; 

    constructor(text: string, id?: string) {
        this.text = text; 
        this.score = 1; 
        this.id = id || uuid();
    }
}

export enum VoteType {
    UP, DOWN
}

export const noteComparator = (a, b) => {
    if (a.score > b.score) {
        return 1; 
    } else if (a.score < b.score) {
        return -1; 
    } else {
        return 0; 
    }
}