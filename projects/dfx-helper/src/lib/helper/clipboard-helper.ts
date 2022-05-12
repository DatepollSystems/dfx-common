export class ClipboardHelper {
  public static copy(value: string, legacyCopy: boolean = false): void {
    if (legacyCopy) {
      const copyBox = document.createElement('textarea');
      copyBox.style.position = 'fixed';
      copyBox.style.left = '0';
      copyBox.style.top = '0';
      copyBox.style.opacity = '0';
      copyBox.value = value;
      document.body.appendChild(copyBox);
      copyBox.focus();
      copyBox.select();
      copyBox.setSelectionRange(0, 99999);
      document.execCommand('copy');
      document.body.removeChild(copyBox);
      return;
    }

    void navigator.clipboard.writeText(value);
  }

  public static read(): Promise<string> {
    return navigator.clipboard.readText();
  }
}
