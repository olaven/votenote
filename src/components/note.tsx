import { h, Component } from 'preact';
import { ChevronUp, ChevronDown } from 'preact-feather'
import { VoteType, NoteModel } from '../models/noteModel';

interface NoteProps {
    note: NoteModel, 
    onVote: (id: string, type: VoteType) => void 
}

export default class Note extends Component<NoteProps, {}> {

    voteUp = () => {
    
        this.props.onVote(this.props.note.id, VoteType.UP); 
    }

    voteDown = () => {
        this.props.onVote(this.props.note.id, VoteType.DOWN); 
    }

    render() {
        return <div className="note">
            <div className="note-buttons">
                <ChevronUp onClick={this.voteUp}/>
                <div>{this.props.note.score}</div>
                <ChevronDown onClick={this.voteDown}/>
            </div>
            <div className="note-info">
                <div>{this.props.note.text}</div>   
            </div>
        </div>
    }
}
