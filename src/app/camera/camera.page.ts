import { Component, OnInit } from '@angular/core';
import { Plugins, CameraResultType } from '@capacitor/core';
import { DomSanitizer } from '@angular/platform-browser';


const { Camera } = Plugins;


@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {
  public gallery = [];
  public imageUrl = '';

  constructor(
    public domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {}

  takePicture() {
    console.warn('takePicture');

    Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    }).then((res) => {
      this.gallery.push(res);
      console.warn(res);
      // image.webPath will contain a path that can be set as an image src.
      // You can access the original file using image.path, which can be
      // passed to the Filesystem API to read the raw data of the image,
      // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
      this.imageUrl = res.webPath;
    });

  }

}
