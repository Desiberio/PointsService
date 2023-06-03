import Konva from "konva";

export interface Comment {
  id: number;
  text: string;
  backgroundColor: string;
  shapes: Konva.Shape[];
}
