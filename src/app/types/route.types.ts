export interface Trip {
    id: number;
    startPoint: string;
    endPoint: string;
    level?: number;
    continued?: boolean;
}