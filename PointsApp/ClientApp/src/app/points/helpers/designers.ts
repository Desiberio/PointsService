import Konva from "konva";
import { Point } from "../models/point";
import { Comment } from "../models/comment";


export interface IPointDesigner {
  addPoints(layer: Konva.Layer, points: Point[]);
}

export class CircleDesigner implements IPointDesigner {
  addPoints(layer: Konva.Layer, points: Point[]) {
    var commentDesigner = new BaseCommentDisigner();
    for (let i = 0; i < points.length; i++) {
      var circle = new Konva.Circle({
        id: 'p' + points[i].id,
        x: points[i].x,
        y: points[i].y,
        radius: points[i].radius,
        fill: points[i].color
      });

      layer.add(circle);
      points[i].shape = circle;


      commentDesigner.addComments(layer, points[i], points[i].comments);
    }
  }
}

export interface ICommentDesigner {
  addComments(layer: Konva.Layer, point: Point, comments: Comment[]);
}

export class BaseCommentDisigner implements ICommentDesigner{
  addComments(layer: Konva.Layer, point: Point, comments: Comment[]) {
    var commentY = point.y + point.radius + 16;
    for (var i = 0; i < comments.length; i++) {
      commentY += this.createComment(point.x, commentY, layer, comments[i]);
    }
  }

  private createComment(x: number, y: number, layer: Konva.Layer, comment: Comment): number {
    var fontSize = 18;
    var complexText = new Konva.Text({
      id: 'c' + comment.id,
      x: x,
      y: y,
      text: comment.text,
      fontSize: fontSize,
      fontFamily: 'Calibri',
      fill: 'green',
      padding: 4
    });

    complexText.offsetX(complexText.width() / 2);

    var rect = new Konva.Rect({
      id: 'c' + comment.id,
      x: complexText.x() - complexText.offsetX(),
      y: y,
      stroke: 'gray',
      strokeWidth: 1,
      fill: comment.backgroundColor,
      width: complexText.width(),
      height: complexText.height(),
    });

    layer.add(rect);
    layer.add(complexText);

    comment.shapes = new Array<Konva.Shape>();
    comment.shapes.push(rect);
    comment.shapes.push(complexText);

    return complexText.height() + 5;
  }
}
