import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Point } from './models/point';
import { CircleDesigner, IPointDesigner } from './helpers/designers';
import Konva from 'konva';
import { KonvaEventObject } from 'konva/types/Node';
import { Stage } from 'konva/types/Stage';

@Component({
  selector: 'points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.css']
})
export class PointsComponent {
  public points: Point[];
  private _stage: Konva.Stage;
  private _pointDesigner: IPointDesigner;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    console.log(baseUrl);
    //should be injected via constructor but I don't know how it will work, because it is angular component and gets
    //called via AppModule(at least I think how it's working)
    this._pointDesigner = new CircleDesigner();
    http.get<Point[]>(baseUrl + 'points').subscribe(result => {
      this.points = result;
    }, error => console.error(error), () => {
      this.drawPoints();
    });
  }

  drawPoints(): void {
    var containerWidth = document.getElementById("mainframe").offsetWidth;
    var containerHeight = document.getElementById("mainframe").offsetHeight;

    this._stage = new Konva.Stage({
      container: 'mainframe',
      width: containerWidth,
      height: containerHeight,
    });

    const layer = new Konva.Layer();

    this._pointDesigner.addPoints(layer, this.points);

    this._stage.on('dblclick', this.handleDblclick.bind(this));

    this._stage.add(layer);
  }

  handleDblclick(event: KonvaEventObject<Stage>) {
    const clickedOnEmptyArea = event.target === this._stage;
    if (clickedOnEmptyArea) { return; }

    const shapeId = event.target.id();
    var point = this.points.find(point => point.shape.id() === shapeId);
    var pointIndex = this.points.findIndex(point => point.shape === event.target);

    this.http.delete(`points/${point.id}`).subscribe(
      response => {
        var layer = event.target.getLayer() as Konva.Layer;

        for (var i = 0; i < point.comments.length; i++) {
          layer.find('#c' + point.comments[i].id).each(shape => shape.destroy());
        }

        event.target.destroy();
        this.points.splice(pointIndex, 1);

        layer.draw();
      },
      error => {
        console.log(error);
      });
  }
}



