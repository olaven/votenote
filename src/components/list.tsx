import { h, Component } from 'preact';
import Note from './note';
import { NoteModel, VoteType } from '../models/noteModel';

interface Props {
	notes: Array<NoteModel>; 
	onVote: (id: string, voteType: VoteType) => void 
}

export default class List extends Component<Props, {}> {
	
	renderList = () => this.props.notes.map(note => 
		<Note note={note} onVote={this.props.onVote} />
	); 
	
	
	render() {
		return <div className="list">
			{this.renderList()}
		</div>
	}
}
