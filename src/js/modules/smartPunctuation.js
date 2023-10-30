export default function smartPunctuation() {
  const attachFilterToInputs = () => {
    var textInputs = document.querySelectorAll('input[type=text], input[type=password], input[type=email], input[type=search], input[type=url], textarea, *[contenteditable=true]');

    for (var i = 0; i < textInputs.length; i++) {
      textInputs[i].addEventListener('keypress', preventPretentiousPunctuation);
      textInputs[i].addEventListener('input', preventPretentiousPunctuation);
    }
  }

  const preventPretentiousPunctuation = event => {
    if (event.key.length != 1) return;
    var code = event.key.codePointAt(0);
    var replacement = '\''; // https://unicodemap.org/details/0x0027/index.html

    if (code == 39) {
      event.preventDefault();
      document.execCommand('insertText', 0, replacement);
    }
  }

  if (document.readyState !== 'loading') {
    attachFilterToInputs
  } else {
    document.addEventListener('DOMContentLoaded', attachFilterToInputs);
  }
}
