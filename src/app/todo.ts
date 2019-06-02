export class Todo {
    id: string;
    uid: string;
    title: string;
    description: string;
    type: number;
    order: number;
    date: string;
    props: {
        onEdit: boolean
    };
}
