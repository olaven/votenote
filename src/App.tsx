import { h, Component } from 'preact';
import '../style';

// components
import List from './components/List'; 

// models 
import { NoteModel, noteComparator, VoteType } from './models/noteModel'; 

interface State {
	notes: Array<NoteModel>, 
	currentInput: string 
}

export default class App extends Component<{}, State> {

	componentWillMount() {
		this.state = {
			notes: [], //TODO: fetch from storage 
			currentInput: "" 
		}
	}

	onKeyDown = (event) => {

		const text = event.target.value; 
		if (event.keyCode === 13) {
			const note = new NoteModel(text); 			
			
			this.setState(previous => {
				notes: previous.notes.push(note); 
			})

		
			
			event.target.value = ""; 
		} else {
			this.setState({
				currentInput: text
			}); 
		}
	}

	onVote = (id: string, type: VoteType) => {

		const notes = this.state.notes; 
		const up = type === VoteType.UP; 

		notes.filter(note => note.id === id).forEach(note => {
			note.score += (up ? 1 : -1); 
		})

		notes.sort(noteComparator).reverse(); 

	
		this.setState({
			notes: notes
		}); 
	}

	render() {
		
		return (
			<div>
				<input onKeyDown={this.onKeyDown} className="input"/>
				<List notes={this.state.notes} onVote={this.onVote}/> 
			</div>
		);
	}
}
