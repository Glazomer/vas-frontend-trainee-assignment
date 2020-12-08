export default function (text: string): boolean {
  var textArea = document.createElement('textarea');
  textArea.style.cssText =
    'position: fixed; width: 2em; height: 2em; opacity: 0;';

  textArea.value = text;

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  const result = document.execCommand('copy');

  document.body.removeChild(textArea);
  return result;
}
