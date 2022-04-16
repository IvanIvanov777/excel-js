import { ExcelComponent } from '../../core/ExcelComponent';
import { createTable } from './table.template';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  toHTML = () => createTable(25)

  // toHTML = () => `
  // <div class="row">
  //   <div class="row-info">

  //   </div>
  //   <div class="row-data">
  //     <div class="column">A</div>
  //     <div class="column">B</div>
  //     <div class="column">C</div>
  //   </div>
  // </div>

  // <div class="row">
  //   <div class="row-info">
  //     1
  //   </div>
  //   <div class="row-data">
  //     <div class="cell selected" contenteditable>1</div>
  //     <div class="cell" contenteditable>2</div>
  //     <div class="cell" contenteditable>3</div>
  //   </div>
  // </div>

  // <div class="row">
  //   <div class="row-info">
  //     2
  //   </div>
  //   <div class="row-data">
  //     <div class="cell" contenteditable>1</div>
  //     <div class="cell" contenteditable>2</div>
  //     <div class="cell" contenteditable>3</div>
  //   </div>
  // </div>
  // `
}
