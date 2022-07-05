/*
Copyright belongs to https://github.com/selemxmn/ngx-print
Licensed under MIT license
 */

import {Directive, HostListener, Input, NgModule} from '@angular/core';

@Directive({
  selector: 'button[ngxPrint]',
})
export class NgxPrintDirective {
  @Input() printSectionId: string | undefined;
  @Input() printTitle: string | undefined;
  @Input() useExistingCss = false;

  /**
   * A delay in milliseconds to force the print dialog to wait before opened. Default: 0
   */
  @Input() printDelay = 0;

  public _printStyle: string[] = [];
  @Input()
  set printStyle(values: {[key: string]: {[key: string]: string}}) {
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        this._printStyle.push((key + JSON.stringify(values[key])).replace(/['"]+/g, ''));
      }
    }
    this.returnStyleValues();
  }

  /**
   * @returns the string that create the stylesheet which will be injected
   * later within <style></style> tag.
   *
   * -join/replace to transform an array objects to css-styled string
   */
  public returnStyleValues(): string {
    return `<style> ${this._printStyle.join(' ').replace(/,/g, ';')} </style>`;
  }

  /**
   * @returns html for the given tag
   */
  private _styleSheetFile = '';

  /**
   * @param cssList
   */
  @Input()
  set styleSheetFile(cssList: string) {
    const linkTagFn = function (cssFileName: string) {
      return `<link rel="stylesheet" type="text/css" href="${cssFileName}">`;
    };
    if (cssList.indexOf(',') !== -1) {
      const valueArr = cssList.split(',');
      for (const val of valueArr) {
        this._styleSheetFile = this._styleSheetFile + linkTagFn(val);
      }
    } else {
      this._styleSheetFile = linkTagFn(cssList);
    }
  }

  /**
   * @returns string which contains the link tags containing the css which will
   * be injected later within <head></head> tag.
   *
   */
  private returnStyleSheetLinkTags() {
    return this._styleSheetFile;
  }

  private static getElementTag(tag: keyof HTMLElementTagNameMap): string {
    const html: string[] = [];
    const elements = document.getElementsByTagName(tag);
    for (let index = 0; index < elements.length; index++) {
      html.push(elements[index].outerHTML);
    }
    return html.join('\r\n');
  }

  /**
   * @param datas the html element collection to save defaults to
   */
  private static getFormData(datas: HTMLCollectionOf<any>) {
    for (let i = 0; i < datas.length; i++) {
      const data = datas[i];
      data.defaultValue = data.value;
      if (data.checked) {
        data.defaultChecked = true;
      }
    }
  }

  /**
   * @returns html section to be printed along with some associated inputs
   */
  private getHtmlContents() {
    if (!this.printSectionId) {
      throw Error('Print section id undefined');
    }
    const printContents = document.getElementById(this.printSectionId);
    if (!printContents) {
      throw Error('Print section not found');
    }
    const innards = printContents.getElementsByTagName('input');
    NgxPrintDirective.getFormData(innards);

    const txt = printContents.getElementsByTagName('textarea');
    NgxPrintDirective.getFormData(txt);

    return printContents.innerHTML;
  }

  @HostListener('click')
  public print(): void {
    let styles = '',
      links = '';
    const baseTag = NgxPrintDirective.getElementTag('base');

    if (this.useExistingCss) {
      styles = NgxPrintDirective.getElementTag('style');
      links = NgxPrintDirective.getElementTag('link');
    }

    const printContents = this.getHtmlContents();
    const popupWin = window.open('', '_blank', 'top=0,left=0,height=auto,width=auto');
    popupWin?.document.open();
    popupWin?.document.write(`
      <html lang="en">
        <head>
          <title>${this.printTitle ? this.printTitle : ''}</title>
          ${baseTag}
          ${this.returnStyleValues()}
          ${this.returnStyleSheetLinkTags()}
          ${styles}
          ${links}
        </head>
        <body>
          ${printContents}
          <script defer>
            function triggerPrint() {
              window.removeEventListener('load', triggerPrint, false);
              setTimeout(function() {
                window.print()
                closeWindow();
              }, ${this.printDelay});
            }
            function closeWindow(){
                window.close();
            }
            window.addEventListener('load', triggerPrint, false);
          </script>
        </body>
      </html>`);
    popupWin?.document.close();
  }
}

@NgModule({
  declarations: [NgxPrintDirective],
  imports: [],
  exports: [NgxPrintDirective],
})
export class NgxPrintModule {}
