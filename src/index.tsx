import { h, Component } from 'preact';
import '../style';

// components
import List from './components/List'; 

// models 
import { NoteModel, noteComparator } from './models/note'; 

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
			this.setState(previous => {
				const note = new NoteModel(text);
				notes: previous.notes.push(note); 
			}); 
			event.target.value = ""; 
		} else {
			this.setState({
				currentInput: text
			}); 
		}
	}

	onVote = (id, direction) => {

		const notes = this.state.notes; 
		const votedUp = direction === "UP"; 
		const note = notes.find(note => note.id === id); 
		note.score += (votedUp ? 1 : -1); 
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
