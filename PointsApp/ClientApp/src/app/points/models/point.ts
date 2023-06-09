import { Comment } from './comment';
import Konva from 'konva'

export interface Point {
  id: number;
  x: number;
  y: number;
  radius: number;
  color: string;
  comments: Comment[];
  shape: Konva.Shape;
}
