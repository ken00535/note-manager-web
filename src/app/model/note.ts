export interface NoteUnit {
    id: string;
    content: string;
    comment: string;
    tags: string[];
}

export function NewNote(): NoteUnit {
    return {
        id: '',
        content: '',
        comment: '',
        tags: []
    }
}