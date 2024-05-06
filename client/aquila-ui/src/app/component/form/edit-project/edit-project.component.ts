import { Component, Input } from '@angular/core';
import { ProjectResponse } from '../../../model/project';
import { ViewProjectComponent } from '../../view-project/view-project.component';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../../service/project.service';

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.css'
})
export class EditProjectComponent {
  @Input() project!: ProjectResponse;

  constructor (private projectService: ProjectService, private _project: ViewProjectComponent) {}

  onSubmit() {
    this.projectService.updateProject(this.project).subscribe(
      (res) => {
        this._project.project=res;
        this.cancel();
      }
    );
  }

  cancel() {
    this._project.editProject = false;
  }
}
