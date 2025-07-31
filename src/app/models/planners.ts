import { Segement } from "./segement";

export interface Planner{
    id: number;
    userName: string;
    segements?: Segement[];
    createdAt?: string;
    password?: string;
    email?: string;
}