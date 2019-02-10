import { NoteModel } from "./models/noteModel";

const getDatabase = (callback: (database: IDBDatabase) => void) => {
    if (!('indexedDB' in window)) { return null; }
    const request = window.indexedDB.open("notes"); 
    
    request.onsuccess = (event: any) => {
        
        const database: IDBDatabase = event.target.result
        callback(database); 
    }

    request.onerror = () => {
        alert("This app needs permission to access local database."); 
    }

    request.onupgradeneeded = (event: any) => {
        const db: IDBDatabase = event.target.result; 
        const objectStore = db.createObjectStore('notes', {
            keyPath: "id"
        }); 
    }
}

export const persistNote = (note: NoteModel) => {
    getDatabase(database => {
        const transaction = database.transaction(['notes'], 'readwrite')

        transaction
            .objectStore('notes')
            .add(note);

        transaction.onerror = (error) => {
            console.error(error); 
        }

        transaction.oncomplete = (event) => {
            console.log("completed persisting"); 
        }
    }); 
}

export const retrieveNote = (id: string, callback: (note: NoteModel) => void) => {
    getDatabase(database => {
        const transaction = database.transaction(['notes'], 'readonly')
        const objectStore = transaction.objectStore('notes');
        const request = objectStore.get(id);
        request.onsuccess = (event: Event) => {
            const note = request.result; 
            callback(note); 
        }
        request.onerror = (error) => {
            console.error(error); 
        }
    }); 
}

export const retrieveAllNotes = (callback: (notes: Array<NoteModel>) => void) => {
    getDatabase(database => {
        const transaction = database.transaction(['notes'], 'readonly')
        const objectStore: any = transaction.objectStore('notes');
        const request = objectStore.getAll(); 
        request.onsuccess = (event: Event) => {
            const note = request.result;
            callback(note);
        }
        request.onerror = (error) => {
            console.error(error);
        }
    }); 
}