export interface CellLine {
    id: string;
    name: string;
    status: "active" | "retired" | "RIP";
    createdAt: Date; // Use Firebase Timestamp in Firestore
    nextTransfectionDate?: Date; // Optional, predicted by backend
}

export interface Measurement {
    id: string;
    date: Date; // Use Firebase Timestamp in Firestore
    confluence: number; // 0 to 1
    passed: boolean;
    createdAt: Date;
}

export interface User {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
}

export interface FirebaseResponse<T> {
    data: T;
    error?: string;
}